const { Schema, model }= require('mongoose');

const schema = new Schema({
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    info: {type: String, required: false},
    phone: {type: String, required: false},
    imgUrl: {type: String, required: false},
    photos: [{ type: Schema.Types.ObjectId, ref: "Photo", default: [] }],
});

module.exports = model("User", schema);
