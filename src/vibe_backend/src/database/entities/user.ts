import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'User',
})
export class User extends BaseEntity {
  static findOneBy(arg0: { principal_id: string; }) {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  principal_id: string;

  @Column({ type: 'text' })
  communityName: string;

  @Column({ type: 'text' })
  userName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;
}