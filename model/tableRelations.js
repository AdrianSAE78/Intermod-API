const sequelize = require('../config/database');
const Users = require('./user');
const Scores = require('./score');
const Garments = require('./garments');
const Exchange = require('./exchange');
const Categories = require('./categories');
const UserPreferences = require('./userPreferences');

Users.hasMany(Garments, { foreignKey: 'userId', as: 'garments' });
Users.hasMany(Exchange, { foreignKey: 'senderUserId', as: 'sent_exchanges' });
Users.hasMany(Exchange, { foreignKey: 'receiverUserId', as: 'received_exchanges' });


Scores.belongsTo(Exchange, { foreignKey: 'exchangeId', as: 'exchange', onDelete: 'CASCADE' });
Scores.belongsTo(Users, { foreignKey: 'raterUserId', as: 'rater_user', onDelete: 'CASCADE' });
Scores.belongsTo(Users, { foreignKey: 'ratedUserId', as: 'rated_user', onDelete: 'CASCADE' });

Garments.belongsTo(Users, { foreignKey: 'userId', as: 'user_garments' });
Garments.hasMany(Exchange, { foreignKey: 'garmentId', as: 'exchanges' });
Garments.belongsTo(Categories, { foreignKey: 'categoryId', as: 'garment_category' });


Exchange.belongsTo(Garments, { foreignKey: 'garmentSenderId', as: 'sent_exchanges' });
Exchange.belongsTo(Garments, { foreignKey: 'garmentReceiverId', as: 'received_exchanges' });
Exchange.belongsTo(Users, { foreignKey: 'senderUserId', as: 'sender_user' });
Exchange.belongsTo(Users, { foreignKey: 'receiverUserId', as: 'receiver_user' });
Exchange.hasMany(Scores, { foreignKey: 'exchangeId', as: 'ratings' });

Categories.hasMany(Garments, { foreignKey: 'categoryId', as: 'garment_category' });

UserPreferences.belongsTo(Users, { foreignKey: 'userId', as: 'user_preferences' });

module.exports = {
    sequelize,
    Users,
    Scores,
    Garments,
    Exchange,
    Categories,
    UserPreferences,
};