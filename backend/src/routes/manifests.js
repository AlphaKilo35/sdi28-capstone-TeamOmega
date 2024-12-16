const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")[process.env.NODE_ENV || "development"]);

//GET all users manifested on a flight
router.get("/flight/:flight_id/users", (req, res) => {
  const { flight_id } = req.params;
  knex("manifest_tbl")
    .join("users_tbl", "manifest_tbl.user_id", "users_tbl.id")
    .where("manifest_tbl.flight_id", flight_id)
    .select(
      "users_tbl.*",
      "manifest_tbl.status",
      "manifest_tbl.id as manifest_id",
      "manifest_tbl.lift"
    )
    .then((usersOnFlight) => {
      res.status(200).json(usersOnFlight);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch users for this flight" });
    });
});
 

//get all users available for a jump
router.get("/users", async (req, res) => {
  try {
    const users = await knex("users_tbl").select("*");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

//get all manifests associated with a user
router.get("/user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  knex("manifest_tbl")
    .select("*")
    .where({ user_id: userId })  
    .then((manifest) => {     
      if (manifest) {
        res.status(200).json(manifest);
        console.log(manifest)
      } 
    })
    .catch((error)=> {
      res.status(500).json({ error: "Failed to fetch manifest" });
    });
})

//get manifest by ID
router.get("/:id", (req, res) => {
  const manifestId = parseInt(req.params.id);
  knex("manifest_tbl")
    .select("*")
    .where({ id: manifestId })
    .first()
    .then((manifest) => {
      if (manifest) {
        res.status(200).json(manifest);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch manifest" });
    });
});

//POST

router.post("/", (req, res) => {
  const { user_id, flight_id, status, lift } = req.body;

  knex("manifest_tbl")
    .insert({ user_id, flight_id, status, lift })
    .returning("*")
    .then(([{ id: manifest_id, ...rest }]) => {
      res.status(201).json({ manifest_id, ...rest });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create manifest entry" });
    });
});
//UPDATE

router.patch("/:id", async (req, res) => {
  let manifestId = parseInt(req.params.id);
  const { status } = req.body;
  knex("manifest_tbl")
    .where("id", manifestId)
    .update("status", status)
    .returning("*")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("Error updating manifest status", err);
      res.status(400).json({ err: "Failed to update manifest status" });
    });
});

//will update manifest status column based on flight id
//(need to update multiple manifest rows at once)
router.patch("/update-manifest/:flight_id", (req, res) => {
  const { flight_id } = req.params;
  const { status } = req.body;

  knex("manifest_tbl")
    .where({ flight_id })
    .update({ status })
    .returning("*")
    .then((updated) => {
      if (updated.length) {
        res.status(200).json(updated);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update manifest statuses" });
    });
});

//DELETE
router.delete("/:id", async (req, res) => {
  let manifestId = parseInt(req.params.id);
  knex("manifest_tbl")
    .where("id", manifestId)
    .del()
    .then(console.log(`Manifest ${manifestId}' deleted from database`))
    .catch((err) => {
      console.log("Error deleting manifest entry", err);
      res.status(500).json({ err: "Failed to delete manifest entry" });
    });
});

module.exports = router;