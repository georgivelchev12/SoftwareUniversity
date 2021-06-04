module.exports = {
    commentPost: async (req, res) => {
        //   res.render("about", { title: "About" });
        const cubeId = req.params.cubeId;
        const comment = {
            author: req.body.author,
            content: req.body.content,
        };
        // to do ... await
        await req.storage.createComment(cubeId, comment);
        res.redirect(`/details/${cubeId}`);
    },
};
