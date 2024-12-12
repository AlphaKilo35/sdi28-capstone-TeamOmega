const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")[process.env.NODE_ENV || "development"]);

//GET all users manifested on a flight
router.get("/flight/:flight_id/users", (req, res) => {
  const { flight_id } = req.params;
  knex("manifest_tbl")
    .join("users_tbl", "manifest_tbl.user_id", "users_tbl.id")
    .where("manifest_tbl.flight_id", flight_id)

router.get('/', async (req, res) => {
  await knex('users_tbl as u')
  .join('manifest_tbl as m', 'u.id', 'm.user_id')
  .join('flight_tbl as f', 'm.flight_id', 'f.id')
  .join('departure_tbl as d', 'f.departure_id', 'd.id')
  .join('drop_zone_tbl as z', 'f.drop_zone_id', 'z.id')
  .select(
      'u.id as user_id',
      'u.name as name',
      'u.role as role',
      'u.jm as jm',
      'u.email as email',
      'm.id as manifest_id',
      'm.status as status',
      'm.lift as lift',
      'f.id as flight_id',
      'f.airframe as airframe',
      'f.type_tod as type_tod',
      'f.type_load as type_load',
      'f.date_time as date_time',
      'f.number_pax as number_pax',
      'f.number_passes as number_passes',
      'd.departure_name as departure_name',
      'z.dropzone_name as dropzone_name'
  )
  .then(data => {
      res.json(data);
  })
  .catch(err => {
      console.log('Failed to fetch unit data:', err);
      res.status(400).json({err: 'Failed to fetch unit data'})
  })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jumpLog = await knex('users_tbl as u')
    .join('manifest_tbl as m', 'u.id', 'm.user_id')
    .join('flight_tbl as f', 'm.flight_id', 'f.id')
    .join('departure_tbl as d', 'f.departure_id', 'd.id')
    .join('drop_zone_tbl as z', 'f.drop_zone_id', 'z.id')
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
