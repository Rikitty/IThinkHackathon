import {
  init,
  postUpgrade,
  preUpgrade,
  StableBTreeMap,
  stableJson,
} from "azle";
import { Database } from "sql.js/dist/sql-asm.js";

import { initDb } from "./db";
import { initServer } from "./server";

export let db: Database;

let stableDbMap = StableBTreeMap<"DATABASE", Uint8Array>(0, stableJson, {
  toBytes: (data: Uint8Array) => data,
  fromBytes: (bytes: Uint8Array) => bytes,
});

export default initServer({
  init: async () => {
    db = await initDb();
  },
  preUpgrade: async () => {
    stableDbMap.insert("DATABASE", db.export());
  },
  postUpgrade: async () => {
    const database = stableDbMap.get("DATABASE");
    if (database === null) {
      throw new Error("Failed to get database");
    }
    db = await initDb(database.value);
  },
});
