import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectIdColumn,
  ObjectId,
  OneToMany,
} from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  BUSINESS = "business",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity({ name: "user" })
export class User {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  full_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  user_role!: UserRole;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ default: false })
  is_verified?: boolean;

  @Column({ nullable: true, type: "date" })
  dob?: Date;

  @Column({ type: "enum", enum: Gender, default: Gender.OTHER })
  gender!: Gender;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  address?: string;

  @Column()
  otp!: string;

  @Column()
  otp_expiry!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  // relation

  // @Column(type => Business)
  //   businesses: Business[];
}
