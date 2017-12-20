const supertest = require('supertest');
const should = require('should');

// Load and start the server (force test mode just in case env variable not correctly set)
process.env.NODE_ENV = 'test';
const app = require('../../server/server');

// Retrieve config and models
const config = require('../../server/config')();
const models = require('../../server/models');

// This agent refers to PORT where program is running.
const server = supertest.agent(`http://localhost:${config.serverPort}`);

describe('Testing /api/users route', function test() {

  // The authentication token
  let token;

  // Override mocha timeout
  this.timeout(10000);

  // Before tests start, empty the users table
  before((done) => {
    models.sequelize.sync({
      force: false
    }).then(() => {
      return models.user.destroy({
        where: {
          id: {
            [models.Sequelize.Op.ne]: null
          }
        }
      });
    }).then(() => {
      return models.sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1');
    }).then(() => {
      done();
    }).catch((error) => {
      done(error);
    });
  });

  // When test terminated, close our server app
  after((done) => {
    app.close(() => {
      console.log('Server closed');
    });
    done();
  });

  it('GET /api/users should fail 403', (done) => {
    server
      .get('/api/users')
      .expect(401)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });

  it('POST /api/users should create user Lucien', (done) => {
    server
      .post('/api/users')
      .send({
        email: 'lucien@free.fr',
        name: 'Lucien',
        isAdmin: true,
        password: 'toto'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.equal(200);
          res.body.name.should.equal('Lucien');
          res.body.should.have.property('email');
          res.body.should.have.property('isAdmin');
          done();
        }
      });
  });

  it('GET /users/1 should fail 403', (done) => {
    server
      .get('/api/users/1')
      .expect(401)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });

  it('POST /api/auth should fail 401', (done) => {
    server
      .post('/api/auth')
      .send({
        email: 'lucien@free.fr',
        password: 'toto'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.body.should.have.property('token');
        token = res.body.token;
        done();
      });
  });

  it('GET /api/users/1 should return Lucien', (done) => {
    server
      .get('/api/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.body.name.should.equal('Lucien');
        res.body.should.have.property('email');
        res.body.should.have.property('isAdmin');
        done();
      });
  });

  it('PUT /api/users/1 should rename Lucien to Jean', (done) => {
    server
      .put('/api/users/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jean'
      })
      .expect(200)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });

  it('GET /api/users/1 should return Jean', (done) => {
    server
      .get('/api/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.body.name.should.equal('Jean');
        done();
      });
  });

  it('DELETE /api/users/1 should delete Jean', (done) => {
    server
      .delete('/api/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });

  it('DELETE /api/users/1 should fail 404', (done) => {
    server
      .delete('/api/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });

  it('DELETE /api/users/1 should fail 403', (done) => {
    server
      .delete('/api/users/1')
      .expect(401)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });
});