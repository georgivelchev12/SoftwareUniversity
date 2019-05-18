const Task = require('../models/Task');

module.exports = {
  getIndex: function (req, res) {
    getAll()
    .then(task => {
      res.render('index',{
        'openTasks':task.filter(t=>t.status === "Open"),
        'inProgressTasks':task.filter(t=>t.status === "In Progress"),
        'finishedTasks':task.filter(t=>t.status === "Finished")
      })
    });
  },
  getCreate: function (req, res) {
    res.render('create');
  },
  postCreate: function (req, res) {
    AddTask(req.body)
    .then(() => res.redirect('/'))
    .catch(() => res.redirect('/create'));
  },
  getEdit: function (req, res) {
    findById(req.params.id)
    .then((task)=> res.render('edit',{task}))
    .catch(() => res.redirect('/edit'))
  },
  postEdit: function (req, res) {
    let newTask = req.body;
    editTask(req.params.id,newTask)
    .then(() => res.redirect('/'));
  },
  getDelete: function (req, res) {
    findById(req.params.id)
    .then((task)=> res.render('delete',{task}))
    .catch(() => res.redirect('/delete'))
  },
  postDelete: function (req, res) {
    deleteTask(req.params.id)
    .then(() => res.redirect('/'));
  }
};



function getAll() {
  return Task.find({});
}
function AddTask(task) {
  return Task.create(task);
}
function findById(id) {
  return Task.findById(id);
}
function editTask(id, newTask) {
  return Task.findByIdAndUpdate(id, newTask);
}
function deleteTask(id) {
  return Task.findByIdAndDelete(id);
}


