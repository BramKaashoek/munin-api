// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if ( hook.data.newEvaluation === undefined) return Promise.resolve(hook)

    return hook.app.service('batches').get(hook.data.evaluation.batchId).then((batch) =>{
      const {
        _id,
        batchId,
        date,
        color,
        remarks,
      } = hook.data.evaluation


      studentIndex = batch.students.indexOf(batch.students.filter((s) => {return s._id.toString() === _id.toString()})[0])
      studentEvaluations = batch.students[studentIndex].evaluations.concat({ color: color, date: date, remarks: remarks })
      batch.students[studentIndex].evaluations = studentEvaluations
      hook.data = batch
     })


    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
