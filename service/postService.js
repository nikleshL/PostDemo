let environment = require("../environment.json");
let commonService = require("./commonService");
/**
 * Method to Return a list of comments
 */
let getPostList = async (req, res, next) => {
    try {
        let url = "/posts";
        let options = generateOptions(req,url,'GET');
        return await commonService.getExternalApiResponse(options);
    } catch (error){
        throw error;
    }
}

/**
 * Options foe metricell API
 * @param {*} req 
 */
let generateOptions = (req,url,method) => {
    let urlData = environment.commentsApi + url;
    const options = {
      url: urlData,
      method:  method,
      rejectUnauthorized: false,
      requestCert: false
    };
    return options;
  };

module.exports = {
    getPostList: getPostList
}