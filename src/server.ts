import express, { Express } from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { connectToPostgre } from './db/db-connection';

// Routers
import UserRouter from "./modules/users/presentation/routes"
import DollarRouter from "./modules/market/instruments/dollar/presentation/routes"
import IndicatorsRouter from "./modules/market/indicators/presentation/routes"

class Server {
  private port: number;
  private app: Express

  constructor() {
    this.port = Number(process.env.PORT) || 8000
    this.app = express()

    this.setConfig()
    this.setMiddlewares()
    this.connectDB()
  }

  private setConfig() {
    this.app.set("query parser", "extended")
  }

  private setMiddlewares() {
    this.app.use(express.json())
    
    // App routes
    this.app.use(UserRouter)
    this.app.use(DollarRouter)
    this.app.use(IndicatorsRouter)
    
    // Error handlers
    this.app.use(notFoundMiddleware)
    this.app.use(errorMiddleware)
  }

  public async connectDB() {
    await connectToPostgre()
    console.log("Successfuly connected to PostgreSQL")
  }

  public listen() {
    return this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`)
    })
  }
}

export default Server