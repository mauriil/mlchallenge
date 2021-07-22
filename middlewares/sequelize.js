const Sequelize = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(config.get('SEQUELIZE.database'), config.get('SEQUELIZE.user'), config.get('SEQUELIZE.password'), {  
    host: config.get('SEQUELIZE.host'),
    port: config.get('SEQUELIZE.port'),
    dialect: config.get('SEQUELIZE.dialect'),
    logging: config.get('SEQUELIZE.logging')
});

module.exports = sequelize;
