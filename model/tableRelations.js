const sequelize = require('../config/database');
const Users = require('./user');
const Scores = require('./score');
const Garments = require('./garments');
const Exchange = require('./exchange');
const Categories = require('./categories');
const UserPreferences = require('./userPreferences');

Scores.belongsTo(Exchange, { foreignKey: 'exchangeId', as: 'exchange', onDelete: 'CASCADE' });
Scores.belongsTo(Users, { foreignKey: 'raterUserId', as: 'rater_user', onDelete: 'CASCADE' });
Scores.belongsTo(Users, { foreignKey: 'ratedUserId', as: 'rated_user', onDelete: 'CASCADE' });

Garments.belongsTo(Users, { foreignKey: 'userId', as: 'user_garments' });

Exchange.belongsTo(Garments, { foreignKey: 'garmentSenderId', as: 'sent_exchanges' });
Exchange.belongsTo(Garments, { foreignKey: 'garmentReceiverId', as: 'received_exchanges' });
Exchange.belongsTo(Users, { foreignKey: 'senderUserId', as: 'sender_user' });
Exchange.belongsTo(Users, { foreignKey: 'receiverUserId', as: 'receiver_user' });

Categories.belongsTo(Garments, { foreignKey: 'garmentId', as: 'categories' });

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