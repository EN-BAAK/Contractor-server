import { sequelize } from "../utils/database";
import { DataTypes, Model } from "sequelize";

class Renew extends Model {
  public id!: number;
  public name!: string;
  public companyName!: string;
  public phone!: string;
  public city?: string;
  public location?: string;
  public locationLink?: string;
  public notes?: string;
}

Renew.init(
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
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locationLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING(500),
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
    tableName: "renews",
  }
);

export default Renew;
export type ReNewsType = {
  id?: number;
  name: string;
  companyName: string;
  phone: string;
  city?: string;
  location?: string;
  locationLink?: string;
  notes?: string;
};
