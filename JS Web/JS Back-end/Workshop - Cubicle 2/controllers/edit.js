module.exports = {
    edit: async (req, res) => {
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
    },
    editPost: async (req, res) => {
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
    },
};
