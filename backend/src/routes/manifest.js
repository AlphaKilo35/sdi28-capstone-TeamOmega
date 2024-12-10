const express = require("express");
const router = express.Router();
const knex = require("../../knex");

// GET all flights
router.get("/flights", async (req, res) => {
  try {
    const flights = await knex("flight_tbl").select("*");
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await knex("users_tbl").select("*");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

//GET all manifests
router.get("/manifest", async (req, res) => {
  try {
    const manifest = await knex("manifest_tbl").select("*");
    res.status(200).json(manifest);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch manifest" });
  }
});

//GET all users manifested on a flight
router.get("/manifest/flight/:flight_id/users", async (req, res) => {
  try {
    const { flight_id } = req.params;
    const usersOnFlight = await knex("manifest_tbl")
      .join("users_tbl", "manifest_tbl.user_id", "users_tbl.id")
      .where("manifest_tbl.flight_id", flight_id)
      .select("users_tbl.*", "manifest_tbl.status", "manifest_tbl.lift");
    res.status(200).json(usersOnFlight);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users for this flight" });
  }
});

//will update manifest status to complete column based on flight id
router.patch("/update-manifest/:flight_id", async (req, res) => {
  try {
    const { flight_id } = req.params;
    const { status } = req.body;

    const updated = await knex("manifest_tbl")
      .where({ flight_id })
      .update({ status })
      .returning("*");

    if (updated.length) {
      res.status(200).json(updated);
    } else {
      res
        .status(404)
        .json({ error: "No manifest entries found for this flight" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update manifest statuses" });
  }
});

//same as above, but will now update based on lift # and flight id
router.patch("/update-manifest/:flight_id/:lift", async (req, res) => {
  try {
    const { flight_id, lift } = req.params;
    const { status } = req.body;

    const updated = await knex("manifest_tbl")
      .where({
        flight_id: flight_id,
        lift: lift,
      })
      .update({ status })
      .returning("*");

    if (updated.length) {
      res.status(200).json(updated);
    } else {
      res
        .status(404)
        .json({ error: "No manifest entries found for this flight and lift" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update manifest statuses" });
  }
});

//CREATE a new flight manifest
router.post("/manifest", async (req, res) => {
  try {
    const { user_id, flight_id, status, lift } = req.body;
    const [id] = await knex("manifest_tbl")
      .insert({ user_id, flight_id, status, lift })
      .returning("id");
    res.status(201).json({ id, user_id, flight_id, status, lift });
  } catch (error) {
    res.status(500).json({ error: "Failed to create manifest entry" });
  }
});

//DELETE a manifest entry by checking the user_id, flight_id, and lift #
//could get weird in the future trying to dig for the right manifest id associated with those
router.delete(
  "/manifest/user/:user_id/flight/:flight_id/lift/:lift",
  async (req, res) => {
    try {
      const { user_id, flight_id, lift } = req.params;
      const deleted = await knex("manifest_tbl")
        .where({
          user_id,
          flight_id,
          lift,
        })
        .del()
        .returning("*");
      if (deleted.length) {
        res.status(200).json({
          message: `Successfully deleted manifest entry`,
          deletedEntry: deleted[0],
        });
      } else {
        res
          .status(404)
          .json({ error: "No manifest entry found matching these criteria" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete manifest entry" });
    }
  }
);

module.exports = router;
