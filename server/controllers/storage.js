const uuidv4 = require('uuid/v4');
const sha1 = require('sha1');
const got = require('got');

const ServerError = require('../utilities/errors');
const models = require('../models');

const config = require('../config')();

module.exports = class {

  /**
   * Presign for a Cloudinary upload
   * @param {*} req
   * @param {*} res
   */
  presign(req, res) {
    const parts = this.getPublicIdFromUrl(req.body.url);
    const result = {
      publicId: (parts && parts.id) || uuidv4(),
      folder: config.env,
      timestamp: Date.now(),
      apiKey: config.cloudinary.apiKey,
      callback: `${req.headers.origin}/cloudinary_cors.html`,
      uploadUrl: `https://api.cloudinary.com/v1_1/${config.cloudinary.cloudName}/auto/upload`
    };
    const options = `folder=${result.folder}&public_id=${result.publicId}&timestamp=${result.timestamp}${config.cloudinary.apiSecret}`;
    result.signature = sha1(options);
    res.json(result);
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  delete(req, res, next) {
    models.recipe.findAll({
      where: {
        id: req.params.id
      }
    }).then((recipe) => {
      if (recipe.length > 0) {
        throw new ServerError(401, 'Recipe still exists');
      }
      const parts = this.getPublicIdFromUrl(req.body.url);
      if (parts) {
        const url = `https://api.cloudinary.com/v1_1/${config.cloudinary.cloudName}/resources/image/upload?public_ids[]=${parts.dir}/${parts.id}`;
        return got.delete(url, {
          auth: `${config.cloudinary.apiKey}:${config.cloudinary.apiSecret}`,
          json: true
        });
      }
      throw new ServerError(404, 'Recipe has no image');
    }).then((data) => {
      res.json(data.body);
    }).catch((err) => {
      next(err);
    });
  }

  /**
   * See if the given url match a Cloudinary one
   * @param {*} url
   * @return The publidId part of the url if any
   */
  getPublicIdFromUrl(url) {
    if (url && url.length) {
      const urlRegex = /^https?:\/\/res\.cloudinary\.com\/(\w+)\/(\w+)\/upload\/(\w+)\/(\w+)\/((\w|-)+)\.(jpg|png|jpeg)$/gi;
      let match = {};
      url.replace(urlRegex, (m, name, type, version, dir, id) => {
        match = {
          name,
          type,
          version,
          dir,
          id
        };
      });
      return (match.name === config.cloudinary.cloudName) ? match : null;
    }
    return null;
  }

};