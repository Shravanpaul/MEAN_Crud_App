/**
  createdBy : shravan pal
*/

var apiHandler = function (req, res, data) {
  data.then((data) => {
    console.log("data=-====>>>>",data)
    var status = "success";
    var error = {};
    res.send({
      error,
      status,
      data 
    });
  }).catch((err) => {
    var status = "failure";
    var data = {}
    var error = {};
    if (err.code) {
      error.error_code = err.error;
    } else {
      err.code = 500;
    }
    error.message = err.message;
    res.status(err.code).send({
      error,
      status,
      data
    });
  });
}

module.exports = apiHandler;
