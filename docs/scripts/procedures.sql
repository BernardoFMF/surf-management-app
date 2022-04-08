-- users

/**
 * Creates a member
 * Creates a contact
 * Creates a user
 * Creates a membership card
 * Creates a quota (optional - check if there is already a quota for the current year, 
 * if not creates it)
 */
create or replace procedure post_user(cc_ varchar(30), nif_ int, type_ varchar(40),birth_date_ DATE, nationality_ varchar(30), full_name_ varchar(60), phone_number_ int, email_ varchar(30), postal_code_ varchar(8), address_ varchar(40), location_ varchar(30), pword_ text, qrcode_ text) 

/**
 * Updates contact & user
 * Creates the user_Img
 */
create or replace procedure put_user(id_ int, cc_ varchar(30), nif_ int, type_ varchar(40),birth_date_ DATE, nationality_ varchar(30), full_name_ varchar(60), phone_number_ int, postal_code_ varchar(8), address_ varchar(40), location_ varchar(30), img_ bytea, is_admin_ bool)

/**
 * delete user is made by a simple update query (changes the member table)
 * no proc needed
 */

/**
 * Creates a user_sport
 * Verifies if this user had already practiced this sport before
 */
create or replace procedure post_user_sport(id_ int, sid_ int, fed_id_ int, fed_number int, fed_name varchar(30), type_ text [], years_federated_ int [])

/**
 * Updates user_sport
 */
create or replace procedure put_user_sport(id_ int, sid_ int, fed_id_ int, fed_number int, fed_name varchar(30), type_ text [], years_federated_ int [])

/**
 * delete user_sport association is made by a simple update query (changes the isAbsent attribute)
 * no proc needed
 */

/**
 * Creates N quotas
 * Updates the current quota value
 */
create or replace procedure post_users_quota(date_ DATE)

-- todo rest of quotas

-- sports

/**
 * Creates a sport
 */
create or replace procedure post_sport(name_ varchar(30))

/**
 * delete sport is made by a simple update query (changes the flag in sport)
 * no proc needed
 */

-- events

/**
 * Creates an event
 * no proc needed
 */

/**
 * Updates an event
 * no proc needed
 */

/**
 * Deletes an event
 * Checks if there is any attendance to this event 
 */
create or replace procedure delete_event(eid_ int)

/**
 * Creates an attendance
 * no proc needed
 */

/**
 * Updates an attendance
 * no proc needed
 */

-- candidates

/**
 * Creates a candidate
 * no proc needed
 */

/**
 * Deletes a candidate
 * no proc needed
 */

/**
 * Deletes a candidate
 * Creates a user
 */
create or replace procedure put_candidate()

-- company

/**
 * Creates a member
 * Creates a contact
 * Creates a company
 * Creates a quota (optional - check if there is already a quota for the current year, 
 * if not creates it)
 */

create or replace procedure post_company(name_ varchar(40), nif_ int, phone_number_ int, email_ varchar(30), postal_code_ varchar(8), address_ varchar(40), location_ varchar(30))

/**
 * Updates contact & company
 */
create or replace procedure put_company(cid_ int, name_ varchar(40), nif_ int, phone_number_ int, email_ varchar(30), postal_code_ varchar(8), address_ varchar(40), location_ varchar(30))

/**
 * delete company is made by a simple update query (changes the member table)
 * no proc needed
 */

-- todo quotas





