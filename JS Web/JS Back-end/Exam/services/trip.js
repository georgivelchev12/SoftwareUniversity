const Trip = require("../models/Trip");
const User = require("../models/User");

async function getAllTrips(orderBy) {
    // let sort = { createdAt: -1 };
    // if (orderBy == "likes") {
    //     sort = { usersLiked: "desc" };
    // }
    // return Trip.find().sort(sort).lean();
    return Trip.find().lean();
}

async function getTripById(id) {
    const trip = await Trip.findOne({ _id: id })
        .populate("creator")
        .populate("buddies")
        .lean();
    return trip;
}

async function joinTrip(tripId, userId) {
    const trip = await Trip.findOne({ _id: tripId });
    let hasBuddy = trip.buddies.find((x) => x == userId);
    if (hasBuddy) {
        throw new Error("You already joined this trip!");
    }

    trip.buddies.push(userId);
    trip.seats++;
    return trip.save();
}

async function createTrip(tripData, userId) {
    const trip = new Trip(tripData);

    const user = await User.findById(userId);
    user.tripsHistory.push(trip._id);

    await Promise.all([user.save(), trip.save()]);
    return trip;
}

async function editTrip(id, tripData) {
    const trip = await Trip.findOne({ _id: id });
    trip.startPoint = tripData.startPoint;
    trip.endPoint = tripData.endPoint;
    trip.date = tripData.date;
    trip.time = tripData.time;
    trip.carImage = tripData.carImage;
    trip.carBrand = tripData.carBrand;
    trip.seats = tripData.seats;
    trip.price = tripData.price;
    trip.description = tripData.description;
    return trip.save();
}

async function deleteTrip(id) {
    return Trip.findByIdAndDelete(id);
}

module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    editTrip,
    deleteTrip,
    joinTrip,
};
