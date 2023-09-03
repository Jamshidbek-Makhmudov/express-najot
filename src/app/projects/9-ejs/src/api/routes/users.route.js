const {Router} = require("express");

const router = Router();

// router.post("/auth/login", login);
// router.post("/auth/register", register);

const arr = [
  {
    id: 1,
    fullName: "John",
    image: "tarvuz.jpg",
  },
  {
    id: 2,
    fullName: "Tony",
    image: "tarvuz.jpg",
  },
  {
    id: 3,
    fullName: "Jef",
    image: "tarvuz.jpg",
  },
  {
    id: 4,
    fullName: "Toby",
    image: "12.png",
  },
];

router.get("/", (req, res) => {
  const users = arr;
  res.render("index", {
    users,
  });
});

module.exports = router;
