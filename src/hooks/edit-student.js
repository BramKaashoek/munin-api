// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if ( hook.data.editStudent=== undefined) return Promise.resolve(hook)
    return hook.app.service('batches').get(hook.data.newStudent.batchId).then((batch) =>{
      const newStudent = {
        name: hook.data.newStudent.name,
        profilePicture: hook.data.newStudent.profilePicture,
        evaluations: hook.data.newStudent.evaluations,
        _id: hook.data.newStudent.studentId
      }

      console.log(batch.students)
      let students = batch.students.filter((s) => {
        console.log(s._id)
        console.log(newStudent._id)
        return s._id != newStudent._id
      })
      hook.data.students = students.concat(newStudent)
    })


    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
