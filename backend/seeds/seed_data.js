/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker, fakerEN_US } = require('@faker-js/faker')
const bcrypt = require('bcryptjs');
const saltRounds = 10;

function createDeparture() {
  const departures = [
    { departure_name: "MAAF" },
    { departure_name: "PAAF" },
  ];
  return departures;
}

function createDropzone() {
  const dropZones = [
    { dropzone_name: "Sicily" },
    { dropzone_name: "Normandy" },
    { dropzone_name: "Holland" },
    { dropzone_name: "St Mere" },
    { dropzone_name: "Luzon" },
  ];
  return dropZones;
}

function createUsers() {
  const users = [];
  const roles = ['user', 'leader', 'admin']
  for (var u = 0; u < 40; u++) {
    let fullName = faker.person.fullName();
    let userName = fullName.replace(/ /g, "").toLowerCase();
    let emailAddress = `${userName}@military.mil`;
    let roleType = roles[Math.floor(Math.random() * 3)];
    let jmBool = Math.random() < .5;
    let userPassword = faker.internet.password()
    // let newSalt = bcrypt.genSalt(saltRounds, (err, salt) => {
    //   if (err) {
    //     throw new Error;
    //   }
    //   return salt
    // })
    // async function hashPassword(userPassword, newSalt) {
    //   const hashedPassword = await bcrypt.hash(userPassword, newSalt, (err, hash) => {
    //     if (err) {
    //     throw new Error;
    //     }
    //     return hash
    //   })
    //   return hashedPassword;
    // }
    users.push({
      username: userName,
      password: userPassword,
      name: fullName,
      email: emailAddress,
      role: roleType,
      jm: jmBool
    })
  }
  return users;
}

function createFlights() {
  const flights = [];
  let airframes = [
    {name: "C-130", pax: 60, passes: 3},
    {name: "C-27", pax: 34, passes: 2},
    {name: "Cassa", pax: 8, passes: 1},
    {name: "UH-60", pax: 8, passes: 1},
    {name: "CH-47", pax: 44, passes: 2}
  ];
  let types = ["T", "MT", "NT", "J", "CE", "C"];
  for (var f = 0; f < 10; f++) {
    let date = faker.date.future(180);
    let flightTod;
    let newAirframe = airframes[Math.floor(Math.random() * 5)];
    let dateHour = date.getHours();
    if (dateHour > 6 && dateHour < 18) {
      flightTod = "day"
    } else {
      flightTod = "night"
    }

    let flightLoad = types[Math.floor(Math.random() * 6)];
    flights.push({
      airframe: newAirframe.name,
      type_tod: flightTod,
      type_load: flightLoad,
      departure_id: Math.floor(Math.random() * 2) + 1,
      drop_zone_id: Math.floor(Math.random() * 5) + 1,
      date_time: date,
      number_pax: newAirframe.pax,
      number_passes: Math.floor(Math.random() * 3) + 1
    })
  }
  for (var f = 0; f < 10; f++) {
    let date = faker.date.past(180);
    let flightTod;
    let newAirframe = airframes[Math.floor(Math.random() * 5)];
    let dateHour = date.getHours();
    if (dateHour > 6 && dateHour < 18) {
      flightTod = "day"
    } else {
      flightTod = "night"
    }

    let flightLoad = types[Math.floor(Math.random() * 6)];
    flights.push({
      airframe: newAirframe.name,
      type_tod: flightTod,
      type_load: flightLoad,
      departure_id: Math.floor(Math.random() * 2) + 1,
      drop_zone_id: Math.floor(Math.random() * 5) + 1,
      date_time: date,
      number_pax: newAirframe.pax,
      number_passes: Math.floor(Math.random() * 3) + 1
    })
  }
  return flights;
}

function createManifests() {
  const manifests = [];
  let status = ["complete", "schedule", "scratched"]
  for (var m = 0; m < 100; m++) {
    let flightId = Math.floor(Math.random() * 10) + 1;
    let userId = Math.floor(Math.random() * 40) + 1;
    let currentStatus = status[Math.floor(Math.random() * 3)];
    let liftNumber = Math.floor(Math.random() * 3) + 1;
    manifests.push({
      user_id: userId,
      flight_id: flightId,
      status: currentStatus,
      lift: liftNumber,
      jump_duty: false
    })
  }
  return manifests;
}


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('departure_tbl').del()
  await knex('drop_zone_tbl').del()
  await knex('users_tbl').del()
  await knex('flight_tbl').del()
  await knex('manifest_tbl').del()

  await knex('departure_tbl').insert(createDeparture());

  await knex('drop_zone_tbl').insert(createDropzone());

  await knex('users_tbl').insert(createUsers());

  await knex('flight_tbl').insert(createFlights());

  await knex('manifest_tbl').insert(createManifests());
};
