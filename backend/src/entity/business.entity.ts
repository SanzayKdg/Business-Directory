import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm";

import { Point } from "geojson";
import { BusinessAmenities, BusinessTimings } from "src/@types/business.t.js";

export interface SocialLink {
  name: string;
  url: string;
}

export enum OrganizerAccountStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  BANNED = "BANNED",
}

@Entity("business")
export class Business {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text" })
  logo!: string;

  @Column({ type: "text", array: true, default: [] })
  images!: string[];

  @Column({ type: "text", nullable: true })
  phone_number?: string;

  @Column()
  vat_number!: string;

  @Column({ nullable: true })
  website?: string;

  @Column()
  category!: string;

  @Column({ type: "jsonb", default: {} })
  opening_hours!: BusinessTimings;

  @Column({ type: "jsonb", default: {} })
  amenitiy!: BusinessAmenities;

  @Column({
    type: "jsonb",
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  social_links!: SocialLink[];

  @Column({
    type: "enum",
    default: OrganizerAccountStatus.PENDING,
    enum: OrganizerAccountStatus,
  })
  account_status!: OrganizerAccountStatus;

  @Column("geometry", { spatialFeatureType: "Point", srid: 4326 })
  location!: Point;

  @Column({ type: "varchar", length: 255 })
  address!: string;

  @Column({ type: "boolean", default: false })
  is_featured!: boolean;

  @Column({ type: "boolean", default: false })
  is_popular!: boolean;

  @Column({ type: "boolean", default: false })
  is_online!: boolean;

  @Column({ type: "boolean", default: false })
  is_verified!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
