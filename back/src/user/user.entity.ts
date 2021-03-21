import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 255, unique: true })
  password: string;

  @ApiProperty()
  @Column({ length: 255 })
  email: string;

  @Column({ length: 300, nullable: true })
  vk_token: string; 
}
