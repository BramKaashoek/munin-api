// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {

    if ( hook.data.removeStudent === undefined) return Promise.resolve(hook)

    return hook.app.service('batches').get(hook.id).then((batch) =>{

      students = batch.students.filter((s) => {
        return s._id != hook.data.studentId
      })
      hook.data.students = students
     })


    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
