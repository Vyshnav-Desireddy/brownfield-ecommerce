# Luv2Shop

A full-stack e-commerce app: Angular frontend + Spring Boot backend, recreating the
"Luv2Shop" project from the Udemy "Full Stack: Angular and Java Spring Boot E-Commerce"
course — with an embedded H2 file database instead of MySQL, so it runs locally with
zero external services.

## Prerequisites

- **Java 17** (the backend is built and tested against Homebrew's `openjdk@17`).
  If `java -version` on your machine reports something other than 17, point
  `JAVA_HOME` at a JDK 17 install before running Maven, e.g.:
  ```bash
  export JAVA_HOME=/opt/homebrew/opt/openjdk@17   # macOS + Homebrew
  ```
- **Node.js 24.15+** and npm (the Angular CLI used here is v22, which requires it).
  If you use `nvm`: `nvm install 24.21.0 && nvm use 24.21.0`.
- **No MySQL, no Docker, no Okta account needed.**

## Running the backend

```bash
cd backend
export JAVA_HOME=/opt/homebrew/opt/openjdk@17   # if needed
./mvnw spring-boot:run
```

The backend starts on `http://localhost:8080`, with the REST API mounted at
`http://localhost:8080/api`. On first run it creates an H2 database file at
`backend/data/ecommercedb.mv.db` and seeds it from `src/main/resources/data.sql`
(product categories, ~18 sample products, and country/state reference data for
the US and India).

**Resetting the data:** stop the backend and delete `backend/data/`. The next
`spring-boot:run` recreates and reseeds it from scratch. The seed script also
truncates and re-inserts its rows on every startup, so catalog/country/state data
always matches `data.sql`; customer accounts and orders persist across restarts
until you delete the data directory.

The H2 web console is available at `http://localhost:8080/h2-console` (JDBC URL
`jdbc:h2:file:./data/ecommercedb`, user `sa`, no password) if you want to inspect
the database directly.

## Running the frontend

```bash
cd frontend
npm install
npm start
```

The frontend starts on `http://localhost:4200` and expects the backend to be
running at `http://localhost:8080/api` (see `src/environments/environment.ts`).

## Using the app

- Browse products by category or search, view product details, add to cart.
- Check out as a guest (no account required) — enter shipping/billing address
  (country selection drives a dependent state dropdown) and credit card details
  (validated locally; no real payment processing occurs).
- Register/login (top-right) to unlock the **Members** page and **Order History**,
  which lists past orders tied to your account by email.

## Differences from the original course project

- **Database: MySQL → H2.** The original course uses a MySQL server with SQL
  scripts you run manually. This version uses an embedded, file-based H2 database
  that Spring Boot creates and seeds automatically on startup — nothing to install
  or configure separately. Entity names, repository query methods, and REST endpoint
  shapes (`/api/products`, `/api/product-categories`, `/api/countries`, `/api/states`,
  `/api/checkout/purchase`, etc.) are unchanged, so course material referencing
  those endpoints still applies.
- **Auth: Okta/OIDC → local JWT.** The original course wires up Okta as an OAuth2/OIDC
  resource server, which requires creating an external Okta account and app
  registration. This version replaces that with a minimal local
  username+password system: `POST /api/auth/register` and `POST /api/auth/login`
  issue a JWT (backed by Spring Security + a `Customer.passwordHash` field), and
  `/api/orders` (order history) and the Members page require a valid bearer token.
  The public storefront and checkout endpoints remain open, matching the original
  app's guest-checkout behavior.
- **No HTTPS.** Both apps run on plain HTTP locally (backend on `:8080`, frontend
  on `:4200`), avoiding the need for a self-signed certificate/keystore in dev.
