// app.ts
import 'reflect-metadata'
import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './configs'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import path from 'path'

// Set up mongoose connection
import {dbConfig} from './configs'
dbConfig;


const port = process.env.PORT || 3000
const app = express()
const allowedOrigins = ["http://localhost:4200"];
const corsOptions = {
  origin: (origin: any, callback: (err: any, allow?: any) => void) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true  // Add this line
};

console.log(path.join(__dirname,'uploads'));

app.use(express.static(path.join(__dirname,'uploads')));
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))



// Set up InversifyExpressServer
const server = new InversifyExpressServer(
  container,
  null,
  { rootPath: '/api/v1'},
  app
)

const appConfigured = server.build()

appConfigured.listen(port, () => {
  console.log('Server is running on port ' + port)
})

export default app;