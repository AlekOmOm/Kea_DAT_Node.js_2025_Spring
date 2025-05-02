# MongoDB vs MySQL: Command Comparison

This guide provides a side-by-side comparison of essential database operations between MySQL (SQL) and MongoDB (NoSQL).

## Basic Database Operations

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **Create Database** | `CREATE DATABASE mydb;` | `use mydb` |
| **Switch Database** | `USE mydb;` | `use mydb` |
| **Show Databases** | `SHOW DATABASES;` | `show dbs` |
| **Drop Database** | `DROP DATABASE mydb;` | `db.dropDatabase()` |
| **Show Tables/Collections** | `SHOW TABLES;` | `show collections` |
| **Create Table/Collection** | `CREATE TABLE users (`<br>`  id INT AUTO_INCREMENT PRIMARY KEY,`<br>`  name VARCHAR(100),`<br>`  email VARCHAR(100)`<br>`);` | `db.createCollection("users")` |
| **Drop Table/Collection** | `DROP TABLE users;` | `db.users.drop()` |

## Basic CRUD Operations

### Create (Insert) Operations

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **Insert One Record** | `INSERT INTO users (name, email)`<br>`VALUES ('John', 'john@example.com');` | `db.users.insertOne({`<br>`  name: "John",`<br>`  email: "john@example.com"`<br>`})` |
| **Insert Multiple Records** | `INSERT INTO users (name, email) VALUES`<br>`('John', 'john@example.com'),`<br>`('Jane', 'jane@example.com');` | `db.users.insertMany([`<br>`  { name: "John", email: "john@example.com" },`<br>`  { name: "Jane", email: "jane@example.com" }`<br>`])` |

### Read (Query) Operations

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **Select All Records** | `SELECT * FROM users;` | `db.users.find()` |
| **Select One Record** | `SELECT * FROM users WHERE id = 1;` | `db.users.findOne({ _id: ObjectId("...") })` |
| **Select Specific Fields** | `SELECT name, email FROM users;` | `db.users.find({}, { name: 1, email: 1, _id: 0 })` |
| **Simple Condition** | `SELECT * FROM users WHERE age > 21;` | `db.users.find({ age: { $gt: 21 } })` |
| **Multiple Conditions (AND)** | `SELECT * FROM users`<br>`WHERE age > 21 AND status = 'active';` | `db.users.find({`<br>`  age: { $gt: 21 },`<br>`  status: "active"`<br>`})` |
| **Multiple Conditions (OR)** | `SELECT * FROM users`<br>`WHERE status = 'active' OR status = 'pending';` | `db.users.find({`<br>`  $or: [`<br>`    { status: "active" },`<br>`    { status: "pending" }`<br>`  ]`<br>`})` |
| **Limit Results** | `SELECT * FROM users LIMIT 10;` | `db.users.find().limit(10)` |
| **Count Records** | `SELECT COUNT(*) FROM users;` | `db.users.countDocuments()` |

### Update Operations

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **Update One Record** | `UPDATE users`<br>`SET email = 'john.doe@example.com'`<br>`WHERE id = 1;` | `db.users.updateOne(`<br>`  { _id: ObjectId("...") },`<br>`  { $set: { email: "john.doe@example.com" } }`<br>`)` |
| **Update Multiple Records** | `UPDATE users`<br>`SET status = 'active'`<br>`WHERE age >= 18;` | `db.users.updateMany(`<br>`  { age: { $gte: 18 } },`<br>`  { $set: { status: "active" } }`<br>`)` |
| **Increment a Value** | `UPDATE products`<br>`SET stock = stock + 5`<br>`WHERE id = 101;` | `db.products.updateOne(`<br>`  { _id: ObjectId("...") },`<br>`  { $inc: { stock: 5 } }`<br>`)` |

### Delete Operations

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **Delete One Record** | `DELETE FROM users WHERE id = 1;` | `db.users.deleteOne({ _id: ObjectId("...") })` |
| **Delete Multiple Records** | `DELETE FROM users WHERE status = 'inactive';` | `db.users.deleteMany({ status: "inactive" })` |
| **Delete All Records** | `DELETE FROM users;` | `db.users.deleteMany({})` |

## Intermediate Query Operations

### Sorting Results

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **Sort Ascending** | `SELECT * FROM users ORDER BY name ASC;` | `db.users.find().sort({ name: 1 })` |
| **Sort Descending** | `SELECT * FROM users ORDER BY age DESC;` | `db.users.find().sort({ age: -1 })` |
| **Multiple Sort Fields** | `SELECT * FROM users`<br>`ORDER BY age DESC, name ASC;` | `db.users.find().sort({ age: -1, name: 1 })` |

### Pagination

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **Skip and Limit** | `SELECT * FROM users`<br>`LIMIT 10 OFFSET 20;` | `db.users.find().skip(20).limit(10)` |

