n:**

    * Access API documentation at `[API documentation URL]`.

## API Endpoints - Examples

| Method | Endpoint                    | Description                                       |
| :----- | :-------------------------- | :------------------------------------------------ |
| POST   | /api/products               | Create a new product.                               |
| GET    | /api/products               | Retrieve a list of products.                           |
| GET    | /api/products/:productId   | Retrieve a specific product.                            |
| POST   | /api/users/register         | Register a new user.                               |
| POST   | /api/users/login            | Authenticate a user.                              |
| POST   | /api/orders                 | Create a new order.                                |
| GET    | /api/orders/:orderId       | Retrieve a specific order.                                                    |

## Example Usage - Creating a Product

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [your JWT token]" \
  -d '{
    "name": "Example Product",
    "price": 29.99,
    "description": "This is an example product.",
    "category": "Electronics"
  }' \
  http://localhost:3000/api/products
