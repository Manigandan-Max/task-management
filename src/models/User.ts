import { Model, DataTypes, Sequelize } from "sequelize";

class User extends Model{
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
}

// Export a function to initialize the User model
const initUserModel = (sequelize: Sequelize) => {
    User.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
      },
      {
        sequelize,
        tableName: 'users',
      }
    );
  };
  
  export { User, initUserModel };

export default User;