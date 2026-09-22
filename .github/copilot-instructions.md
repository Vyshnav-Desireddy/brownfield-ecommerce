# Project Context — brownfield-ecommerce

## 1. Application Context

Architecture: Two independently run apps — backend/ (Spring Boot REST API, port 8080, all routes under /api) and frontend/ (Angular SPA, port 4200) — communicating over HTTP/JSON. No shared runtime; the frontend calls the backend via environment.apiUrl = 'http://localhost:8080/api' (frontend/src/environments/environment.ts).

Backend layout (backend/src/main/java/com/example/ecommerce/): controller/ (AuthController, CheckoutController, OrderHistoryController) → service/ (CheckoutServiceImpl) → dao/ (6 Spring Data JPA repositories) → entity/ (8 JPA entities), plus security/ (JWT) and config/ (security, CORS, REST exposure).

Frontend layout (frontend/src/app/): components/ (13 standalone components), services/ (6 injectable services + auth guard + HTTP interceptor), common/ (model classes mirroring backend DTOs), validators/.

API mechanism: two styles coexist — Spring Data REST auto-exposes Product, ProductCategory, Country, State as read-only HAL resources (writes disabled in MyDataRestConfig); hand-written controllers handle auth, checkout, and order history.

Data flow (checkout, representative): CartService (client-only) → CheckoutService.placeOrder() → POST /api/checkout/purchase → CheckoutController → CheckoutServiceImpl (generates UUID tracking number, finds-or-creates Customer by email, cascades save through Order/OrderItem in a @Transactional method).

Authentication: local JWT. AuthController issues tokens on register/login (BCrypt-hashed passwords); JwtAuthFilter validates the Authorization: Bearer header on each request and populates the Spring Security context; sessions are stateless, CSRF is disabled (SecurityConfig.java). Public routes: /api/auth/**, /api/checkout/**, /api/products/**, /api/product-categories/**, /api/countries/**, /api/states/**, /h2-console/**, /swagger-ui/**, /v3/api-docs/**. Everything else (notably /api/orders/**) requires a valid JWT.

Data model: Customer 1—* Order 1—* OrderItem; Product —1 ProductCategory; Order embeds billing/shipping Address; Country 1— State. Full field-level detail in entity/.

Persistence: embedded H2 file database (backend/data/ecommercedb.mv.db), schema managed by Hibernate (ddl-auto=update), reseeded from data.sql on every startup.

## 2. Business Context

Domain: an online retail storefront — product catalog, cart, checkout, order history. The README states this recreates the "Luv2Shop" project from the Udemy course "Full Stack: Angular and Java Spring Boot E-Commerce," with the original MySQL database and Okta/OIDC auth replaced by embedded H2 and local JWT so it "runs locally with zero external services" (README.md).

Users: guest shoppers (no account needed to browse or check out) and registered customers/"Members" (single role, ROLE_USER — no admin, staff, or seller role exists anywhere in the code).

Major business entities: Customer, Product, ProductCategory, Order, OrderItem, Address (embedded), Country, State. Seeded catalog categories: Books, DVDs, Toys, Electronics, Grocery, Vitamins; seeded countries: US and India only (data.sql).

Key workflows: browse/search catalog → manage cart (client-side only) → guest or member checkout → (members) register/login → view own order history.

Business rules visible in code:

Customer email is the unique identity; duplicate registration is rejected with 409 CONFLICT.
Checkout finds-or-creates a Customer by email — a guest checking out with an existing account's email attaches the order to that account without logging in.
Password must be ≥6 characters — enforced client-side only; no matching server-side length rule exists.
Address/name fields reject blank/whitespace-only input; card number must be 16 digits, CVV 3 digits, expiration not in the past — all enforced client-side, no server-side equivalent.
Catalog/reference data (Product, ProductCategory, Country, State) cannot be mutated via the API — read-only by explicit configuration.
Order history is scoped server-side to the authenticated user's email.
Order total is computed client-side and persisted as-is; the backend does not recompute or validate it.
Order status is set once to 'pending' at checkout with no other code path that changes it; no cancellation, refund, or inventory-decrement logic exists.
Assumption (not asserted in code, only inferred from the README's framing): this is a learning/portfolio project rather than a production system — no real payment processing occurs, per the README.

## 3. Product Context

Screens/routes (app.routes.ts):

Route	Purpose	Auth
/products, /category/:id, /search/:keyword	Product list (all / by category / search), paginated	No
/products/:id	Product detail	No
/cart-details	Cart view	No
/checkout	Address + mock card entry, order placement	No
/login	Combined login/register (mode toggle)	No
/members	Welcome page, link to order history	Yes
/order-history	Paginated past orders	Yes
Persistent navbar on every page: brand link, search box, cart status, login status.

Major features: catalog browse/search/paginate; category filtering; cart add/increment/decrement/remove; guest checkout with cascading country→state address selection and "copy shipping to billing"; register/login/logout with JWT session; route-guarded members area; per-user paginated order history.

Feature dependencies: checkout depends on cart state and on country/state reference endpoints; order history and members page depend on the auth guard and the global HTTP interceptor that attaches the JWT to every request; product listing/search depends on Spring Data REST finder methods (findByCategoryId, findByNameContainingIgnoreCase) exposed from ProductRepository.

Confirmed absent (checked exhaustively against the component/controller source): order cancellation/editing/status tracking, product reviews, wishlist, password reset, user profile editing, admin/back-office screens, real payment processing.

## 4. Technology Context


Category	Technology	Verified in
Frontend framework	Angular ^22.1.0, standalone components, Signals, Reactive Forms	frontend/package.json, app.config.ts
Backend framework	Spring Boot 3.2.5 (Web, Data JPA, Data REST, Validation, Security starters)	backend/pom.xml
Languages	Java 17 (backend); TypeScript ~6.0.2, target ES2022 (frontend); SCSS; SQL	pom.xml:20, tsconfig.json
Database	H2, embedded file-based (backend/data/ecommercedb.mv.db)	application.properties
Auth technology	JWT via jjwt 0.12.5 (HMAC-SHA), Spring Security, BCrypt password hashing, stateless sessions	pom.xml:60-76, SecurityConfig.java
APIs	REST/JSON at /api; Spring Data REST (HAL) for catalog/reference data; custom controllers for auth/checkout/orders; OpenAPI/Swagger UI via springdoc 2.5.0	MyDataRestConfig.java
Third-party integrations	None found beyond embedded libraries (H2, jjwt, springdoc, Lombok, Bootstrap) — no payment gateway, external identity provider, or external network calls in source	full pom.xml/package.json review
Build tools	Maven via Maven Wrapper (mvnw) with Lombok annotation processing (backend); Angular CLI ^22.1.8 with @angular/build, npm 11.19.0, Prettier (frontend)	backend/pom.xml, frontend/angular.json
Testing tools	spring-boot-starter-test + spring-security-test (backend); Vitest ^4.0.8 + jsdom (frontend) — both configured but no test files exist in either backend/src/test or frontend/src/**/*.spec.ts	pom.xml:85-94, package.json
Deployment/infrastructure	None visible. No Dockerfile, CI/CD workflow, IaC, or cloud config in the repo. Local-only run via ./mvnw spring-boot:run / npm start, plain HTTP, no certificates. .github/modernize/ contains only local IDE-extension hook scripts, unrelated to app deployment	repo-wide file search
Unknown: production deployment target, hosting environment, CI pipeline, and any secrets-management approach beyond the hardcoded dev JWT secret in application.properties — none of this is present or referenced anywhere in the repository.