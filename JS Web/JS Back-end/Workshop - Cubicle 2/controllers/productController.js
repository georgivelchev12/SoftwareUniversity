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

router.get("/create", (req, res) => {
    res.render("create", { title: "Create Cube" });
});

router.post("/create", async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficulty: Number(req.body.difficulty),
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


router.get("/edit/:id", async (req, res) => {
    const cube = await req.storage.getById(req.params.id);
    cube[`selected${cube.difficulty}`] = true;
    if (!cube) {
        res.redirect("/404");
        return;
    }

    res.render("edit", {
        title: "Edit Cube",
        cube,
    });
});

router.post("/edit/:id", async (req, res) => {
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

router.get("/details/:id", async (req, res) => {
    const cube = await req.storage.getById(req.params.id);
    if (cube == undefined) {
        res.redirect("/404");
        return;
    }
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
