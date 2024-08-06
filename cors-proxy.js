const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    console.log(event.queryStringParameters);
  const targetURL = event.queryStringParameters.url;

  if (!targetURL) {
    return {
      statusCode: 400,
      body: 'No target URL specified',
    };
  }

  try {
    const response = await fetch(targetURL);
    const data = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
