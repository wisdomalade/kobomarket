# KoboMarket – Multi-Vendor Marketplace with Wallets & Escrow

KoboMarket is a backend-powered multi-vendor marketplace designed to enable buyers to purchase products from multiple vendors while supporting secure wallet transactions, payment processing, and escrow-based payments.

The platform is being developed with Node.js, Express.js, MongoDB, and PostgreSQL.

## Project Overview

KoboMarket aims to provide a secure and reliable marketplace where:

- Buyers can register and manage their accounts.
- Vendors can create stores and manage products.
- Buyers can purchase products from different vendors.
- Wallet transactions are recorded securely.
- Escrow protects payments until orders are completed.
- Vendors can receive payouts after successful transactions.

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| MongoDB | User, vendor and product data |
| PostgreSQL | Financial transactions and ledger |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| Joi | Request validation |
| Swagger | API documentation |
| Jest | Automated testing |

## Core Features

- User authentication and authorization
- Role-based access control (RBAC)
- Multi-vendor product management
- Shopping cart and checkout
- Wallet management
- Double-entry financial ledger
- Escrow payment system
- Vendor payouts
- Payment integration with Paystack
- Transaction history
- Notifications and reviews

## Database Architecture

**MongoDB:** Stores users, profiles, vendors, products, reviews, carts and notifications.

**PostgreSQL:** Stores wallets, financial transactions, ledger entries, escrow records and payouts.

All monetary values are stored as integer kobo to avoid floating-point calculation errors.

## Project Structure

```text
kobomarket/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── env.js
│   │   ├── mongodb.js
│   │   └── postgres.js
│   ├── modules/
│   │   └── users/
│   │       ├── password.js
│   │       ├── user.model.js
│   │       └── user.validation.js
│   └── test-connections.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/wisdomalade/kobomarket.git
```

Navigate into the project:

```bash
cd kobomarket
```

Install dependencies:

```bash
npm install
```

Create your environment configuration file:

```bash
copy .env.example .env
```

Configure your MongoDB, PostgreSQL and other environment variables inside `.env`.

Start the development server:

```bash
npm run dev
```

## API Documentation

Swagger API documentation will be available at:

```text
http://localhost:5000/api-docs
```

## Project Status

Currently under active development.

## Developer

**Fiyinfoluwa Aladetoye (Wizzyalade)**

Backend Developer

GitHub: https://github.com/wisdomalade

---

*Building secure marketplace infrastructure with reliable financial transaction management.*