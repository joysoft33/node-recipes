const supertest = require('supertest');
const should = require('should');

// Load and start the server (force test mode just in case env variable not correctly set)
process.env.NODE_ENV = 'test';
const app = require('../../server');

// Retrieve config and models
const config = require('../../server/config')();
const models = require('../../server/models');

// This agent refers to PORT where program is running.
const server = supertest.agent(`http://localhost:${config.serverPort}`);

describe('Testing /users route', () => {

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

  it('GET /users should fail 403', (done) => {
    server
      .get('/users')
      .expect('Content-type', /json/)
      .expect(403)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });

  it('POST /users should create user Lucien', (done) => {
    server
      .post('/users')
      .send({
        email: 'lucien@free.fr',
        name: 'Lucien',
        isAdmin: true,
        password: 'toto'
      })
      .expect('Content-type', /json/)
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
      .get('/users/1')
      .expect('Content-type', /json/)
      .expect(403)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });

  it('POST /auth should fail 401', (done) => {
    server
      .post('/auth')
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

  it('GET /users/1 should return Lucien', (done) => {
    server
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-type', /json/)
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

  it('PUT /users/1 should rename Lucien to Jean', (done) => {
    server
      .put('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jean'
      })
      .expect(200)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });

  it('GET /users/1 should return Jean', (done) => {
    server
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.body.name.should.equal('Jean');
        done();
      });
  });

  it('DELETE /users/1 should delete Jean', (done) => {
    server
      .delete('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });

  it('DELETE /users/1 should fail 404', (done) => {
    server
      .delete('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });

  it('DELETE /users/1 should fail 403', (done) => {
    server
      .delete('/users/1')
      .expect(403)
      .end((err, res) => {
        err ? done(err) : done();
      });
  });
});