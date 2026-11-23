const { DataTypes } = require("sequelize");
const db = require("../../config/db");
const Accounts = require("./accounts");

const Sessions = db.define(
  "Sessions",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      references: {
        model: "accounts",
        key: "id",
      },
      unique: {
        name: "session_account_id_unique",
        msg: "Active session already exist",
      },
    },
    tokenId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tokenHash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    expiryAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
    tableName: "sessions",
    underscored: true,
    freezeTableName: true,
  },
);

Accounts.hasMany(Sessions, {
  foreignKey: "accountId",
  as: "sessions",
});

Sessions.belongsTo(Accounts, {
  foreignKey: "accountId",
  as: "account",
});

module.exports = Sessions;
