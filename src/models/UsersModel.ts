import { UserType } from "../shared/types";
import { sequelize } from "../utils/database";
import { DataTypes, Model } from "sequelize";

class User extends Model<UserType> implements UserType {
  public id!: number;
  public fullName!: string;
  public mobileNumber!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "tester", "secretary", "mainTester"),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "users",
  }
);

export default User;
