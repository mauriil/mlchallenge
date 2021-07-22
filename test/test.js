const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const config = require('config');
const url= `http://localhost:${config.get('EXPRESS.port')}`;

chai.use(chaiHttp);

describe('API Rest: ',()=>{
  it('# Should get 200 to hello world', (done) => {
  chai.request(url)
  .get('/')
  .end( function(err,res){
  expect(res).to.have.status(200);
  done();
  });
  });

  it('# Should found a query sign with de auth code', (done) => {
    chai.request(url)
    .get('/newcode?code=testcode')
    .end( function(err,res){
    expect(res).to.have.status(200);
    done();
    });
    });

  it('# Should get the mail in params and query to DB', (done) => {
      chai.request(url)
      .get('/mails/guest@asd.com')
      .end( function(err,res){
      expect(res).to.have.status(200);
      done();
      });
  });

  it('# Should get an 404 if API endpoint not exist', (done) => {
    chai.request(url)
    .get('/random')
    .end( function(err,res){
    expect(res).to.have.status(404);
    done();
    });
  });


 });
 
 
