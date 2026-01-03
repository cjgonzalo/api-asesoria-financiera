import { Server } from "http";
import { disconnectFromPostgre } from "../db/db-connection";

export const gracefulShutdown = (signal: string, server: Server) => {
  console.log(`\nA ${signal} signal was received, waiting for current operations to conclude before shutting down connections`)
  try {
    server.close(() => {
      console.log("HTTP server successfully disconnected")
        disconnectFromPostgre().then(() => {
          console.log("Successfully disconected from PostgreSQL server")
          console.log("Connections with server and database closed correctly, the process is completed with code 0")
          process.exit(0)
        })
    })
  } catch(error) {
    console.error("An error has occurred during the safe exit")
    console.error("Error detail", error)
    process.exit(1)
  }
}