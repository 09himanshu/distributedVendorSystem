import {DataTypes} from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Stock', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vendor: DataTypes.STRING,
    product_id: DataTypes.STRING,
    product_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    updated_at: DataTypes.DATE
  }, {
    tableName: 'stock',
    timestamps: false
  });
};
