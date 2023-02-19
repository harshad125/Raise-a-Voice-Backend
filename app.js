import express from 'express'
import mongooseConnection from './config/db.js'
import * as dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import cors from 'cors';
import router from './routes/User-route.js';
import applicationrouter from './routes/Application-routes.js';
const app = express()
const port = 5000
mongooseConnection();

const PORT = process.env.PORT || 5001;
app.use(cors())
app.use(express.json());

app.use('/api/user',router);
app.use('/api/application',applicationrouter)





app.listen(PORT, () => {
  console.log(`Raise a Voice Portal is listening on port ${PORT}`)
})