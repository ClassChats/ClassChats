## setup.ts

### Environment Variables

**Database connection:**
- `DB_DATABASE`: The database name to connect to
- `DB_USERNAME`: The database username
- `DB_PASSWORD`: The database password
- `DB_HOST`: The database host (URL)

**Database modification**
- `DB_DROPONSYNC`: Drop tables and recreate them (cannot be used with `DB_ALTERONSYNC`)
- `DB_ALTERONSYNC`: Modify tables to match models (cannot be used with `DB_DROPONSYNC`)