import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity({
  name: 'Event',
})
export class Event extends BaseEntity {
  static findOneBy(arg0: { id: number; }) {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  startDate: string;

  @Column({ type: 'text', nullable: true })
  endDate: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;
}