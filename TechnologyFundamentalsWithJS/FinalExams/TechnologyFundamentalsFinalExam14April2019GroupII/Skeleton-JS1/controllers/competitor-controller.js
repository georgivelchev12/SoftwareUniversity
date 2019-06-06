const Competitor = require('../models/Competitor');

module.exports = {
    getIndex: function (req, res) {
        // TODO: Implement me
        Competitor.find().then((competitors) => res.render('index',{competitors}));
    },
    getCreate: function (req, res) {
        // TODO: Implement me
        res.render('create');
    },
    postCreate: function (req, res) {
        // TODO: Implement me
        Competitor.create(req.body)
        .then(()=> res.redirect('/'));
    },
    getEdit: function (req, res) {
        // TODO: Implement me
        Competitor.findById(req.params.id)
        .then((competitor) => res.render('edit',{competitor}));
    },
    postEdit: function (req, res) {
        // TODO: Implement me
        let newCompetitor = req.body;
        Competitor.findByIdAndUpdate(req.params.id,newCompetitor)
        .then(() => res.redirect('/'))
    },
    getDelete: function (req, res) {
        // TODO: Implement me
        Competitor.findById(req.params.id)
        .then((competitor) => res.render('delete',{competitor}));
    },
    postDelete: function (req, res) {
        // TODO: Implement me
        Competitor.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/'));
    }
};