# Distributed Order Aggregator System

## Overview
This is a Node.js-based Distributed Order Aggregator System that:
- Aggregates stock from multiple vendor systems
- Stores a local copy in PostgreSQL
- Processes orders via a REST API
- Uses RabbitMQ for async and safe order handling
- Designed with microservices architecture

## Tech Stack
| Component    | Tech                   |
| ------------ | ---------------------- |
| Language     | JavaScript (Node.js)   |
| Database     | PostgreSQL             |
| Messaging    | RabbitMQ               |
| Architecture | Microservices (Docker) |
| ORM          | Sequelize              |

## Microservices
| Service                | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `vendor-sync-service`  | Periodically syncs vendor stock to local DB               |
| `order-api-service`    | Exposes `POST /order`, reserves stock, publishes to queue |
| `order-worker-service` | Consumes orders from the queue and updates status         |
| `mock-vendors`         | Simulated vendor APIs for stock (VendorA, VendorB)        |

## PostgreSQL Schema
### stock
| Field          | Type      | Description                 |
| -------------- | --------- | --------------------------- |
| `id`           | INT       | Primary key                 |
| `vendor`       | TEXT      | Vendor name (e.g., vendorA) |
| `product_id`   | TEXT      | Product ID                  |
| `product_name` | TEXT      | Product name                |
| `quantity`     | INT       | Current stock quantity      |
| `updated_at`   | TIMESTAMP | Last sync time              |
| `created_at`   | TIMESTAMP | Created date                |

### orders
| Field        | Type      | Description                         |
| ------------ | --------- | ----------------------------------- |
| `id`         | INT       | Primary key                         |
| `product_id` | TEXT      | Product ordered                     |
| `quantity`   | INT       | Quantity ordered                    |
| `status`     | TEXT      | `pending`, `processed`, or `failed` |
| `created_at` | TIMESTAMP | Order time                          |
| `updated_at`   | TIMESTAMP | Last sync time                    |

# Getting Started
## Prerequisites
- Docker
- Docker Compose

### Run the system
```bash
docker compose up --build -d
docker ps
```
### This starts:
- PostgreSQL
- PgAdmin4
- RabbitMQ
- All microservices (vendor-sync, order-api, order-worker, mock_vendors)

## Mock Vender
- Dummy data sent to vendor-sync


## Sync Vendor Stock
Stock is synced every 10 seconds from:
- GET http://mock_vendor:5001/api/v1/vendor/AStock (for container communication) | http://0.0.0.0:5001/api/v1/vendor/AStock
- GET http://mock_vendor:5001/api/v1/vendor/BStock (for container communication) | http://0.0.0.0:5001/api/v1/vendor/BStock

Data is inserted or incremented in the `stock` table.

## Place Order
Send a request to:
```
POST http://localhost:5002/api/v1/order/place
Content-Type: application/json
```
Body:
```
{
  "product_id": "A001",
  "quantity": 300
}
```
- Stock is checked and reserved atomically
- Order is created with status = pending
- The order is sent to the orderQueue in RabbitMQ
- To put a load on the system, an internal timeInterval hit and place an order every 3 seconds

## Order Worker
The worker:
- Listens to `orderQueue`
- Randomly succeeds (80%) or fails (20%)
- Updates the order status accordingly

## Commands
| Task                       | Command                                                               |
| -------------------------- | --------------------------------------------------------------------- |
| Place order (manual)       | Use Postman or `curl`                                                 |
| Monitor queue              | Visit RabbitMQ UI at [http://localhost:15672](http://localhost:15672) |
| DB GUI PgAdmin             | http://localhost:80                                                   |

## Author
Himanshu Sah
