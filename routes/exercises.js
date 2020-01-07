const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.json(400).json("err: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const duration = Number(req.body.duration);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  newExercise
    .save()
    .then(() => res.json("Exercise Added"))
    .catch(err => res.status(400).json("err: " + err));
});

router.route("/:id").get((req, res) => {
  const ExerciseID = req.params.id;
  Exercise.findById(ExerciseID)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("err: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  const ExerciseID = req.params.id;
  Exercise.findByIdAndDelete(ExerciseID)
    .then(() => res.json("Exercise Deleted"))
    .catch(err => res.status(400).json("err: " + err));
});

router.route("/update/:id").post((req, res) => {
  const ExerciseID = req.params.id;
  Exercise.findById(ExerciseID)
    .then(exercise => {
      (exercise.username = req.body.username),
        (exercise.description = req.body.description),
        (exercise.date = req.body.date),
        (exercise.duration = req.body.duration);

      exercise
        .save()
        .then(() => res.json("Updated"))
        .catch(err => res.status(400).json("Err: " + err));
    })
    .catch(err => res.status(400).json("err: " + err));
});

module.exports = router;
