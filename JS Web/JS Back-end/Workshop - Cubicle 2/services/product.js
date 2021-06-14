const Cube = require("../models/Cube");
const Comment = require("../models/Comment");
const Accessory = require("../models/Accessory");

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
        .populate({
            path: "comments",
            populate: { path: "author" },
        })
        .populate("accessories")
        .populate("author")
        .lean();

    // .toObject() instead of .lean() .. test it later

    if (cube) {
        const viewModel = {
            _id: cube._id,
            name: cube.name,
            description: cube.description,
            imageUrl: cube.imageUrl,
            difficulty: cube.difficulty,
            comments: cube.comments.map((c) => ({
                content: c.content,
                author: c.author.username,
            })),
            accessories: cube.accessories,
            author: cube.author?.username,
            authorId: cube.author?._id,
        };
        return viewModel;
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
    getAll,
    getById,
    create,
    edit,
    createComment,
    attachAccessory,
};
