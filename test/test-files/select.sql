
SELECT Name FROM Products;

SELECT Name, Price FROM Products;

SELECT Name FROM Products WHERE Price <= 200;

-- with AND
SELECT * FROM Products
WHERE Price >= 60 AND Price <= 120;

-- with BETWEEN
SELECT * FROM Products
WHERE Price BETWEEN 60 AND 120;



-- Without as
SELECT Name, Price * 100 FROM Products;

-- With as
SELECT Name, Price * 100 AS PriceCents FROM Products;

 SELECT AVG(Price) FROM Products;


 SELECT AVG(Price) FROM Products WHERE Manufacturer=2;

 SELECT COUNT(*) FROM Products WHERE Price >= 180;

   SELECT Name, Price 
     FROM Products
    WHERE Price >= 180
 ORDER BY Price DESC, Name;

-- Without inner join
 SELECT * FROM Products, Manufacturers
   WHERE Products.Manufacturer = Manufacturers.Code;

-- With inner join
 SELECT *
   FROM Products INNER JOIN Manufacturers
   ON Products.Manufacturer = Manufacturers.Code;

 SELECT Products.Name, Price, Manufacturers.Name
   FROM Products, Manufacturers
   WHERE Products.Manufacturer = Manufacturers.Code;


 SELECT Products.Name, Price, Manufacturers.Name
   FROM Products INNER JOIN Manufacturers
   ON Products.Manufacturer = Manufacturers.Code;

  SELECT AVG(Price), Manufacturer
      FROM Products
GROUP BY Manufacturer;

 SELECT AVG(Price), Manufacturers.Name
   FROM Products, Manufacturers
   WHERE Products.Manufacturer = Manufacturers.Code
   GROUP BY Manufacturers.Name
   HAVING AVG(Price) >= 150;
 
 SELECT AVG(Price), Manufacturers.Name
   FROM Products INNER JOIN Manufacturers
   ON Products.Manufacturer = Manufacturers.Code
   GROUP BY Manufacturers.Name
   HAVING AVG(Price) >= 150;

   SELECT A.Name, A.Price, F.Name
   FROM Products A, Manufacturers F
   WHERE A.Manufacturer = F.Code
     AND A.Price =
     (
       SELECT MAX(A.Price)
         FROM Products A
         WHERE A.Manufacturer = F.Code
     );


   SELECT A.Name, A.Price, F.Name
   FROM Products A INNER JOIN Manufacturers F
   ON A.Manufacturer = F.Code
     AND A.Price =
     (
       SELECT MAX(A.Price)
         FROM Products A
         WHERE A.Manufacturer = F.Code
     );
