const request = require("supertest"); 
const app = require("./app"); 

describe('the entry point of the application', () => { 
  it('receives a GET request at /', done => { 
    request .get('/') 
            .expect(200, 'Welcome to my API') 
            .end() 
  })

  
  
}) 
