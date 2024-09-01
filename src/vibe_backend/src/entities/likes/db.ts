import { Database, SqlValue } from "sql.js/dist/sql-asm.js";
import { sqlite } from "../../db";

export type Like = {
  id: number;
  userId: number;
  eventId: number;
};

type LikeCreate = Omit<Like, "id">;
type LikeUpdate = Pick<Like, "id"> & Partial<LikeCreate>;

export function getLikes(db: Database, limit: number, offset: number): Like[] {
  return sqlite<Like>`SELECT * FROM Like ORDER BY id LIMIT ${limit} OFFSET ${offset}`(
    db,
    convertLike
  );
}

export function getLike(db: Database, id: number): Like | null {
  const likes = sqlite<Like>`SELECT * FROM Like WHERE id = ${id}`(
    db,
    convertLike
  );

  return likes.length === 0 ? null : likes[0];
}

export function countLikes(db: Database): number {
  const results = sqlite<number>`SELECT COUNT(*) FROM Like`(
    db,
    (sqlValues: SqlValue[]) => sqlValues[0] as number
  );

  return results[0] ?? 0;
}

export async function createLike(
  db: Database,
  likeCreate: LikeCreate
): Promise<Like> {
  sqlite`INSERT INTO Like (userId, eventId) VALUES (${likeCreate.userId}, ${likeCreate.eventId})`(
    db
  );

  const id = sqlite<number>`SELECT last_insert_rowid()`(
    db,
    (sqlValues: SqlValue[]) => sqlValues[0] as number
  )[0];

  const like = getLike(db, id);

  if (like === null) {
    throw new Error(`createLike: could not find like with id ${id}`);
  }

  return like;
}

export async function updateLike(
  db: Database,
  likeUpdate: LikeUpdate
): Promise<Like> {
  sqlite`UPDATE Like SET userId = COALESCE(${likeUpdate.userId}, userId), eventId = COALESCE(${likeUpdate.eventId}, eventId) WHERE id = ${likeUpdate.id}`(
    db
  );

  const like = getLike(db, likeUpdate.id);

  if (like === null) {
    throw new Error(`updateLike: could not find like with id ${likeUpdate.id}`);
  }

  return like;
}

export async function deleteLike(db: Database, id: number): Promise<number> {
  sqlite`DELETE FROM Like WHERE id = ${id}`(db);

  const like = getLike(db, id);

  if (like !== null) {
    throw new Error(`deleteLike: could not delete like with id ${id}`);
  }

  return id;
}

export function convertLike(sqlValues: SqlValue[]): Like {
  return {
    id: sqlValues[0] as number,
    userId: sqlValues[1] as number,
    eventId: sqlValues[2] as number,
  };
}
