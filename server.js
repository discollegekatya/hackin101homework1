const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');

app.set("view engine", "ejs"); 
app.set('views', __dirname);
app.use(express.urlencoded());
app.use(cookieParser("secret"));

let holidaysText = 'Каникулы нужны человеку, чтобы ... ';
let eggsText = 'Яйцы варят ровно ... ';
let ninaText = 'Баба Нина живет ... ';
let jackRabbitText = 'Заяц тот еще зверь ... ';

let submittedHolidays = holidaysText;
let submittedEggs = eggsText;
let submittedNina = ninaText;
let submittedJackRabbit = jackRabbitText;

let tokensAndCookies = new Map();

app.post('/submit-form', (req, res) => {
  let sessionId = req.cookies.sessionId;
  let token = req.body.token;
  if (isInvalid(sessionId)) {
    setNewTokenEntry(res);
    token = newToken;
  }
  if (token !== tokensAndCookies.get(sessionId)) {
    res.render('accessDenied');
  } else {
    setNewFields(req, token);
    res.redirect('/');
    return res.end();
  }
});

app.get('/', (req, res) => {
  let sessionId = req.cookies.sessionId;
  if (isInvalid(sessionId)) {
    setNewTokenEntry(res);
  }
  let token = tokensAndCookies.get(sessionId);
  res.render("index", { 
    submittedHolidays: submittedHolidays,
    submittedEggs: submittedEggs,
    submittedNina: submittedNina,
    submittedJackRabbit: submittedJackRabbit,
    token: token
  });
});

app.listen(port, (err) => {
    console.log(`Server is listening on ${port}`);
});

function isInvalid(sessionId) {
  return sessionId === undefined || !tokensAndCookies.has(sessionId);
}

function setNewTokenEntry(res) {
  let newSessionId = Math.floor(Math.random() * Math.pow(10, 8));
  let newToken = Math.floor(Math.random() * Math.pow(10, 12));
  tokensAndCookies.set(newSessionId.toString(), newToken.toString());
  res.cookie('sessionId', newSessionId);
}

function setNewFields(req, token) {
  submittedHolidays = holidaysText + req.body.holidays;
  submittedEggs = eggsText + req.body.eggs;
  submittedNina = ninaText + req.body.nina;
  submittedJackRabbit = jackRabbitText + req.body.jackrabbit;
  token = token;
}