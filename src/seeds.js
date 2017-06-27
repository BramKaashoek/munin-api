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

const batches = [
  {
    batchNumber: 1,
    startDate: 2017-05-15,
    endDate: 2017-07-07,
    students: [
      {
        name: "Aad",
        profilePicture: "http://res.cloudinary.com/dr9a28l84/image/upload/v1496598845/xobhxfqseawrhwforjbx.jpg",
        evaluations: [
          {color: 2, date: 2017-05-15 },
          {color: 1, date: 2017-05-16}
        ]
      },
      {
        name: "Tim",
        profilePicture: "http://res.cloudinary.com/dr9a28l84/image/upload/v1496598845/xobhxfqseawrhwforjbx.jpg",
        evaluations: [{color: 1, date: 2017-05-15}]
      }
    ]
  }
]

const feathersClient = feathers();

feathersClient
.configure(hooks())
.configure(rest('http://localhost:3030').superagent(superagent))
.configure(auth());

feathersClient.service('users').create(user1)
.then(() => {
  feathersClient.authenticate({
    strategy: 'local',
    email: user1.email,
    password: user1.password
  })
  .then(() => {
    batches.map((batch) => {
      feathersClient.service('batches').create(batch)
        .then()
        .catch((error) => {
          console.error("error creating batches", error.message);
        });
    })
  })
  .catch(function(error){
    console.error('Error authenticating!', error.message);
  });
})
.catch(function(error) {
  console.error("creating user error", error.message);
});
