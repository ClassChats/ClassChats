import Sequelize = require('sequelize');

const DataTypes = Sequelize.DataTypes;

// Check the environment variables
if (!process.env.DB_DATABASE || !process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
    console.error(
        'You must supply values for DB_DATABASE, DB_USERNAME, and DB_PASSWORD as environment variables.',
    );
    process.exit(1);
}

// Initialize the connection to the database
const sequelize = new Sequelize.Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
);

sequelize
    .authenticate() // Test the connection
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    })
    .then(() => {
        // Define the models
        const User = sequelize.define('User', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        const Email = sequelize.define('Email', {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        const University = sequelize.define('University', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            domain: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        const Department = sequelize.define('Department', {
            abbreviation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        const Course = sequelize.define('Course', {
            number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        const Class = sequelize.define('Class', {
            section: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        });

        const Professor = sequelize.define('Professor', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        const Chat = sequelize.define('Chat', {
            link: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        const Platform = sequelize.define('Platform', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            regex: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        // Create the relationships
        User.hasMany(Email);
        Email.belongsTo(User);

        University.hasMany(Email);
        Email.belongsTo(University);

        University.hasMany(Department);
        Department.belongsTo(University);

        Department.hasMany(Course);
        Course.belongsTo(Department);

        Course.hasMany(Class);
        Class.belongsTo(Course);

        University.hasMany(Professor);
        Professor.belongsTo(University);

        Professor.hasMany(Class);
        Class.belongsTo(Professor);

        Class.hasMany(Chat);
        Chat.belongsTo(Class);

        Platform.hasMany(Chat);
        Chat.belongsTo(Platform);

        // Sync the models
        if (process.env.DB_DROPONSYNC) {
            sequelize.sync({ force: true });
        } else if (process.env.DB_ALTERONSYNC) {
            sequelize.sync({ alter: true });
        } else {
            sequelize.sync();
        }
    })
    .catch((err) => {
        console.error('Unable to create models:', err);
    });

// Export the Sequelize instance
export = sequelize;
