const sequelize = require('../db');
const {DataTypes} = require('sequelize');


const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  password: {type: DataTypes.STRING},
  name: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING, unique: true},
  phone: {type: DataTypes.STRING, unique: true},
  role: {type: DataTypes.STRING, defaultValue: 'user'}
});

const Cart = sequelize.define('cart', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const CartItem = sequelize.define('cart_item', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const Scooter = sequelize.define('scooter', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  image: {type: DataTypes.STRING, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false}
});

const Type = sequelize.define('type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: null}
});

const Brand = sequelize.define('brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: null}
});

const Specifications = sequelize.define('specifications', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: null},
  description: {type: DataTypes.STRING, allowNull: null}
});

const TypeBrand = sequelize.define('type_brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});


User.hasMany(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Type.hasMany(Scooter);
Scooter.belongsTo(Type);

Brand.hasMany(Scooter);
Scooter.belongsTo(Brand);

Scooter.hasMany(CartItem);
CartItem.belongsTo(Scooter);

Scooter.hasMany(Specifications);
Specifications.belongsTo(Scooter);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});

module.exports = {
  User,
  Cart,
  CartItem,
  Scooter,
  Type,
  Brand,
  TypeBrand,
  Specifications
};