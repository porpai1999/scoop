const express = require('express');
const app = require('../app');
const routes = express.Router();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sdjhgkjaidfokawlkrjpjoeknug;kcpvk2#@#k(kv47541';

routes.get('/', (req, res) => {
  res.send({'api': 'secure'})
});

// verify JWT
function verifyJWT(token, JWT_SECRET) {
  try {
    const JWT_verify = jwt.verify(token, JWT_SECRET);
    JWT_verify.status = true;
    return JWT_verify;
  } catch (error) {
    return { status: false, message: error};
  }
}

// test API JWT_verify
routes.post('/JWT_verify', (req, res) => {
  const { token } = req.body;
  const result = verifyJWT(token, JWT_SECRET);
  res.json(result);
});

routes.post('/subscribe', async (req, res) => {
    if (!req.body.captcha)
      return res.json({ success: false, msg: 'Please select captcha' });
  
    // Secret key
    const secretKey = '6LebNC0aAAAAANFJovWoWevXEzTLM7RRLERD4Tyt';
  
    // Verify URL
    const query = stringify({
      secret: secretKey,
      response: req.body.captcha,
      remoteip: req.connection.remoteAddress
    });
    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
  
    // Make a request to verifyURL
    const body = await fetch(verifyURL).then(res => res.json());
  
    // If not successful
    if (body.success !== undefined && !body.success)
      return res.json({ status: false, message: 'Failed captcha verification' });
  
    // If successful
    return res.json({ status: true, message: 'Captcha passed' });
  });

routes.post('/reCAPTCHA', (req, res) => {
    if (
        req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null
    ) {
        return res.json({ status: false, message: "please select captcha"});
    }

    const secretKey = '6LebNC0aAAAAANFJovWoWevXEzTLM7RRLERD4Tyt';

    const verifyUrl = `http://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    request(verifyUrl, (error, response, body) => {
        body = JSON.parse(body);
        if(body.success !== undefined && !body.success) {
            return res.json({status: false, message: "Failed captcha"});
        }
        return res.json({ status: true, message: "Captcha passed!"});
    });
});

module.exports = routes;