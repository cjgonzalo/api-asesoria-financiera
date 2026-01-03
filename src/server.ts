import express, { Express } from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { connectToPostgre } from './db/db-connection';

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