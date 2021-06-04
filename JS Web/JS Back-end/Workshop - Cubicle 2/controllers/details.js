module.exports = {
    details: async (req, res) => {
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
    },
    attach: async (req, res) => {
        const cube = await req.storage.getById(req.params.id);
        const accessories = await req.storage.getAllAccessories(
            (cube.accessories || []).map((a) => a._id)
        );
        res.render("attach", { title: "Attach Stickers", cube, accessories });
    },
    attachPost: async (req, res) => {
        const cubeId = req.params.cubeId;
        const accessoryId = req.body.accessory;
        // todo ... try catch
        await req.storage.attachAccessory(cubeId, accessoryId);
        res.redirect(`/details/${cubeId}`);
    },
};
