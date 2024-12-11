import { sequelize } from "../utils/database";
import { DataTypes, Model } from "sequelize";

class Contract extends Model {
  public id!: number;
  public name!: string;
  public companyName!: string;
  public phone!: string;
  public city!: string;
  public location!: string;
  public locationLink?: string;
  public notes?: string;
  public date!: Date;
  public tester_id!: number;
  public tester_name!: string;
  public done!: "true" | "false";
}

Contract.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locationLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tester_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tester_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.ENUM("true", "false"),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "contracts",
  }
);

export default Contract;
