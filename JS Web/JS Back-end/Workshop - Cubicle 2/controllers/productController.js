const { isAuth, isOwner } = require("../middlewares/guards");
const { preloadCube } = require("../middlewares/preload");

const router = require("express").Router();

router.get("/", async (req, res) => {
    const cubes = await req.storage.getAll(req.query);
    const ctx = {
        title: "Cubicle",
        cubes,
        search: req.query.search || "",
        from: req.query.from || "",
        to: req.query.to || "",
    };
    res.render("index", ctx);
});

router.get("/create", isAuth(), (req, res) => {
    res.render("create", { title: "Create Cube" });
});

router.post("/create", isAuth(), async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty),
        author: req.user._id,
    };
    try {
        await req.storage.create(cube);
    } catch (err) {
        if (err.name == "ValidationError") {
            return res.render("create", {
                title: "Create Cube",
                error: "All fields are required. Image URL must be a valid URL",
            });
        }
    }
    res.redirect("/");
});

// OWN guard
router.get("/edit/:id", preloadCube(), isOwner(), async (req, res) => {
    const cube = req.data.cube;

    if (!cube) {
        res.redirect("/404");
        return;
    }

    cube[`selected${cube.difficulty}`] = true;
    res.render("edit", {
        title: "Edit Cube",
        cube,
    });
});

router.post("/edit/:id", preloadCube(), isOwner(), async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty),
    };
    try {
        await req.storage.edit(req.params.id, cube);
    } catch (err) {
        if (err.name == "ValidationError") {
            return res.render("edit", {
                title: "Edit Cube",
                error: "All fields are required. Image URL must be a valid URL",
                cube: {
                    _id: req.params.id,
                    ...cube,
                },
            });
        }
    }
    res.redirect("/");
});

router.get("/details/:id", preloadCube(), async (req, res) => {
    const cube = req.data.cube;
    if (cube == undefined) {
        res.redirect("/404");
        return;
    }

    cube.isOwner = req.user && (cube.authorId == req.user._id);
    const ctx = {
        title: "Cubicle",
        cube,
        // ...cube,
    };
    res.render("details", ctx);
});

router.get("/attach/:cubeId", async (req, res) => {
    const cube = await req.storage.getById(req.params.cubeId);
    const accessories = await req.storage.getAllAccessories(
        (cube.accessories || []).map((a) => a._id)
    );
    res.render("attach", { title: "Attach Stickers", cube, accessories });
});

router.post("/attach/:cubeId", async (req, res) => {
    const cubeId = req.params.cubeId;
    const accessoryId = req.body.accessory;

    // todo ... try catch
    await req.storage.attachAccessory(cubeId, accessoryId);
    res.redirect(`/details/${cubeId}`);
});

module.exports = router;
