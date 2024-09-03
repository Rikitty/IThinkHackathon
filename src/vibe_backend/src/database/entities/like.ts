import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './user';
import { Event } from './event';

@Entity({
  name: 'Like',
})
@Unique(['user', 'event']) // Composite unique constraint
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @ManyToOne(() => Event, { nullable: false })
  event: Event;
}