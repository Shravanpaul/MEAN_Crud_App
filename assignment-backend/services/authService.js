/**
 * Auth Service
 * This service will handle all the task related to authentication.
 */
const jwt = require('jsonwebtoken');
const Error = require('../errors');
const UserModel = require('../models/patientModal');
const pkg = require('../package');
const request = require('request');
const http = require('http');

class AuthService {
  async findByMobile(mobileNo) {
    try {
      let user = await UserModel.findOne({ mobileNo });
      return user;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async findByEmail(email) {
    try {
      let user = await UserModel.findOne({ email: email, emailVerified: true });
      return user;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async findByUserId(userId) {
    try {
      let user = await UserModel.findOne({ socialId: userId });
      return user;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async findByToken(token) {
    try {
      let decode;
      decode = jwt.verify(token, pkg.config.secret);
      let user = await UserModel.findOne({ _id: decode._id });
      return user;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async generateToken(user) {
    try {
      let token = jwt.sign({_id : user._id.toHexString()}, pkg.config.secret).toString();
      return token;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (reg.test(emailField) == false) {
      return Promise.reject(Error.badRequest('Insert valid email'));
    }
    return emailField;
  }
}

module.exports = new AuthService();
