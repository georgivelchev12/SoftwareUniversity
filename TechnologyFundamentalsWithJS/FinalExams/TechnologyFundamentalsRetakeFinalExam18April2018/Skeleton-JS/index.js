const express = require('express');
const expHandlebars = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';

handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

const config = require('./config/config')[env];
require('./config/database')(config);
const app = express();

app.engine('.hbs', expHandlebars({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', '.hbs');
app.use(express.static('public'));
require('./config/routes')(app);


app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));