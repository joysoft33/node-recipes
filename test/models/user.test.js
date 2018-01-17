
require('should');

const User = require('../../server/models/user');

describe('User model test', () => {

  it('excludePassword should be ok', () => {
    const options = User.excludePassword({
      attributes: ['firstName, lastName']
    });
    options.should.have.key('attributes');
    options.should.attributes.have.key('include');
    options.should.attributes.have.key('exclude');
    options.attributes.include.should.be.instanceof(Array);
    options.attributes.exclude.should.be.instanceof(Array);
  });

});