const { isUser } = require("../middlewares/guards");

const router = require("express").Router();

router.get("/list", async (req, res) => {
    // const trips = await req.storage.getAllTrips(req.query.orderBy);
    const trips = await req.storage.getAllTrips();
    res.render("trip/list", { trips });
});

router.get("/create", isUser(), async (req, res) => {
    res.render("trip/create");
});

router.post("/create", isUser(), async (req, res) => {
    try {
        // To do ... .trim()
        const tripData = {
            startPoint: req.body.startPoint,
            endPoint: req.body.endPoint,
            date: req.body.date,
            time: req.body.time,
            carImage: req.body.carImage,
            carBrand: req.body.carBrand,
            seats: req.body.seats,
            price: req.body.price,
            description: req.body.description,
            creator: req.user._id,
        };
        await req.storage.createTrip(tripData, req.user._id);
        res.redirect("/trip/list");
    } catch (err) {
        let errors;
        if (err.errors) {
            // If errors come from mongodb validators
            errors = Object.values(err.errors).map(
                (e) => e.properties?.message
            );
        } else {
            errors = [err.message];
        }
        const ctx = {
            errors,
            tripData: {
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date,
                time: req.body.time,
                carImage: req.body.carImage,
                carBrand: req.body.carBrand,
                seats: req.body.seats,
                price: req.body.price,
                description: req.body.description,
            },
        };
        res.render("trip/create", ctx);
    }
});

router.get("/details/:id", async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);
        if (req.user) {
            trip.hasUser = Boolean(req.user);
            trip.isCreator = req.user && req.user._id == trip.creator._id;
            trip.seatsLeft = 4 - trip.seats || false;
            trip.isJoined =
                trip.buddies.find((x) => x._id == req.user._id) !== undefined;
        }
        res.render("trip/details", { trip });
    } catch (err) {
        console.log(err.message);
        res.redirect("/404");
    }
});

router.get("/join/:id", isUser(), async (req, res) => {
    try {
        await req.storage.joinTrip(req.params.id, req.user._id);
        res.redirect("/trip/details/" + req.params.id);
    } catch (err) {
        console.log(err.message);
        res.redirect("/trip/details/" + req.params.id);
    }
});

router.get("/edit/:id", isUser(), async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);
        if (trip.creator._id != req.user._id) {
            throw new Error("Cannot edit trip you havent created");
        }
        res.render("trip/edit", { trip });
    } catch (err) {
        console.log(err.message);
        res.redirect(`/trip/details/${req.params.id}`);
    }
});
router.post("/edit/:id", isUser(), async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);
        if (trip.creator._id != req.user._id) {
            throw new Error("Cannot edit trip you havent created");
        }
        await req.storage.editTrip(req.params.id, req.body);
        res.redirect(`/trip/details/${req.params.id}`);
    } catch (err) {
        let errors;
        if (err.errors) {
            // If errors come from mongodb validators
            errors = Object.values(err.errors).map((e) => e.properties.message);
        } else {
            errors = [err.message];
        }
        const ctx = {
            errors,
            trip: {
                _id: req.params._id,
                startPoint: req.body.startPoint,
                endPoint: req.body.endPoint,
                date: req.body.date,
                time: req.body.time,
                carImage: req.body.carImage,
                carBrand: req.body.carBrand,
                seats: req.body.seats,
                price: req.body.price,
                description: req.body.description,
            },
        };
        res.render(`trip/edit`, ctx);
    }
});
router.get("/delete/:id", isUser(), async (req, res) => {
    try {
        const trip = await req.storage.getTripById(req.params.id);
        if (trip.creator._id != req.user._id) {
            throw new Error("Cannot edit trip you havent created");
        }
        await req.storage.deleteTrip(req.params.id);
        res.redirect(`/trip/list`);
    } catch (err) {
        console.log(err.message);
        res.redirect(`/trip/details/${req.params.id}`);
    }
});


module.exports = router;
