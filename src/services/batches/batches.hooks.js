const { authenticate } = require('feathers-authentication').hooks;
const { restrictToOwner, associateCurrentUser, restrictToAuthenticated } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated(),
]


const saveEvaluation = require('../../hooks/save-evaluation');


module.exports = {
  before: {
    all: [ ...restrict ],
    find: [],
    get: [],
    create: [],
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
