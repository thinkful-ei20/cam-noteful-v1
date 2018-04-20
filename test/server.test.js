'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

/*
describe('Reality check', () => {
  it('true should be true', () => {
    expect(true).to.be.true;
  });

  it('2 + 2 shoud equal 4', () => {
    expect(2 + 2).to.equal(4);
  });
});
*/

// STATIC PAGE =============================
describe('Express static', () => {
  it('GET request "/" should return the index page', () => {
    return chai.request(app)
      .get('/')
      .then((res) => {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

// 404 ERROR HANDLER =======================
describe('404 handler', () => {
  it('should respond with 404 when given a bad path', () => {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});

// GET REQUEST to /api/notes ===============
describe('GET /api/notes', () => {
  it('should return the default of 10 notes as an array', () => {
    return chai.request(app)  
      .get('/api/notes')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(10);
      });
  });

  it('should return an array of objects with id, title, and content', () => {
    return chai.request(app)
      .get('/api/notes')
      .then(res => {
        res.body.forEach(item => {
          expect(item).to.be.a('object');
          expect(item).to.have.all.keys('id', 'title', 'content');
        });
      });
  });

  it('should return correct search results for a valid query', () => {
    return chai.request(app)
      .get('/api/notes')
      .then('/api/notes/:searchTerm', res => {
        expect(res).to.have.status(200);
      }); 
  });

  it('should return an empty array for an incorrect query', () => {
    return chai.request(app)
      .get('/api/notes/?searchTerm=Not%a%valid%query')
      .then(res => {
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(0);
      });
  });
});


// GET REQUEST to /api/notes/:id ===============
describe('GET /api/notes/:id', () => {
  it('should return correct note object with id, title, and content for a given id', () => {
    return chai.request(app)
      .get('/api/notes/1000')
      .then(res => {
        // expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.an('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.id).to.equal(1000);
        expect(res.body.title).to.equal('5 life lessons learned from cats');
      });
  });

  it('should respond with a 404 for an invalid id', () => {
    return chai.request(app)
      .get('/api/notes/9999')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});