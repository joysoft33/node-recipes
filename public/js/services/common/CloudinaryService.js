export default cloudinaryService;

/**
 * The authentication service.
 * @param {*} $http
 * @param {*} $q
 * @return {*} The service object itself
 */
function cloudinaryService(Upload, $http, $q) {
  'ngInject';

  const service = {};

  /**
   * Prepare Cloudinary upload for the given file
   * @param {*} filename
   * @param {*} type
   */
  service.presign = function presign(url) {
    return $q((resolve, reject) => {
      $http.post('/api/storage/presign', {
        url
      }).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      });
    });
  };

  /**
   * Upload a new file to Cloudinary
   * @param {*} file
   * @param {*} presigned
   * @param {*} progress
   */
  service.uploadFile = function uploadFile(url, file, progress) {
    return $q((resolve, reject) => {
      if (file) {
        service.presign(url).then((result) => {
          return Upload.upload({
            url: result.uploadUrl,
            file: file,
            headers: {
              Authorization: undefined
            },
            fields: {
              folder: result.folder,
              public_id: result.publicId,
              api_key: result.apiKey,
              timestamp: result.timestamp,
              signature: result.signature
            }
          });
        }).then((response) => {
          // Image uploaded
          if (response.status === 200) {
            // No error, return the image url
            resolve(response.data);
          } else {
            // Error detected, return the error text
            reject(response.statusText);
          }
        }, (error) => {
          // Error detected
          reject(error);
        }, (evt) => {
          // Upload progression, update UI if a callback has been supplied
          if (typeof progress === 'function') {
            progress(Math.round((evt.loaded * 100.0) / evt.total));
          }
        });
      } else {
        // No valid file supplied
        resolve({});
      }
    });
  };

  service.deleteFile = (recipe) => {
    return $q((resolve, reject) => {
      $http.delete(`/api/storage/image/${recipe.id}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
          url: recipe.image
        }
      }).then((response) => {
        resolve(response.data.deleted);
      }).catch((err) => {
        reject(err);
      });
    });
  };

  return service;
}