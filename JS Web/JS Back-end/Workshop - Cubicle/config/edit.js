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
      res.redirect("/");
    } catch (err) {
      res.redirect("/404");
    }
  },
};
