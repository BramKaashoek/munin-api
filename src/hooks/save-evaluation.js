// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const moment = require('moment')

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


      const studentIndex = batch.students.indexOf(batch.students.filter((s) => {return s._id.toString() === _id.toString()})[0])

      const studentEvaluations = batch.students[studentIndex].evaluations
      const existing = studentEvaluations.find((e) => {
        return moment(e.date).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY')
      })

      if (existing === undefined){
        batch.students[studentIndex].evaluations = studentEvaluations.concat({ color: color, date: date, remarks: remarks })
      } else {

        batch.students[studentIndex].evaluations[studentEvaluations.indexOf(existing)] = {remarks: remarks, color: color, date: date}
      }
      hook.data = batch
     })


    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
