const phonebookController = require('./controllers/phonebook-controller');

module.exports = function(app) {
  app.get('/', phonebookController.index);
  app.post('/add', phonebookController.addPhonebookPost);
}