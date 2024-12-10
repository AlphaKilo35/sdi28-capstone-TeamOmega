GET Endpoints:
1. A flights details i.e. SELECT ALL FROM flight_table JOIN departure_tbl JOIN drop_zone_tbl
2. A flight's manifest i.e. SELECT ALL FROM manifest_tbl WHERE flight_id = flights.id JOIN USERS
3. A jumper's jump log i.e. SELECT ALL FROM manifest_tbl WHERE user_id = users_tbl.id JOIN USERS

CREATE Endpoints:
1. Create a new user
2. Manifest a jumper to a flight
3. Create a new flight

Update Endpoints:
1. Update manifest status
2. Update a users role, and jm status

Delete Endpoints:
1. Delete manifest entries
2. Delete users