import { Database, SqlValue } from "sql.js/dist/sql-asm.js";
import bcrypt from "bcrypt"; // For password hashing and comparison
import { sqlite } from "../../db";

export type User = {
  id: number;
  communityName: string;
  userName: string;
  email: string;
  password: string;
};

type UserCreate = Omit<User, "id">;
type UserUpdate = Pick<User, "id"> & Partial<UserCreate>;

export function getUsers(db: Database, limit: number, offset: number): User[] {
  return sqlite<User>`SELECT * FROM User ORDER BY id LIMIT ${limit} OFFSET ${offset}`(
    db,
    convertUser
  );
}

export function getUser(db: Database, id: number): User | null {
  const users = sqlite<User>`SELECT * FROM User WHERE id = ${id}`(
    db,
    convertUser
  );

  return users.length === 0 ? null : users[0];
}

export function countUsers(db: Database): number {
  const results = sqlite<number>`SELECT COUNT(*) FROM User`(
    db,
    (sqlValues: SqlValue[]) => sqlValues[0] as number
  );

  return results[0] ?? 0;
}

export async function createUser(
  db: Database,
  userCreate: UserCreate
): Promise<User> {
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(userCreate.password, 10);
  sqlite`INSERT INTO User (communityName, userName, email, password) VALUES (${userCreate.communityName}, ${userCreate.userName}, ${userCreate.email}, ${hashedPassword})`(
    db
  );

  const id = sqlite<number>`SELECT last_insert_rowid()`(
    db,
    (sqlValues: SqlValue[]) => sqlValues[0] as number
  )[0];

  const user = getUser(db, id);

  if (user === null) {
    throw new Error(`createUser: could not find user with id ${id}`);
  }

  return user;
}

export async function updateUser(
  db: Database,
  userUpdate: UserUpdate
): Promise<User> {
  sqlite`UPDATE User SET communityName = COALESCE(${userUpdate.communityName}, communityName), userName = COALESCE(${userUpdate.userName}, userName), email = COALESCE(${userUpdate.email}, email), password = COALESCE(${userUpdate.password}, password) WHERE id = ${userUpdate.id}`(
    db
  );

  const user = getUser(db, userUpdate.id);

  if (user === null) {
    throw new Error(`updateUser: could not find user with id ${userUpdate.id}`);
  }

  return user;
}

export async function deleteUser(db: Database, id: number): Promise<number> {
  sqlite`DELETE FROM User WHERE id = ${id}`(db);

  const user = getUser(db, id);

  if (user !== null) {
    throw new Error(`deleteUser: could not delete user with id ${id}`);
  }

  return id;
}

export async function loginUser(
  db: Database,
  email: string,
  password: string
): Promise<User | null> {
  const users = sqlite<User>`SELECT * FROM User WHERE email = ${email}`(
    db,
    convertUser
  );

  if (users.length === 0) {
    return null; // User not found
  }

  const user = users[0];
  const passwordMatches = await bcrypt.compare(password, user.password);

  if (passwordMatches) {
    return user;
  } else {
    return null; // Password incorrect
  }
}

export function convertUser(sqlValues: SqlValue[]): User {
  return {
    id: sqlValues[0] as number,
    communityName: sqlValues[1] as string,
    userName: sqlValues[2] as string,
    email: sqlValues[3] as string,
    password: sqlValues[4] as string,
  };
}
