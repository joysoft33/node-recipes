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

  service.presign = function presign(filename, type) {
    return $q((resolve, reject) => {
      $http.post('/api/auth/presign', {
        filename,
        type
      }).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      });
    });
  };

  service.uploadFile = function uploadFile(file, presigned, progress) {

    const defer = $q.defer();

    if (file) {
      Upload.upload({
        url: `https://api.cloudinary.com/v1_1/${presigned.cloudName}/auto/upload`,
        file: file,
        headers: {
          Authorization: undefined
        },
        fields: {
          api_key: presigned.apiKey,
          timestamp: presigned.timestamp,
          signature: presigned.signature
        }
      }).then((response) => {
        // Image uploaded
        if (response.status === 200) {
          // No error, return the image url
          defer.resolve(response.data);
        } else {
          // Error detected, return the error text
          defer.reject(response.statusText);
        }
      }, (error) => {
        // Error detected
        defer.reject(error);
      }, (evt) => {
        // Upload progression, update UI if a callback has been supplied
        if (typeof progress === 'function') {
          const progressPercentage = parseInt((100.0 * evt.loaded) / evt.total, 10);
          progress(progressPercentage);
        }
      });
    } else {
      // No valid file supplied
      defer.resolve({});
    }

    return defer.promise;
  };

  return service;
}