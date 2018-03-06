const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (msg) => {
  return msg.toUpperCase();
});
app.set('view engine', 'hbs');



app.use((req,res,next) =>{
  var now = new Date().toString();
  var logMsg = `${now} ${req.method} ${req.url}`;
  fs.appendFile('server.log',logMsg + '\n', (err)=>{
    if(err){
      console.log('unable to update server.log');
    }
  });
  next();
});

/*app.use((req,res,next) =>{
  res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to my website.'
  })
  //res.send('<h1>Hello Express!</h1>');
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
  //res.send('About page');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMsg: 'Unable to handle request.'
  });
});

app.listen(3000, () => {
  console.log('Server is up and running at port 3000');
});