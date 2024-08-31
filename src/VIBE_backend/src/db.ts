import initSqlJs, { Database } from 'sql.js';
import * as fs from 'fs';
import * as path from 'path';

const DB_PATH = path.join(__dirname, 'dev.db'); // Path to your SQLite file

let db: Database;

export const initDb = async () => {
  const SQL = await initSqlJs();
  let data: Uint8Array;

  if (fs.existsSync(DB_PATH)) {
    data = fs.readFileSync(DB_PATH);
  } else {
    data = new Uint8Array(); // Empty database file for new DB
  }

  db = new SQL.Database(data);

  // Initialize the database schema if empty
  const schemaExists = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='User';").length > 0;
  if (!schemaExists) {
    db.exec(`
      CREATE TABLE User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        communityName TEXT,
        userName TEXT,
        email TEXT UNIQUE,
        password TEXT
      );
      CREATE TABLE Event (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        location TEXT,
        description TEXT,
        startDate TEXT,
        endDate TEXT,
        imageUrl TEXT,
        userId INTEGER,
        FOREIGN KEY (userId) REFERENCES User (id)
      );
      CREATE TABLE Like (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        eventId INTEGER,
        FOREIGN KEY (userId) REFERENCES User (id),
        FOREIGN KEY (eventId) REFERENCES Event (id),
        UNIQUE(userId, eventId)
      );
    `);
  }
};

export const getDb = () => db;
