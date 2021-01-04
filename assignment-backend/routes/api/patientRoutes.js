

const express = require('express');
const router = express.Router();
const apiHandler = require('../../apiHandler');
const user = require('../../controllers/patientController');
const { check, validationResult } = require('express-validator/check');
const Error = require('../../errors');
const SchemaValidator = require('../../validations/validator');
const AuthService = require('../../services/authService');
const validateRequest = SchemaValidator(false);


router.get('/:id', async (req, res) => {
  try {
    let response = await user.getPatientById(req.params.id);
    apiHandler(req, res, Promise.resolve(response));
  } catch (err) {
    console.log(err)
    apiHandler(req, res, Promise.reject(err));
  }
});


router.get('/', async (req, res) => {
  try {
      let response = await user.getPatients(req.query);
      apiHandler(req, res, Promise.resolve(response));
  } catch (err) {
      apiHandler(req, res, Promise.reject(err));
  }
});

router.post('/update/:id', async (req, res) => {
  try {
      let response = await user.updatePatient(req.body, req.params.id, req.files.userProfile);
      apiHandler(req, res, Promise.resolve(response));
  } catch (err) {
      apiHandler(req, res, Promise.reject(err));
  }
});

router.delete('/:id', async (req, res) => {
  try {
      let response = await user.deletePatient(req.params.id);
      apiHandler(req, res, Promise.resolve(response));
  } catch (err) {
      apiHandler(req, res, Promise.reject(err));
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.files || !req.files.userProfile) {
      apiHandler(req, res, Promise.reject(Error.badRequest('Profile pic not found.')));
    }
    let response = await user.register(req.body, req.files.userProfile);
    apiHandler(req, res, Promise.resolve(response));
  } catch (err) {
    apiHandler(req, res, Promise.reject(err));
  }
});





module.exports = router;
