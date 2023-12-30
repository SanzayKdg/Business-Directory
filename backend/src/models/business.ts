import mongoose, { Schema } from "mongoose";
import {
  BusinessAccountStatus,
  BusinessAmenities,
  BusinessTimings,
} from "../@types/business.t.js";
import { Point } from "geojson";

interface BusinessDocument extends Document {
  opening_hours: BusinessTimings;
  amenity: BusinessAmenities;
  name: string;
  description: string;
  logo: any;
  image: any[];
  phone_number: string;
  telephone: string;
  vat_number: string;
  website: string;
  category: string;
  social_links: string[];
  account_status: BusinessAccountStatus;
  business_location: Point;
  address: string;
  is_featured: boolean;
  is_popular: boolean;
  is_online: boolean;
  is_verified: boolean;
  user: Object;
  createdAt: Date;
  updatedAt: Date;
}

const businessSchema = new mongoose.Schema<BusinessDocument>(
  {
    name: {
      type: String,
      required: [true, "Please enter your business name."],
    },
    description: {
      type: String,
      required: [true, "Please enter business description"],
    },
    logo: {
      type: String,
      required: [true, "Please add your business logo."],
    },
    image: [
      {
        type: String,
        required: [true, "Please add your business images"],
      },
    ],
    phone_number: {
      type: String,
      maxLength: [10, "Phone number must be 10 digits number."],
      minlength: [10, "Phone number must be 10 digits number."],
    },
    telephone: {
      type: String,
    },
    vat_number: {
      type: String,
      required: [true, "Please enter your business vat number."],
    },
    website: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Please select your business category."],
    },
    opening_hours: {
      type: Schema.Types.Mixed,
      default: {},
    },
    amenity: {
      type: Schema.Types.Mixed,
      default: {},
    },
    social_links: [
      {
        type: String,
        default: [],
      },
    ],
    account_status: {
      type: String,
      enum: Object.values(BusinessAccountStatus),
      default: BusinessAccountStatus.PENDING,
    },
    business_location: {
      type: {
        type: String,
        enum: ["Point"], // Specify the type as Point
      },
      coordinates: {
        type: [Number], // Array of [longitude, latitude]
      },
    },
    address: {
      type: String,
      required: [true, "Please enter your business address."],
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    is_popular: {
      type: Boolean,
      default: false,
    },
    is_online: {
      type: Boolean,
      default: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },

  {
    timestamps: true,
  }
);

export const Business = mongoose.model<BusinessDocument>(
  "Business",
  businessSchema
);
