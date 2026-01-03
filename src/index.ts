import "dotenv/config"
import Server from "./server"
import { gracefulShutdown } from "./helpers/server.helper" 

(async () => {
  const serverInstance = new Server().listen()
  process.on("SIGINT", signal => { gracefulShutdown(signal, serverInstance) })
  process.on("SIGTERM", signal => { gracefulShutdown(signal, serverInstance) })
})()