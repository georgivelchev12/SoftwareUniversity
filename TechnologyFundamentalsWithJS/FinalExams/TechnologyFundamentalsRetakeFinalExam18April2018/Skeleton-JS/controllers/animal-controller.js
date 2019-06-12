const Animal = require('../models/Animal');

module.exports = {
    getIndex: function (req, res) {
        //TODO: Implement me
         getAll().then((animals) => {
            res.render('index',{animals});
        })
    },
    getCreate: function (req, res) {
      res.render('create');
    },
    postCreate: function (req, res) {
      addAnimal(req.body)
      .then(() => res.redirect('/'))
      .catch(() => res.redirect('/create'));
    },
    getEdit: function (req, res) {
      findById(req.params.id)
      .then((animal)=> res.render('edit',{animal}))
      .catch(() => res.redirect('/edit'))
    },
    postEdit: function (req, res) {
      let newAnimal = req.body;
      editTask(req.params.id,newAnimal)
      .then(() => res.redirect('/'));
    },
    getDelete: function (req, res) {
      findById(req.params.id)
      .then((animal)=> res.render('delete',{animal}))
      .catch(() => res.redirect('/delete'))
    },
    postDelete: function (req, res) {
      deleteTask(req.params.id)
      .then(() => res.redirect('/'));
    }
  };

function getAll() {
    return Animal.find({});
}
function addAnimal(animal) {
    return Animal.create(animal);
}
function findById(id) {
    return Animal.findById(id);
  }
  function editTask(id, newAnimal) {
    return Animal.findByIdAndUpdate(id, newAnimal);
  }
  function deleteTask(id) {
    return Animal.findByIdAndDelete(id);
  }
  
  
  