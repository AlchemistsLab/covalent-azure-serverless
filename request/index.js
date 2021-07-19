/************************************************
 * This code is a function for request data from Covalent API.
 * Deploy on Microsoft Azure Functions (triggered by HTTP request)
 ************************************************/
module.exports = async (context, req) => {
  // import module for submitting request.
  const axios = require('axios');

  /************************************************
   * Covalent API information for requesting data
   * - api_key (You can replace '{YOUR_API_KEY}' with your key)
   ************************************************/
  const api_host = 'https://api.covalenthq.com/v1/';
  const api_key = '{YOUR_API_KEY}';

  // response data variable
  let response = null;

  // check path parameter exist
  if (req.query && req.query.path) {
    // initial requester object
    const requester = axios.create({ baseURL: api_host });

    // normalize path parameter
    const path = `${req.query.path}${!req.query.path.endsWith('/') ? '/' : ''}`;
    // remove path parameter before setup query string parameters
    delete req.query.path;
    // setup query string parameters including API key
    const params = { key: api_key, ...req.query };

    // send request to Covalent API
    const res = await requester.get(path, { params })
      // set response data from error handled by exception
      .catch(error => { return { data: { data: null, error: true, error_message: error.message, error_code: error.code } }; });

    // set response data
    if (res && res.data) {
      response = res.data;
    }
  }
  else {
    // set response data to 'Not found'
    response = { data: null, error: true, error_message: 'Not found', error_code: 404 };
  }

  // return response data
  context.res = {
    status: 200,
    body: response
  };
};