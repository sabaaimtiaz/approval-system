import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RequestSubtype, RequestType } from './RequestEnums';

@Entity()
export class RequestForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  request_title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;


  @Column({
    type: 'enum',
    enum: RequestType,
  })
  request_type: RequestType;

  @Column({
    type: 'enum',
    enum: RequestSubtype,
  })
  request_subtype: RequestSubtype;

  @Column({ default: 'Pending' })
  superadmin_approval: string;

  @Column({ default: 'Pending' })
  hr_approval: string;

  @Column({ default: 'Pending' })
  it_approval: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  updated_by: string;

  @UpdateDateColumn()
  updatedAt: Date;

}
