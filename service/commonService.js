const request = require('request');

/**
 * Method to call external API with exception handling and request and response logging
 * @param {*} options
 * @param {*} req
 * @param {*} res
 */

let getExternalApiResponse = async (options) => {
  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      let data = JSON.parse(body);
      if (error) {
        return reject(error);
      } else if(response.statusCode > 204){
        return reject(data);
      }
      return resolve(data);
    });
  });
}

module.exports = {
  getExternalApiResponse: getExternalApiResponse
}