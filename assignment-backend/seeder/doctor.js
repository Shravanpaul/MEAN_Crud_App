require('../core/mongo')();
const DoctorModel = require('../models/doctorModel');

const doctorData = {
  email: "doctor@doctor.com",
  password: "doctor"
};

const doctor = new DoctorModel(doctorData);
doctor.save().then((doctor) => {
  console.info("doctor created: ", doctor);
  process.exit();
}).catch((err) => {
  console.error(err);
  process.exit();
});
