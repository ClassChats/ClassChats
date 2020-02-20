/**
 * Creates the tables on the database.
 */

require('dotenv').config();
import sequelize = require('../connectors/dbConnector');

// // Make sure the connection is working
// squelize.authenticate()
//     .then(() => {
//         console.log('Success');
//     })
//     .catch((err) => {
//         console.log('Error:');
//         console.log(err);
//     });

// Register the models
import '../models/models';

// Create the tables
sequelize.sync();

// // Sync the models in dependency order. sequilize.sync() should do this.
// syncModels();
// async function syncModels() {
//     try {
//         await models.Building.sync();
//         await models.Professor.sync();
//         await models.Room.sync();
//         await models.UniversityGroup.sync();
//         await models.University.sync();
//         await models.Subject.sync();
//         await models.Course.sync();
//         await models.Class.sync();
//         await models.Service.sync();
//         await models.User.sync();
//         await models.Chat.sync();
//         await models.Email.sync();
//     } catch (err) {
//         throw(err);
//     }
// }
