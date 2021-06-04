module.exports = {
    createAccessory: (req, res) => {
        res.render("createAccessory", { title: "Create Accessory" });
    },
    accessoryPost: async (req, res) => {
        const accessory = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
        };
        try {
            await req.storage.createAccessory(accessory);
        } catch (err) {
            if (err.name == "ValidationError") {
                return res.render("createAccessory", {
                    title: "Create Accessory",
                    error: "All fields are required. Image URL must be a valid URL",
                });
            }
        }
        res.redirect("/");
    },
};
