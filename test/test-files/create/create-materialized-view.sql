CREATE OR REPLACE MATERIALIZED VIEW my_view AS
SELECT CustomerName, ContactName, City
FROM Customers
WHERE Country = 'Brazil';
