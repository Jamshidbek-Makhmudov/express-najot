const {Router} = require("express");

const router = Router();

// router.post("/auth/login", login);
// router.post("/auth/register", register);

const arr = [
  {
    id: 1,
    description: "Nimadir",
    url: "b4436512-1785-44e2-8903-9e2bec7f207a.mp4",
    created_at: new Date(),
    user_id: 1,
  },
];

router.get("/videos/:id", (req, res) => {
  const {id} = req.params;

  const videos = arr.filter((video) => video.user_id == id);

  res.render("videos", {
    videos,
  });
});

module.exports = router;
