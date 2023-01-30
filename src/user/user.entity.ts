import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  
  @Entity('user')
  export class UserEntity {
    @PrimaryGeneratedColumn()
    public id: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  
    @DeleteDateColumn({ type: 'timestamp' })
    deleted_at: Date;
  
    @Column({ unique: true })
    public email: string;
  
    @Column()
    public password: string;
  
    @Column({ nullable: true })
    public avatar: string;

    @Column('text',{ array: true })
    public phone_numbers: string[];

    @Column({ default: 0 })
    public credit: number;
  }