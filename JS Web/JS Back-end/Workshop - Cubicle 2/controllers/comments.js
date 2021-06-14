module.exports = {
    commentPost: async (req, res) => {
        const authorId = req.user._id;
        //   res.render("about", { title: "About" });
        const cubeId = req.params.cubeId;
        const comment = {
            author: authorId,
            content: req.body.content,
        };
        // to do ... await
        await req.storage.createComment(cubeId, comment);
        res.redirect(`products/details/${cubeId}`);
    },
};
