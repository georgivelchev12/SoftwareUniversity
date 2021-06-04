const Cube = require("./Cube");
const Comment = require("./Comment");
const Accessory = require("./Accessory");
const accessory = require("../controllers/accessory");

// "name": "string",
// "description": "string",
// "imageUrl": "string",
// "difficulty": "number"

async function init() {
    return (req, res, next) => {
        req.storage = {
            init,
            getAll,
            getById,
            create,
            edit,
            createComment,
            createAccessory,
            getAllAccessories,
            attachAccessory,
        };
        next();
    };
}

async function getAll(query) {
    const options = {};
    // Search
    if (query.search) {
        options.name = {
            $regex: query.search,
            $options: "i",
        };
    }
    if (query.from) {
        options.difficulty = { $gte: Number(query.from) };
    }
    if (query.to) {
        options.difficulty = options.difficulty || {};
        options.difficulty.$lte = Number(query.to);
    }

    const cubes = Cube.find(options).lean();

    return cubes;
}

async function getById(id) {
    const cube = await Cube.findById(id)
        .populate("comments")
        .populate("accessories")
        .lean();
    if (cube) {
        return cube;
    } else {
        return undefined;
    }
}

async function create(cube) {
    const record = new Cube(cube);
    // it returns promise
    return record.save();
}

async function edit(id, cube) {
    const existing = await Cube.findById(id);
    if (!existing) {
        throw new ReferenceError("No such ID in database");
    }
    Object.assign(existing, cube);
    // returns promise
    return existing.save();
}

async function createComment(cubeId, comment) {
    const cube = await Cube.findById(cubeId);
    if (!cube) {
        throw new ReferenceError("No such ID in database");
    }

    const newComment = new Comment(comment);
    await newComment.save();

    cube.comments.push(newComment);
    await cube.save();
}

async function getAllAccessories(existing) {
    return Accessory.find({ _id: { $nin: existing } }).lean();
}

async function createAccessory(accessory) {
    const record = new Accessory(accessory);
    return record.save();
}

async function attachAccessory(cubeId, accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    if (!cube || !accessory) {
        throw new ReferenceError("No such ID in database");
    }

    cube.accessories.push(accessory);
    return cube.save();
}
module.exports = {
    init,
    getAll,
    getById,
    create,
    edit,
    createComment,
    createAccessory,
    getAllAccessories,
    attachAccessory,
};
