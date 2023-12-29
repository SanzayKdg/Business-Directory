import { IsBooleanString } from "class-validator";

export enum BusinessAccountStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  BANNED = "banned",
}

export class BusinessAmenities {
  @IsBooleanString()
  wifi!: boolean;

  @IsBooleanString()
  parking!: boolean;

  @IsBooleanString()
  accept_card!: boolean;

  @IsBooleanString()
  delivery!: boolean;
}
 
export class BusinessTimings {
  sunday?: [
    {
      open: string;
      close: string;
    }
  ];
  monday?: [
    {
      open: string;
      close: string;
    }
  ];
  tuesday?: [
    {
      open: string;
      close: string;
    }
  ];
  wednesday?: [
    {
      open: string;
      close: string;
    }
  ];
  thursday?: [
    {
      open: string;
      close: string;
    }
  ];
  friday?: [
    {
      open: string;
      close: string;
    }
  ];
  saturday?: [
    {
      open: string;
      close: string;
    }
  ];
}


