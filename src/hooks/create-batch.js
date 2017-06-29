// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    return hook.app.service('batches').find().then((batches) =>{

      if (hook.data.batchNumber === undefined) {
        const highestBatchNumber = batches.data.reduce((prev, next) => {
          console.log(prev)
          console.log(next.batchNumber)
          //console.log(next)
          return Math.max(prev, next.batchNumber)
        },[0])

        hook.data.batchNumber  = highestBatchNumber + 1
      }
    })
  }
};
