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
  const roles = ['user', 'leader', 'admin'];
  const oOccupations = ['11A', '12A', '13A', '35A', '18A', '92A', '37A', '15A'];
  const eOccupations = ['18Z', '38Z', '11Z', '92Z', '11B', '11C', '12B', '13B', '35F', '45A', '68W', '74D', '25U', '38R', '38S', '18B', '18C', '18F', '18D', '88M', '88N', '92R', '68C',  '37B']
  const ranks = ['PV1', 'PV2', 'PFC', 'SPC', 'CPL', 'SGT', 'SSG', 'SFC', 'MSG', 'SGM', '2LT', '1LT', 'CPT', 'MAJ', 'LTC', 'COL']
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
  for (var u = 0; u < 40; u++) {
    let fullName = faker.person.fullName();
    let userName = fullName.replace(/ /g, "").toLowerCase();
    let emailAddress = `${userName}@military.mil`;
    let roleType = roles[Math.floor(Math.random() * 3)];
    let jmBool = Math.random() < .5;
    let userPassword = faker.internet.password();
    let userRank = [ranks[Math.floor(Math.random() * 16)]];
    let userMos;
    if (userRank === ('2LT' || '1LT' || 'CPT' || 'MAJ' || 'LTC' || 'COL')) {
      userMos = oOccupations[Math.floor(Math.random() * 8)];
    } else if ( userRank === ('SFC' || 'MSG' || 'SMG')) {
      userMos = eOccupations[Math.floor(Math.random() * 4)];
    } else {
      userMos = eOccupations[(Math.floor(Math.random() * 4)) + 5];
    }
    let userEts = faker.date.future(720);

    users.push({
      username: userName,
      password: encryptPassword(userPassword),
      name: fullName,
      email: emailAddress,
      role: roleType,
      jm: jmBool,
      mos: userMos,
      rank: userRank,
      uic: 'WACGD0',
      ets: userEts
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
