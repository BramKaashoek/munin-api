// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if ( hook.data.addStudent=== undefined) return Promise.resolve(hook)

    console.log(hook.data.newStudent)
    return hook.app.service('batches').get(hook.data.newStudent.batchId).then((batch) =>{

      const newStudent = {
        name: hook.data.newStudent.name,
        profilePicture: hook.data.newStudent.profilePicture,
        evaluations: []
      }
      students = batch.students.concat(newStudent)
      hook.data.students = students
     })


    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
