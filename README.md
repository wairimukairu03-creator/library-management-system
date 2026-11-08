## Schema Decisions

### Why Book References Genre via Foreign Key Instead of Embedding It

In a relational architecture using PostgreSQL, splitting `Book` and `Genre` into distinct tables linked via a foreign key reference (`genreId`) is preferred over nesting/embedding because:

- **Data Integrity and Normalization:** It prevents data anomalies. If a genre name changes (e.g., changing "Sci-Fi" to "Science Fiction"), it only needs to be updated in one row within the `Genre` table, rather than updating hundreds of individual book rows.
- **Query Performance & Filtering:** It enables cleaner indexing strategies and facilitates aggregation tasks, such as finding all unique categories or counting books per genre without scanning entire data structures.

### Prisma Modeling vs. Document Databases (Stretch Reflection)

When modeling schemas, a core difference experienced between Prisma (relational) and document databases (like MongoDB) is **strict schema enforcement and declarative relations**:

- In a document database, relationships are loosely structured, often handled dynamically at the application level via embedded objects or manual object ID lookups.
- Prisma forces strict compile-time types, migrations, and absolute constraint checks directly in the schema layer. This ensures that a `Book` cannot point to a non-existent `Genre`, eliminating orphan or broken relational references at the database level.
