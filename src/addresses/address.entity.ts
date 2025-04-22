import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  housenumber: string;

  @Column()
  street: string;

  @Column()
  postcode: string;

  @Column()
  citycode: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;
}
