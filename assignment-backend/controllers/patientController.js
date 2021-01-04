
const Auth = require('../services/authService');
const PatientModal = require('../models/patientModal');
const Error = require('../errors');
const mongoose = require('mongoose');
const FileUpload = require('../services/fileUpload');

class Patient {

  async register(body, userProfile) {
    try {
      let path;
      if (userProfile) {
        path = await FileUpload.upload(userProfile);
      }
      let newUser = {
        email: body.email,
        first_name: body.first_name,
        mobile: Number(body.mobile),
        last_name: body.last_name,
        userProfile: path
      };
      newUser = await PatientModal.create(newUser);
      return newUser;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }


  async getPatients() {
    try {
      let admin = await PatientModal.find({});
      if (!admin) {
        return Promise.reject(Error.badRequest('patient not found'));
      }
      return admin;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async updatePatient(body, id, userProfile) {
    try {
      let admin = await PatientModal.findOne({ _id: id });
      let image;
      if (!admin) {
        return Promise.reject(Error.badRequest('Pateint not found'));
      }
      if (body.email) {
        admin.email = body.email;
      }
      if (body.first_name) {
        admin.first_name = body.first_name;
      }
      if (body.mobile) {
        admin.mobile = parseInt(body.mobile);
      }
      if (body.last_name) {
        admin.last_name = body.last_name;
      }
     
      if (userProfile) {
        let path;
        if (admin.userProfile) {
          path = await FileUpload.upload(userProfile);
          await FileUpload.removeImages(admin.userProfile);
        }
        path = await FileUpload.upload(userProfile);
        admin.userProfile = path;
      }
      admin = await admin.save();
      return admin;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }



  async getPatientById(userId) {
    try {
      let user = await PatientModal.findOne({ _id: userId });
      return user
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async deletePatient(id) {
    try {
      let users = await PatientModal.deleteOne({_id: id});
      return users
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}


module.exports = new Patient();
