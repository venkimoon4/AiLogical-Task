const { DataTypes } = require("sequelize");
const db = require("../../config/db");

const Accounts = db.define(
  "Accounts",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: {
        name: "account_email_unique",
        msg: "Account already exist with this email",
      },
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: {
        name: "account_mobile_number_unique",
        msg: "Account already exist with this mobile number",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
    tableName: "accounts",
    underscored: true,
    freezeTableName: true,
  },
);

module.exports = Accounts;
