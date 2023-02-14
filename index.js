var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type user {
  email: String!
  username: String!
  bio: String
  image: String
  token:String!
}

type Query {
  Login(email:String!,password:String!): user
}
`);
class user {
  constructor(email) {
    this.email = email;
    this.username = email;
    this.bio = null;
    this.image = "https://api.realworld.io/images/smiley-cyrus.jpeg";
    this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGZAc2FkZi5kc2FmIiwidXNlcm5hbWUiOiJhc2RmQHNhZGYuZHNhZiIsImlhdCI6MTY3NjM2MzgyMSwiZXhwIjoxNjgxNTQ3ODIxfQ.w2RaV25FEJgX1drS0ZZBJsq8gkY1Kgbtpjhhhuv4Gf0";
  }
  email() {
    return this.username
  }
  username() {
    return this.username
  }
  bio() {
    return this.bio
  }
  image() {
    return this.image
  }
  token() {
    return this.token
  }
}
// The root provides a resolver function for each API endpoint
var root = {
  Login: ({email,password}) => {
    return new user(email || 'asdf@sadf.dsaf');
  }
}



var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
// Export the Express API
module.exports = app;
/*run on graphql:
{
  Login(email: "asdf@sadf.dsaf",password:"asdf") {
    email 
  username 
  bio 
  image 
  token 
  }
}
*/