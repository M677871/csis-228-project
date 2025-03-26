const {DataTypes , Model} = require('sequelize');
const sequelize = require('../config/db-sequelize');
const moment = require('moment');

class User extends Model{}

User.init({
user_id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
},
email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    validate:{
        isEmail:true
    }
},
password_hash:{
    type:DataTypes.STRING,
    allowNull:false
},
user_type:{
    type:DataTypes.ENUM('instructor','user'),
    allowNull:false
},
create_at:{
    type:DataTypes.DATE,
    allowNull:false,
    get(){
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    }
}
},{
    sequelize,
    modelName:'User',
    tableName:'users',
    timestamps:false
});
module.exports = User;
    


