-- users

/**
 * Creates a member
 * Creates a contact
 * Creates a user
 * Creates a membership card
 * Creates a quota (optional - check if there is already a quota for the current year, 
 * if not creates it)
 */
create or replace procedure post_user()

/**
 * Updates contact & user
 */
create or replace procedure put_user()

/**
 * delete user is made by a simple update query (changes the member table)
 * no proc needed
 */

/**
 * Creates a user_sport
 */
create or replace procedure post_user_sport()

/**
 * Updates user_sport
 */
create or replace procedure put_user_sport()

/**
 * delete user_sport association is made by a simple update query (changes the isAbsent attribute)
 * no proc needed
 */

/**
 * Creates N quotas
 * Updates the current quota value
 */
create or replace procedure post_user_quota()

-- todo rest of quotas

-- sports

/**
 * Creates a sport
 */
create or replace procedure post_sport()

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
create or replace procedure delete_event()

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

create or replace procedure post_company()

/**
 * Updates contact & company
 */
create or replace procedure put_company()

/**
 * delete company is made by a simple update query (changes the member table)
 * no proc needed
 */

-- todo quotas





