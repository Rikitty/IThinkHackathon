export const migration = ` CREATE TABLE User (
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
    UNIQUE(userId, eventId)`;