### Pattern Matching

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **Starts With** | `SELECT * FROM users`<br>`WHERE name LIKE 'J%';` | `db.users.find({ name: /^J/ })` |
| **Contains** | `SELECT * FROM users`<br>`WHERE name LIKE '%Smith%';` | `db.users.find({ name: /Smith/ })` |
| **Case Insensitive** | `SELECT * FROM users`<br>`WHERE LOWER(name) LIKE '%smith%';` | `db.users.find({ name: /smith/i })` |

## Advanced CRUD Operations

### Array Operations (MongoDB-specific)

| Operation | MongoDB |
|-----------|---------|
| **Add to Array** | `db.users.updateOne(`<br>`  { _id: ObjectId("...") },`<br>`  { $push: { tags: "premium" } }`<br>`)` |
| **Add Unique to Array** | `db.users.updateOne(`<br>`  { _id: ObjectId("...") },`<br>`  { $addToSet: { tags: "premium" } }`<br>`)` |
| **Remove from Array** | `db.users.updateOne(`<br>`  { _id: ObjectId("...") },`<br>`  { $pull: { tags: "trial" } }`<br>`)` |
| **Query Array Elements** | `db.products.find({ categories: "electronics" })` |
| **Query Array with Conditions** | `db.products.find({ ratings: { $elemMatch: { score: { $gt: 8 } } } })` |

### Advanced Queries

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **IN Operator** | `SELECT * FROM users`<br>`WHERE status IN ('active', 'pending');` | `db.users.find({`<br>`  status: { $in: ["active", "pending"] }`<br>`})` |
| **NOT IN** | `SELECT * FROM users`<br>`WHERE status NOT IN ('inactive', 'suspended');` | `db.users.find({`<br>`  status: { $nin: ["inactive", "suspended"] }`<br>`})` |
| **NULL Check** | `SELECT * FROM users`<br>`WHERE phone IS NULL;` | `db.users.find({ phone: null })` |
| **Field Exists** | `SELECT * FROM users`<br>`WHERE phone IS NOT NULL;` | `db.users.find({ phone: { $exists: true } })` |
| **Advanced Comparison** | `SELECT * FROM products`<br>`WHERE price BETWEEN 10 AND 50;` | `db.products.find({`<br>`  price: { $gte: 10, $lte: 50 }`<br>`})` |

### Aggregation Basics

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **Sum** | `SELECT SUM(amount) FROM orders;` | `db.orders.aggregate([`<br>`  { $group: {`<br>`    _id: null,`<br>`    total: { $sum: "$amount" }`<br>`  }}`<br>`])` |
| **Average** | `SELECT AVG(age) FROM users;` | `db.users.aggregate([`<br>`  { $group: {`<br>`    _id: null,`<br>`    average: { $avg: "$age" }`<br>`  }}`<br>`])` |
| **Group By** | `SELECT city, COUNT(*) AS count`<br>`FROM users`<br>`GROUP BY city;` | `db.users.aggregate([`<br>`  { $group: {`<br>`    _id: "$city",`<br>`    count: { $sum: 1 }`<br>`  }}`<br>`])` |

### Joining/Lookup Data

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **Basic Join** | `SELECT u.name, o.product`<br>`FROM users u`<br>`JOIN orders o ON u.id = o.user_id;` | `db.users.aggregate([`<br>`  { $lookup: {`<br>`    from: "orders",`<br>`    localField: "_id",`<br>`    foreignField: "user_id",`<br>`    as: "orders"`<br>`  }}`<br>`])` |

## Indexing Basics

| Operation | MySQL (SQL) | MongoDB |
|-----------|-------------|---------|
| **Create Index** | `CREATE INDEX idx_email ON users(email);` | `db.users.createIndex({ email: 1 })` |
| **Create Unique Index** | `CREATE UNIQUE INDEX idx_email`<br>`ON users(email);` | `db.users.createIndex(`<br>`  { email: 1 },`<br>`  { unique: true }`<br>`)` |
| **List Indexes** | `SHOW INDEX FROM users;` | `db.users.getIndexes()` |
| **Drop Index** | `DROP INDEX idx_email ON users;` | `db.users.dropIndex("email_1")` |

## Key Differences

1. **Schema Structure**:
   - MySQL: Fixed schema with predefined columns and types
   - MongoDB: Flexible schema where documents in the same collection can have different fields

2. **Data Model**:
   - MySQL: Tables with rows and columns
   - MongoDB: Collections with JSON-like documents

3. **Relationship Handling**:
   - MySQL: Foreign keys and JOIN operations
   - MongoDB: Embedded documents or referenced IDs with $lookup aggregation

4. **Query Language**:
   - MySQL: Structured Query Language (SQL)
   - MongoDB: JSON-based query language
