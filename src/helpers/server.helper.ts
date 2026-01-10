import { Server } from "http";
import { disconnectFromPostgre } from "../db/db-connection";
import { readdirSync, statSync } from "fs";
import { join } from "path";

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

const getModuleNameAndRoutes = (path: string): { moduleName: string, router: any }[] => {
  try {
    if(statSync(path).isDirectory()) {
      const subDirs = readdirSync(path)
      if(subDirs.includes("presentation")) {
        return [{
          moduleName: path.split("/").at(-1)!,
          router: require(`${path}/presentation/routes.ts`)
        }]
      } else {
        return subDirs.flatMap(mod => getModuleNameAndRoutes(`${path}/${mod}`))
      }
    }

    return []
  } catch(error) {
    console.error(`Error al cargar el modulo ${path}`)
    console.error(error)
    return []
  }
}

export const setUpModuleRouters = () => {
  const baseModulesPath = join(__dirname, "../modules")
  const modulesDir = readdirSync(baseModulesPath)
  
  return modulesDir
    .filter(module => statSync(`${baseModulesPath}/${module}`).isDirectory())
    .flatMap(module => {
      const modulePath = `${baseModulesPath}/${module}`
      return [...(getModuleNameAndRoutes(modulePath))]
    })
    .filter(Boolean)
}