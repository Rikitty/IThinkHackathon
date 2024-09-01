import { Database, SqlValue } from "sql.js/dist/sql-asm.js";
import { sqlite } from "../../db";

export type Event = {
  id: number;
  title: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  userId: number;
};

type EventCreate = Omit<Event, "id">;
type EventUpdate = Pick<Event, "id"> & Partial<EventCreate>;

export function getEvents(db: Database, limit: number, offset: number): Event[] {
  return sqlite<Event>`SELECT * FROM Event ORDER BY id LIMIT ${limit} OFFSET ${offset}`(
    db,
    convertEvent
  );
}

export function getEvent(db: Database, id: number): Event | null {
  const events = sqlite<Event>`SELECT * FROM Event WHERE id = ${id}`(
    db,
    convertEvent
  );

  return events.length === 0 ? null : events[0];
}

export function countEvents(db: Database): number {
  const results = sqlite<number>`SELECT COUNT(*) FROM Event`(
    db,
    (sqlValues: SqlValue[]) => sqlValues[0] as number
  );

  return results[0] ?? 0;
}

export async function createEvent(
  db: Database,
  eventCreate: EventCreate
): Promise<Event> {
  sqlite`INSERT INTO Event (title, location, description, startDate, endDate, imageUrl, userId) VALUES (${eventCreate.title}, ${eventCreate.location}, ${eventCreate.description}, ${eventCreate.startDate}, ${eventCreate.endDate}, ${eventCreate.imageUrl}, ${eventCreate.userId})`(
    db
  );

  const id = sqlite<number>`SELECT last_insert_rowid()`(
    db,
    (sqlValues: SqlValue[]) => sqlValues[0] as number
  )[0];

  const event = getEvent(db, id);

  if (event === null) {
    throw new Error(`createEvent: could not find event with id ${id}`);
  }

  return event;
}

export async function updateEvent(
  db: Database,
  eventUpdate: EventUpdate
): Promise<Event> {
  sqlite`UPDATE Event SET title = COALESCE(${eventUpdate.title}, title), location = COALESCE(${eventUpdate.location}, location), description = COALESCE(${eventUpdate.description}, description), startDate = COALESCE(${eventUpdate.startDate}, startDate), endDate = COALESCE(${eventUpdate.endDate}, endDate), imageUrl = COALESCE(${eventUpdate.imageUrl}, imageUrl), userId = COALESCE(${eventUpdate.userId}, userId) WHERE id = ${eventUpdate.id}`(
    db
  );

  const event = getEvent(db, eventUpdate.id);

  if (event === null) {
    throw new Error(`updateEvent: could not find event with id ${eventUpdate.id}`);
  }

  return event;
}

export async function deleteEvent(db: Database, id: number): Promise<number> {
  sqlite`DELETE FROM Event WHERE id = ${id}`(db);

  const event = getEvent(db, id);

  if (event !== null) {
    throw new Error(`deleteEvent: could not delete event with id ${id}`);
  }

  return id;
}

export function convertEvent(sqlValues: SqlValue[]): Event {
  return {
    id: sqlValues[0] as number,
    title: sqlValues[1] as string,
    location: sqlValues[2] as string,
    description: sqlValues[3] as string,
    startDate: sqlValues[4] as string,
    endDate: sqlValues[5] as string,
    imageUrl: sqlValues[6] as string,
    userId: sqlValues[7] as number,
  };
}
