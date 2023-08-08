import express,{Express} from 'express'
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import cors from "cors"
import routes from "./api/routes"
import {connect} from './services/db.connection'


// Create Express Server
const app:Express = express()

// Connecting to DB
connect();

// Express configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




app.set("PORT",process.env.PORT || 5001);
app.set("BASE_URL",process.env.BASE_URL || "localhost")

//dotenv configuration to access environment variables
dotenv.config();

app.use('/api',routes)


// start server
try {
  const port : Number = app.get("PORT")
  const baseURL : String = app.get("BASE_URL")
  app.listen(port, ():void => {
    console.log(`Server is running at http://${baseURL}:${port}`)
  })
} catch (error) {
  throw error;
}

export default app;

