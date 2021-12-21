const router = require("express").Router();

router.get("/", async (req, res) => {
  const phones = await req.storage.getAll(req.query);

  //   Add countries to listing
  phones.forEach((phone) => {
    let currentPhonesCountry = req.countryCodes.filter(
      (e) => e.phone_code === phone.countryCode
    );
    if (currentPhonesCountry.length > 0) {
      Object.assign(phone, currentPhonesCountry[0]);
    }
  });

  const ctx = {
    title: "Phone book",
    phones,
    search: req.query.search || "",
    countryCode: req.query.countryCode || "",
    countryCodes: req.countryCodes.map((code) => {
      if (code.phone_code === Number(req.query.countryCode) && Number(req.query.countryCode) !== 0) {
        code.current = "selected";
      } else {
          code.current = '';
      }
      return code;
    }),
  };
  res.render("index", ctx);
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create Phone",
    countryCodes: req.countryCodes,
  });
});

router.post("/create", async (req, res) => {
  const phone = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    countryCode: req.body.countryCode,
    phone: req.body.phone,
  };
  try {
    await req.storage.create(phone);
  } catch (err) {
    if (err.name == "ValidationError") {
      let ctx = {
        title: "Create Phone",
        error: "Something went wrong, try again. (All fields are required)",
        countryCodes: req.countryCodes.map((code) => {
          if (code.phone_code === Number(req.body.countryCode) && Number(req.body.countryCode) !== 0) {
            code.current = "selected";
          } else {
              code.current = '';
          }
          return code;
        }),
        ...phone,
      };
      if (err.errors.phone.kind === "regexp") {
        ctx.error = `
          Valid formats: <br>
            +1 123 4567890 <br>
            +11234567890 <br>
            +1(123)4567890 <br>
            +1(123)456-7890 <br>
            +1 (123) 456-7890 <br>
            +1 (123)456 7890 <br>
            +1 123 456-7890 <br>
            +1 123 456 7890 <br>
            +1 123-456-7890 <br>
            123-456-7890 <br>
            123 456-7890 <br>
            123 456 7890 <br>
            123 4567890 <br>
            1234567890`;
        return res.render("create", ctx);
      }
      return res.render("create", ctx);
    }
  }
  res.redirect("/");
});

// OWN guard
router.get("/edit/:id", async (req, res) => {
  const phone = req.data.phone;

  if (!phone) {
    res.redirect("/404");
    return;
  }

  phone[`selected${phone.difficulty}`] = true;
  res.render("edit", {
    title: "Edit phone",
    phone,
  });
});

router.post("/edit/:id", async (req, res) => {
  const phone = {
    name: req.body.name,
    description: req.body.description,
    difficulty: Number(req.body.difficulty),
  };
  try {
    await req.storage.edit(req.params.id, phone);
  } catch (err) {
    if (err.name == "ValidationError") {
      return res.render("edit", {
        title: "Edit phone",
        error: "All fields are required. Image URL must be a valid URL",
        phone: {
          _id: req.params.id,
          ...phone,
        },
      });
    }
  }
  res.redirect("/");
});

router.get("/details/:id", async (req, res) => {
  const phone = req.data.phone;
  if (phone == undefined) {
    res.redirect("/404");
    return;
  }

  phone.isOwner = req.user && phone.authorId == req.user._id;
  const ctx = {
    title: "Cubicle",
    phone,
    // ...phone,
  };
  res.render("details", ctx);
});

module.exports = router;
