# Answers Ex1

## What columns violate 1NF?

1-food_code and food_description because they contain comma-separated lists of values

2-dinner_date because it uses different date formats

3-venue_code and venue_description as they seem to contain related information

4-member_id, member_name, and member_address because member information is repeated

## What entities do you recognize that could be extracted?

Entities that can be extracted from the given data include:

1. Members
2. Dinners
3. Venues
4. Foods
5. Food Items
6. Dinner-Venue Relationship
7. Dinner-Member Relationship

## Name all the tables and columns that would make a 3NF compliant solution

To create a 3NF compliant solution, you'd need the following tables and columns:

### Members

- Columns: `member_id`, `member_name`, `member_address`

## Dinners

- Columns: `dinner_id`, `dinner_date`, `venue_code`

## Venues

- Columns: `venue_code`, `venue_description`

## Foods

- Columns: `food_code`, `food_description`

## Food Items

- Columns: `food_item_id`, `food_code`, `food_description`

## Dinner-Food Relationship

- Columns: `dinner_id`, `food_item_id`

## Dinner-Member Relationship

- Columns: `dinner_id`, `member_id`
