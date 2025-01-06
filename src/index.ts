import express, { Request, Response} from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import connectToDatabase from './config/db';
import { initUserModel } from './models/User';
import { initTaskModel } from './models/Task';
import logger from './helper/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(authRoutes)

app.get('/', (req: Request, res: Response) => {
  logger.info('Hello again --',req);
  // Logger.info(`POST - ${Utils.getUrl(request)}`)
  res.send('NodeJs Running...')
})

// sequelize.sync()
//     .then(()=> console.log('Database Connected.'))
//     .catch((err)=> console.log('err', err))
// Connect to the database and sync the models
const startServer = async () => {
    try {
      const sequelize = await connectToDatabase;

       // Initialize models
       initUserModel(sequelize);
       initTaskModel(sequelize)
  
      // Sync the models (create tables if they don't exist)
      await sequelize.sync();
  
      console.log('Database connected and synchronized.');
  
      // Start the server
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
      console.error('Failed to initialize the application:', error);
      process.exit(1);
    }
  };
  
startServer();


