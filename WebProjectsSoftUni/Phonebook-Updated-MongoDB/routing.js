const phonebookController = require('./controllers/phonebook-controller');

module.exports = function(app) {
  app.get('/', phonebookController.getIndex);
  app.post('/add', phonebookController.postCreate);
  app.get('/delete/:id' , phonebookController.getDelete);
  app.post('/delete/:id',phonebookController.postDelete);


}