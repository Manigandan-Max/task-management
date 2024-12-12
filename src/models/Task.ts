import { Model, DataTypes, Sequelize } from 'sequelize';

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public dueDate!: Date;
  public status!: string;
  public userId!: number; // Foreign key referencing the User model
}

const initTaskModel = (sequelize : Sequelize) => {
    Task.init(
        {
          id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
          title: { type: DataTypes.STRING, allowNull: false },
          description: { type: DataTypes.STRING, allowNull: false },
          dueDate: { type: DataTypes.DATE, allowNull: false },
          status: { type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'), defaultValue: 'Pending' },
          userId: { type: DataTypes.INTEGER, allowNull: false },
        },
        {
          sequelize,
          tableName: 'tasks',
        }
      );
}


export { Task , initTaskModel};
