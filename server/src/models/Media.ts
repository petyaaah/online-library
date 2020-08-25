import { Model, DataTypes } from 'sequelize';
import { database } from '../database';

export default class Media extends Model {}

Media.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true
      },
      path: {
        type: DataTypes.STRING(2048)
      },
      created_by: {
        type: DataTypes.UUID
      },
      creation_date: {
        type: DataTypes.DATE
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: null
      },
      deletion_date: {
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'media',
      sequelize: database // this bit is important
    }
);