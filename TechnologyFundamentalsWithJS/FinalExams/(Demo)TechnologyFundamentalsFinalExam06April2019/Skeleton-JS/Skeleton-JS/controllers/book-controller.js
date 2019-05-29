const Book = require('../models/Book');

module.exports = {
  getIndex: function (req, res) {
    // TODO:
    Book.find().then((books) => res.render('index',{books}));
  },
  getCreate: function (req, res) {
    // TODO:
    res.render('create');
  },
  postCreate: function (req, res) {
    // TODO:
    Book.create(req.body).then(() => res.redirect('/'));
  },
  getEdit: function (req, res) {
    // TODO:
    Book.findById(req.params.id).then((book) => res.render('edit',{book}));
  },
  postEdit: function (req, res) {
    // TODO:
    let newBook = req.body;
    Book.findByIdAndUpdate(req.params.id,newBook).then(() => res.redirect('/'));
  },
  getDelete: function (req, res) {
    // TODO:
    Book.findById(req.params.id).then((book) => res.render('delete',{book}));
  },
  postDelete: function (req, res) {
    // TODO:
    Book.findByIdAndRemove(req.params.id).then(() => res.redirect('/'));
  }
};