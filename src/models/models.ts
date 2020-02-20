/**
 * A single module that imports and re-exports all of the models. This registers the 
 * models woth Sequelize and also makes them available in one module.
 */

export import Building = require('./Building');
export import Chat = require('./Chat');
export import Class = require('./Class');
export import Course = require('./Course');
export import Email = require('./Email');
export import Professor = require('./Professor');
export import Room = require('./Room');
export import Service = require('./Service');
export import Subject = require('./Subject');
export import University = require('./University');
export import UniversityGroup = require('./UniversityGroup');
export import User = require('./User');
