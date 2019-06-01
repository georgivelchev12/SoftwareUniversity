const Mountaineer = require('../models/Mountaineer');

module.exports = {
    getIndex: function (req, res) {
        getAll()
            .then(mountaineers => {
                res.render('index', { mountaineers })
            });
    },
    getCreate: function (req, res) {
        res.render('create');
    },
    postCreate: function (req, res) {
        addMountiner(req.body)
            .then(() => res.redirect('/'))
            .catch(() => res.redirect('/create'))
    },
    getEdit: function (req, res) {
        //TODO
        Mountaineer.findById(req.params.id)
            .then((mountaineer) => res.render('edit', {mountaineer}))
            .catch(() => res.redirect('/edit'))
    },
    postEdit: function (req, res) {
        //TODO
        let newMountaineers = req.body;
        Mountaineer.findByIdAndUpdate(req.params.id, newMountaineers)
            .then(() => res.redirect('/'));
    },
    getDelete: function (req, res) {
        Mountaineer.findById(req.params.id)
            .then((mountaineer) => res.render('delete', { mountaineer }))
            .catch(() => res.redirect('/delete'))
    },
    postDelete: function (req, res) {
        Mountaineer.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('/'));
    }
};



function getAll() {
    return Mountaineer.find({});
}

function addMountiner(mountiner) {
    return Mountaineer.create(mountiner);
}

function deleteProduct(id) {
    return Product.findByIdAndDelete(id);
}
