/**
 * FileUpoadService
 * This service is responsible for handling file uploading procedure.
 */

const Error = require('../errors');
const fs = require('fs');
const path = require('path');

class FileUpload {

  /**
   * @description :: Upload file.
   * @param {JSON} file details of uploaded file
   * @returns {String} filePath
   */
  async upload(file) {
    try {
      // if(!file) {
      //   console.log(file);
      //   return Promise.reject(Error.badRequest('File not found.'));
      // }
      let time = new Date().getTime();
      let name = file.name;
      let ext = path.extname(name);
      let dir = './public/images/';
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      await file.mv(dir + name);
      dir = '/images/';
      return dir + name;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  /**
   * @description :: Remove images from server.
   * @param {String} imagePath path of the image
   * @returns void
   */
  async removeImages(imagePath) {
    try {
      let filename = path.basename(imagePath);
      let image_dir = './public/images/';
      fs.unlinkSync(image_dir + filename);
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

module.exports = new FileUpload();
