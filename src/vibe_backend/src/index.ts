<<<<<<< HEAD
// Commmented Canister

// import { Canister, query, text } from 'azle';

// export default Canister({
//     greet: query([text], text, (name) => {
//         return `Hello, ${name}!`;
//     })
// })



// import {
//   Server,
//   init,
//   postUpgrade,
//   preUpgrade,
//   setNodeServer,
// } from "azle";

// import "reflect-metadata";

// import { Database, DatabaseOptions } from "./database";
// import { ENTITIES } from "./database/entities";
// import { ConsoleLogger } from "./database/logger";
// import { DatabaseStorage } from "./database/storage";
// import { CreateServer } from "./server";


// const databaseOptions: DatabaseOptions = {
//   sincronize: false,
//   migrationsRun: true,
//   storage: new DatabaseStorage({
//     key: "DATABASE",
//     index: 0,
//   }),
//   entities: ENTITIES,
//   migrations: ["/migrations/*.{ts,js}"],
//   logger: new ConsoleLogger(false),
// };


// let db: Database | undefined;


// export default Server(
//     async () => {
//       db = new Database(databaseOptions);
//       await db.load();
//       return CreateServer();
//     },
//     {
//       init: init([], async () => {
//         try {
//           db = new Database(databaseOptions);
//           await db.init();
//           setNodeServer(CreateServer());
//         } catch (error) {
//           console.error('Error initializing database:', error);
//           throw error;
//         }
//       }),
//       preUpgrade: preUpgrade(() => {
//         try {
//           if (!db) {
//             throw new Error('Database not initialized');
//           }
  
//           db.save();
//         } catch (error) {
//           console.error('Error saving database:', error);
//         }
//       }),
//       postUpgrade: postUpgrade([], async () => {
//         try {
//           db = new Database(databaseOptions);
//           await db.load();
//           setNodeServer(CreateServer());
//         } catch (error) {
//           console.error('Error loading database:', error);
//         }
//       }),
//     },
//   );

import {
  init,
  postUpgrade,
  preUpgrade,
  Some,
} from "azle";

import "reflect-metadata";

import { Database, DatabaseOptions } from "./database";
import { ENTITIES } from "./database/entities";
import { ConsoleLogger } from "./database/logger";
import { DatabaseStorage } from "./database/storage";
import { CreateServer } from "./server";

// Database configuration
const databaseOptions: DatabaseOptions = {
  sincronize: false,
  migrationsRun: true,
  storage: new DatabaseStorage({
      key: "DATABASE",
      index: 0,
  }),
  entities: ENTITIES,
  migrations: ["/migrations/*.{ts,js}"],
  logger: new ConsoleLogger(false),
};

let db: Database | undefined;

// Initialize the server and database
const initializeServer = async (): Promise<void> => {
  try {
      db = new Database(databaseOptions);
      await db.init();
      await CreateServer(); 
  } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
  }
};

// Save database before upgrade
const saveDatabase = (): void => {
  try {
      if (!db) {
          throw new Error("Database not initialized");
      }
      db.save();
  } catch (error) {
      console.error("Error saving database:", error);
  }
};

// Reload database after upgrade
const reloadDatabase = async (): Promise<void> => {
  try {
      db = new Database(databaseOptions);
      await db.load();
      await CreateServer(); 
  } catch (error) {
      console.error("Error loading database:", error);
  }
};

// Define canister lifecycle methods
export default Some(async (): Promise<void> => {
  await initializeServer();

  init([], initializeServer); 
  preUpgrade(saveDatabase);
  postUpgrade([], reloadDatabase);
=======
import initSqlJs from 'sql.js/dist/sql-wasm.js';
import { Canister, query, text, StableBTreeMap, Some, postUpgrade, stableJson, preUpgrade } from 'azle';
import { initDb } from "./db";
import { initServer } from "./server";

export let db: { export: () => Uint8Array; };

let stableDbMap = StableBTreeMap<"DATABASE", Uint8Array>(0, stableJson, {
  toBytes: (data: Uint8Array) => data,
  fromBytes: (bytes: Uint8Array) => bytes,
});

export default initServer({
  init: async function () {
    const SQL = await initSqlJs();
    db = new SQL.Database();
    await initDb();
  },
  preUpgrade: async () => {
    stableDbMap.insert("DATABASE", db.export());
  },
  postUpgrade: async () => {
    const database = stableDbMap.get("DATABASE");
    if (database === null) {
      throw new Error("Failed to get database");
    }
    const SQL = await initSqlJs();
    db = new SQL.Database(database.value);
  },
>>>>>>> b983c34 (Rach azle debug)
});
