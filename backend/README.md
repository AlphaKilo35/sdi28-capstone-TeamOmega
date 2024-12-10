GET Endpoints:
1. All flight details i.e. SELECT ALL FROM flight_table JOIN departure_tbl JOIN drop_zone_tbl localhost:3000/flights
2. A flight's manifest i.e. SELECT ALL FROM manifest_tbl WHERE flight_id = flights.id JOIN USERS localhost:3000/flights/:id
3. A jumper's jump log i.e. SELECT ALL FROM manifest_tbl WHERE user_id = users_tbl.id JOIN USERS localhost:3000/users/:id
4. A unit's jump statistics localhost:3000/users

CREATE Endpoints:
1. Create a new user localhost:3000/users
2. Manifest a jumper to a flight localhost:3000/manifest
3. Create a new flight localhost:3000/flights

Update Endpoints:
1. Update manifest status localhost:3000/manifest/:id
2. Update a users role, and jm status localhost:3000/users/:id

Delete Endpoints:
1. Delete manifest entries localhost:3000/manifest/:id
2. Delete users localhost:3000/users/:id