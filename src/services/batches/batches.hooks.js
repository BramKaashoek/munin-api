const { authenticate } = require('feathers-authentication').hooks;
const { restrictToOwner, associateCurrentUser, restrictToAuthenticated } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated(),
]


const saveEvaluation = require('../../hooks/save-evaluation');


const createBatch = require('../../hooks/create-batch');


const deleteStudent = require('../../hooks/delete-student');


const createStudent = require('../../hooks/create-student');


const editStudent = require('../../hooks/edit-student');


module.exports = {
  before: {
    all: [ ...restrict ],
    find: [],
    get: [],
    create: [createBatch()],
    update: [saveEvaluation(), deleteStudent(), createStudent(), editStudent()],
    patch: [saveEvaluation(), deleteStudent(), createStudent(), editStudent()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
