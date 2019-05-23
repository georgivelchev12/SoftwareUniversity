const phonebook = require('../phonebook');
const Contact = require('../models/Contact')

module.exports = {
  getIndex: function (req, res) {
    //TODO
    getAll().then(contacts => {
      return res.render('index', { contacts })
    });
  },
  getCreate: function (req, res) {
    //TODO
    return res.render('add')
  },
  postCreate: function (req, res) {
    //TODO
    let contact = req.body;
    addProduct(contact)
      .then(() => {
        return res.redirect('/');
      });
  },
  getDelete: function (req, res) {
    //TODO
    let id = req.params.id;
    return res.render('delete', { id })
  },
  postDelete: function (req, res) {
    //TODO
    let id = req.params.id;
    deleteProduct(id).then(() => {
      return res.redirect('/');
    });
  }
}


function getAll() {
  return Contact.find({});
}

function addProduct(product) {
  return Contact.create(product);
}

function deleteProduct(id) {
  return Contact.findByIdAndRemove(id);
}

