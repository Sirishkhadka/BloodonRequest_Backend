const express = require("express");

const request = require("../models/requests");
const auth = require("../auth");
// Initialize express router
const router = express.Router();

// Set default API response
router
  .route("/requestBlood")
  .get((req, res, next) => {
    request
      .find()
      .then((requests) => {
        res.status(200).json(requests);
      })
      .catch((err) => next(err));
  })
  .post(auth.verifyUser, (req, res, next) => {
    request
      .create(req.body)
      .then((requests) => {
        res.status(201).json(requests);
      })
      .catch(next);
  });

router.route("/:id").get((req, res, next) => {
  request
    .findById(req.params.id)
    .then((requests) => {
      res.json(requests);
    })
    .catch(next);
});

router.route("/:bloodGroup/search").get((req, res, next) => {
  request
    .find({ bloodGroup: req.params.bloodGroup })

    .then(
      (requests) => {
        if (requests != null) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(requests);
        } else {
          err = new Error("Route " + req.params.bloodGroup + " not found");
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.delete("/deleteRequest/:id", function (req, res, next) {
  //console.log(req.params.id);
  request
    .findByIdAndDelete(req.params.id)
    .then(
      (reply) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(reply);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

module.exports = router;
