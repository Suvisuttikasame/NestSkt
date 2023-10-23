import { Exclude } from 'class-transformer';
import { CommonEntity } from 'src/utils/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
}

@Entity('users')
export class User extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  @Exclude()
  password: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: UserRoles })
  role: string;
}
