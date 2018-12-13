show databases;
use sakila;
# Q1a
select `first_name`, `last_name` from `sakila`.`actor`;

#Q1b

select upper(concat(`first_name`," ",`last_name`)) as "Actor Name" from `sakila`.`actor`;

#Q2a

select `actor_id`, `first_name`, `last_name` from `sakila`.`actor`
where `first_name` like "Joe";

#Q2b

select `actor_id`, `first_name`, `last_name` from `sakila`.`actor`
where `last_name` like "%gen%";

#Q2c

select `actor_id`, `last_name`, `first_name` from `sakila`.`actor`
where `last_name` like "%li%"
order by last_name;

#Q2d
select country_id, country from sakila.country
where country in ("Afghanistan", "Bangladesh", "China");

#Q3a
alter table sakila.actor
add column Description blob after last_name;

#Q3b
alter table `sakila`.`actor`
drop column `Description`;

#Q4a4a. List the last names of actors, as well as how many actors have that last name.
select `last_name`, count(last_name) from `sakila`.`actor`
where `last_name` is not null
group by last_name;



#Q4b. List last names of actors and the number of actors who have that last name,
# but only for names that are shared by at least two actors
select `last_name`, count(last_name) as "Count" from `sakila`.`actor`
where `last_name` is not null
group by last_name
having count(last_name)>= 2;

#4c. The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS. Write a query to fix the record.

update actor set first_name = replace(first_name,"GROUCHO","HARPO")
where last_name = "Williams" and first_name = "GROUCHO";
# Check the tables for the changes made.
select first_name, last_name from actor
where last_name = "Williams";

#4d. Perhaps we were too hasty in changing GROUCHO to HARPO. 
#It turns out that GROUCHO was the correct name after all! 
#In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO.

update actor set first_name = replace(first_name,"HARPO","GROUCHO")
where last_name = "Williams" and first_name = "HARPO";


#5a. You cannot locate the schema of the address table. 
#Which query would you use to re-create it?
show create table actor;
describe actor;
explain sakila.actor;

#6a Use JOIN to display the first and last names,
# as well as the address, of each staff member.
 #Use the tables staff and address:

select `first_name`
,`last_name`
,`address`.`address`
from `sakila`.`staff`
left join `sakila`.`address`
on `staff`.`address_id` = `address`.`address_id`;

#6b. Use JOIN to display the total amount rung up by
# each staff member in August of 2005. 
#Use tables staff and payment.

select `staff`.`first_name`
,`staff`.`last_name`
,`payment`.`staff_id`
,sum(`payment`.`amount`)
#,`payment`.`payment_date`
from `sakila`.`payment`
left join `sakila`.`staff`
on `staff`.`staff_id` = `payment`.`staff_id`
where `payment`.`payment_date` between "2005-08-01 00:00:00" and "2005-09-01 00:00:00"
group by `payment`.`staff_id`;

#6c. List each film and the number of actors who are listed for that film. 
#Use tables film_actor and film. Use inner join.
select `film`.`title`, count(`film_actor`.`film_id`) as "Actor Count"
from `sakila`.`film`
inner join `sakila`.`film_actor`
on `film_actor`.`film_id` = `film`.`film_id`
group by `film`.`title`;


#6d. How many copies of the film Hunchback 
#Impossible exist in the inventory system?

#With subqueries
Select count(film_id) from inventory
where film_id in
(select film_id from film
where title like "Hunchback Impossible");
#or with joins

select count(`inventory`.`film_id`) from `sakila`.`inventory`
join `sakila`.`film` on
`film`.`film_id` = `inventory`.`film_id`
where `film`.`title` like "Hunchback Impossible" ;


#6e. Using the tables payment and customer and the JOIN command, 
#list the total paid by each customer. 
#List the customers alphabetically by last name

select `customer`.`first_name`
,`customer`.`last_name`
,sum(`payment`.`amount`) as "Total Amount paid"
 from `sakila`.`customer`
right  join `sakila`.`payment`
on `payment`.`customer_id` = `customer`.`customer_id`
group by `customer`.`last_name`
order by `customer`.`last_name`;

#7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence.
# As an unintended consequence, films starting with the letters K and Q have also soared in popularity.
# Use subqueries to display the titles of movies starting with the letters K and Q whose language is English.

 
select film.title, film.language_id from film
where film.title like "K%" or film.title like "Q%"
and language_id in
(select language_id from language
where language.name like "English") ;

#7b. Use subqueries to display all actors who appear in
# the film Alone Trip.


select concat(first_name," ", last_name) as "Actors Name" from actor
where actor_id in
(Select actor_id from film_actor
where film_id in
(select film_id from film
where title like "Alone Trip"));

#7c. You want to run an email marketing campaign in Canada,
# for which you will need the names and email addresses of all Canadian customers. 
#Use joins to retrieve this information.

select `customer`.`first_name`, `customer`.`last_name`
,`customer`.`email`, `country`.`country` from `sakila`.`customer`
join `sakila`.`address`
on `address`.`address_id` = `customer`.`address_id` 
join `sakila`.`city` on
`city`.`city_id` = `address`.`city_id`
join `sakila`.`country` on
`country`.`country_id` = `city`.`country_id`
where `country`.`country` = "Canada";

#7d. Sales have been lagging among young families,
# and you wish to target all family movies for a promotion. 
#Identify all movies categorized as family films.

select film.title from sakila.film
join sakila.film_category
on film_category.film_id = film.film_id
join sakila.category
on category.category_id = film_category.category_id
where category.name like 'Family';


#7e. Display the most frequently rented movies in descending
# order.

select count(inventory.film_id) as "Rental Counts"
,film.title from sakila.rental
join inventory on rental.inventory_id = inventory.inventory_id
join film on film.film_id = inventory.film_id
group by film.title
order by count(inventory.film_id) desc;


#7f. Write a query to display how much business, in dollars, 
#each store brought in.


select  staff.store_id
,sum(payment.amount) from payment
join staff on
staff.staff_id= payment.staff_id
group by staff.store_id;



#7g. Write a query to display for each store its store ID,
# city, and country.
 
select store.store_id, city.city, country.country
from store
join address on
address.address_id = store.address_id
join city on 
city.city_id= address.city_id
join country on
country.country_id = city.country_id
group by store_id;
 
 
 
#7h. List the top five genres in gross revenue in descending
# order. (Hint: you may need to use the following tables: 
#category, film_category, inventory, payment, and rental.)

select category.name as "Genre"
, sum(payment.amount) as "Gross Revenue" from category
join film_category on
film_category.category_id = category.category_id
join inventory on
inventory.film_id =film_category.film_id
join rental on
rental.inventory_id = inventory.inventory_id
join payment on payment.rental_id = rental.rental_id
group by category.name
order by sum(payment.amount) desc limit 5;


#8a. In your new role as an executive, you would like to have 
#an easy way of viewing the Top five genres by gross revenue.
 #Use the solution from the problem above to create a view.
 #If you haven't solved 7h, you can substitute another query to create a view.
 
 Create view Top_five_Revenue as 
 select category.name as "Genre"
, sum(payment.amount) as "Gross Revenue" from category
join film_category on
film_category.category_id = category.category_id
join inventory on
inventory.film_id =film_category.film_id
join rental on
rental.inventory_id = inventory.inventory_id
join payment on payment.rental_id = rental.rental_id
group by category.name
order by sum(payment.amount) desc limit 5;


#8b. How would you display the view that you created in 8a?

select * from Top_five_Revenue;

#8c. You find that you no longer need the view top_five_genres.
# Write a query to delete it.

drop view Top_five_Revenue;

 