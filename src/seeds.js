const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const user1 = {
  name: 'henk jan',
  email: 'henk@jan.com',
  password: 'asd123'
}

const user2 = {
  name: 'jan henk',
  email: 'jan@henk.com',
  password: 'asd123'
}

const evaluation1 = {
  color: 2
}

const evaluation2 = {
  color: 1
}

const student1 = {
  name: "Aad",
  profilePicture: "http://res.cloudinary.com/dr9a28l84/image/upload/v1496598845/xobhxfqseawrhwforjbx.jpg",
  evaluations: [evaluation1]
}

const batch1 = {
  batchNumber: 1,
  startDate: 2017-05-15,
  endDate: 2017-07-07
}

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

  feathersClient.service('users').create(user1)
  .then()
  .catch(function(error) {
    console.error('Error creating user!', error.message);
  });

  feathersClient.service('batches').create(evaluation1);
  feathersClient.service('batches').create(evaluation2);
  feathersClient.service('batches').create(student1);
  feathersClient.service('batches').create(batch1);
