import Sequelize = require('sequelize');

/**
 * The connection to the database.
 */
const sequelize: Sequelize.Sequelize = new Sequelize.Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
    },
);

export = sequelize;
