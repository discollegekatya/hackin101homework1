const express = require('express');
const app = express();
const port = 8000;

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
app.set("view engine", "ejs"); 
app.set('views', __dirname);
app.use(express.urlencoded());

let holidaysText = 'Каникулы нужны человеку, чтобы ... ';
let eggsText = 'Яйцы варят ровно ... ';
let ninaText = 'Баба Нина живет ... ';
let jackRabbitText = 'Заяц тот еще зверь ... ';

let submittedHolidays = holidaysText;
let submittedEggs = eggsText;
let submittedNina = ninaText;
let submittedJackRabbit = jackRabbitText;

app.post('/submit-form', (req, res) => {
  submittedHolidays = holidaysText + req.body.holidays;
  submittedEggs = eggsText + req.body.eggs;
  submittedNina = ninaText + req.body.nina;
  submittedJackRabbit = jackRabbitText + req.body.jackrabbit;
  res.redirect('/');
  return res.end();
});

app.get('/', (req, res) => {
  res.render("index", { 
    submittedHolidays: submittedHolidays,
    submittedEggs: submittedEggs,
    submittedNina: submittedNina,
    submittedJackRabbit: submittedJackRabbit});
});

app.listen(port, (err) => {
    console.log(`Server is listening on ${port}`);
});