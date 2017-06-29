const { authenticate } = require('feathers-authentication').hooks;
const { restrictToOwner, associateCurrentUser, restrictToAuthenticated } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated(),
]


const saveEvaluation = require('../../hooks/save-evaluation');


const createBatch = require('../../hooks/create-batch');


module.exports = {
  before: {
    all: [ ...restrict ],
    find: [],
    get: [],
    create: [createBatch()],
    update: [saveEvaluation()],
    patch: [saveEvaluation()],
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
