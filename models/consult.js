const {Model, DataTypes} = require('sequelize');
const sequelize = require('../middlewares/sequelize');

class ConsultModel extends Model{}

ConsultModel.init({
    idMail: DataTypes.INTEGER,
    guestMail: DataTypes.STRING,
    dateMail: DataTypes.DATE,
    fromMail: DataTypes.STRING,
    subjectMail: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'consults',
    timestamps: false
});

module.exports = ConsultModel;