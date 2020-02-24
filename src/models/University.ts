import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class University extends Sequelize.Model {}
University.init(
    {
        domain: {
            // For example, cuny.edu
            type: Sequelize.STRING,
            allowNull: false,
        },
        hostname: {
            // For example, qmail.cuny.edu
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        hostnameAlias: {
            // For example, qc.cuny.edu
            // This is defined by us (via the admin interface). hostname will redirect to
            // hostnameAlias in the path.
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        name: {
            // For example, Queens College. Entered by first user.
            type: Sequelize.STRING,
            allowNull: false,
        },
        nameApproved: {
            // Whether the name was approved by an admin. Also true if the name is changed by an admin.
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    { sequelize, modelName: 'university' },
);

// Any user belonging to a university can access any other university in the same
// university group.
import UniversityGroup = require('./UniversityGroup');
University.belongsTo(UniversityGroup);
export = University;
