const express = require('express');
const app = express();
const port = 8000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("view engine", "ejs"); 
app.set('views', __dirname);
app.use(express.urlencoded());

app.post('/submit-form', (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let email = req.body.email;
  console.log("post " + name)
  res.redirect('/?name=' + eq.body.name + '/?age');
  return res.end();
})

app.get('/', (req, res) => {
  console.log(req.query.myname);
  res.render("index", { name: 'KKK' });
  // fs.readFile('main.html', function(err, data) {
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(data);
  //   return res.end();
  // });

});

app.listen(port, (err) => {
    console.log(`Server is listening on ${port}`);
})