const assert = require('assert');

// Load and start the server (force test mode just in case env variable not correctly set)
process.env.NODE_ENV = 'test';
const app = require('../../server/server');

const AuthController = require('../../server/controllers/auth');

const auth = new AuthController();

describe('Cloudinary url detection', () => {

  const result = {
    name: 'doq7ngx3m',
    type: 'image',
    version: 'v1513160213',
    dir: 'development',
    id: 'b862a32c-e565-4e7b-a6ff-79718dd4a1b3'
  };

  it('Should be ok (jpg)', () => {
    assert.deepEqual(
      auth.getPublicIdFromUrl('http://res.cloudinary.com/doq7ngx3m/image/upload/v1513160213/development/b862a32c-e565-4e7b-a6ff-79718dd4a1b3.jpg'), result);
  });

  it('Should be ok (jpeg)', () => {
    assert.deepEqual(
      auth.getPublicIdFromUrl('http://res.cloudinary.com/doq7ngx3m/image/upload/v1513160213/development/b862a32c-e565-4e7b-a6ff-79718dd4a1b3.jpeg'), result);
  });

  it('Should be ok (https)', () => {
    assert.deepEqual(
      auth.getPublicIdFromUrl('https://res.cloudinary.com/doq7ngx3m/image/upload/v1513160213/development/b862a32c-e565-4e7b-a6ff-79718dd4a1b3.jpeg'), result);
  });

  it('Should be ok (png)', () => {
    assert.deepEqual(
      auth.getPublicIdFromUrl('http://res.cloudinary.com/doq7ngx3m/image/upload/v1513160213/development/b862a32c-e565-4e7b-a6ff-79718dd4a1b3.png'), result);
  });

  it('Should not be ok (no protocol)', () => {
    assert.equal(
      auth.getPublicIdFromUrl('res.cloudinary.com/doq7ngx3m/image/upload/v1513160213/development/b862a32c-e565-4e7b-a6ff-79718dd4a1b3.jpeg'), null);
  });

  it('Should not be ok (pdf)', () => {
    assert.equal(
      auth.getPublicIdFromUrl('http://res.toto.com/doq7ngx3m/image/upload/v1513160213/development/b862a32c-e565-4e7b-a6ff-79718dd4a1b3.jpeg'), null);
  });

  it('Should not be ok (no directory)', () => {
    assert.equal(
      auth.getPublicIdFromUrl('http://res.toto.com/doq7ngx3m/image/upload/v1513160213/b862a32c-e565-4e7b-a6ff-79718dd4a1b3.jpeg'), null);
  });
});