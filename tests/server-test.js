process.env.NODE_ENV = 'test';
const config = require('../config');
    
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const should = chai.should();

const User = require('../bd').UserModel;
let token;
let id;

chai.use(chaiHttp);


describe('Users', function() {
	User.collection.drop();
	it('should register user /api/register POST', function(done) {
	  chai.request(server)
	    .post('/api/register')
	    .send(config.get('loginObj'))
	    .end(function(err, res){
	      	res.should.have.status(200);
	      	res.body.should.property('token');
	      	done();
	    });
	});
	it('should login user /api/login POST', function(done) {
	  chai.request(server)
	    .post('/api/login')
	    .send(config.get('loginObj'))
	    .end(function(err, res){
	      	res.should.have.status(200);
	      	if (res&&res.body&&res.body.token) {token = res.body.token}
	      	res.body.should.property('token');
	      	done();
	    });
	});
	it('should list 1 user on /api/users GET', function(done) {
	  chai.request(server)
	    .get('/api/users')
	    .end(function(err, res){
	      	res.body.length.should.equal(1);
	      	if(res&&res.body&&res.body[0]) {id = res.body[0]._id}
	      	done();
	    });
	});
	it('should GET user using id & token', function(done) {
	  chai.request(server)
	    .get('/api/users/'+id)
	  	.set('Authorization', 'Bearer '+token)
	    .end(function(err, res){
	      	res.should.have.status(200);
	      	done();
	    });
	});
	it('should DELETE user using id & token', function(done) {
	  chai.request(server)
	    .delete('/api/users/'+id)
	  	.set('Authorization', 'Bearer '+token)
	    .end(function(err, res){
	      	res.should.have.status(200);
	      	done();
	    });
	});
	it('should list 0 user on /api/users GET', function(done) {
	  chai.request(server)
	    .get('/api/users')
	    .end(function(err, res){
	      	res.body.length.should.equal(0);
	      	done();
	    });
	});

});