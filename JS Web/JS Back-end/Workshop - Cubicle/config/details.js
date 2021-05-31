module.exports = {
  details: async (req, res) => {
    const cube = await req.storage.getById(req.params.id);
    if (cube == undefined) {
      res.redirect("/404");
      return;
    }
    const ctx = {
      title: "Cubicle",
      cube
      // ...cube,
    };
    res.render("details", ctx);
  },
};
