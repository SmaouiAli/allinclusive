const router = require("express").Router();
const Event = require("../../database/Schema/Events.js");

router.get("/", async (req, res) => {
  await Event.find({}, (err, data) => {
    res.json(data);
  });
});

router.get("/:id", async (req, res) => {
  await Event.findById(req.params.id, (err, data) => {
    res.json(data);
  });
});

router.post("/add", async (req, res) => {
  newEvent = new Event({
    name: req.body.name,
    type: req.body.type,
    place: req.body.place,
    date: req.body.date,
    imgUrl: req.body.imgUrl,
    like: req.body.like,
    disLike: req.body.disLike,
  });
  await newEvent.save(() => {
    res.json(newEvent);
  });
});

router.delete("/", async (req, res) => {
  await Event.deleteMany(req.params.id, req.body);
  res.json({ message: "all data deleted" });
});

router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id, req.body);
  res.json({ message: "specific data deleted" });
});

router.put("/:id", async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "specific data updated" });
});

module.exports = router;
