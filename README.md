# Solución prueba SQL

```
SELECT users.name, users.email, filteredOrders.amount
	FROM users INNER JOIN
          (SELECT SUM(productOrders.quantity * productOrders.price) AS amount, COUNT(*) AS orderNumber, productOrders.user_id AS userId 
		FROM (SELECT * FROM orders INNER JOIN products ON orders.product_id = products.id 
			AND products.category = 'Electronics') as productOrders 
		GROUP BY productOrders.user_id 
			HAVING SUM(productOrders.quantity * productOrders.price) > 1000 AND COUNT(*) >= 3) as filteredOrders 
	ON users.id = filteredOrders.userId ORDER BY filteredOrders.amount DESC
```
