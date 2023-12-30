import { Business } from "../../models/business.js";
import { ObjectId } from "mongodb";
import { RegisterBusinessDTO } from "./dto/business.dto.js";
import { validate } from "class-validator";
import { Point } from "typeorm";
import { BusinessAccountStatus } from "../../@types/business.t.js";

// ---------------------- REGISTER BUSINESS ---------------------------------

export const registerBusiness = async (req: any, res: any, next: any) => {
  try {
    const {
      name,
      description,
      phone_number,
      telephone,
      vat_number,
      website,
      category,
      opening_hours,
      amenity,
      social_links,
      address,
      latitude,
      longitude,
    } = req.body;

    // Handle Single Image
    const logo = req.files["logo"][0].path;
    let image: any = [];

    // Handle Multiple Image
    const images = req.files["image"];
    images.forEach((item: any) => image.push(item.path));

    const payload = new RegisterBusinessDTO();
    payload.name = name;
    payload.description = description;
    payload.logo = logo;
    payload.image = image;
    payload.phone_number = phone_number;
    payload.telephone = telephone;
    payload.vat_number = vat_number;
    payload.website = website;
    payload.category = category;
    payload.opening_hours = opening_hours;
    payload.amenity = amenity;
    payload.social_links = social_links;
    payload.address = address;
    payload.latitude = latitude;
    payload.longitude = longitude;

    // Validation
    const errors = await validate(payload);

    if (errors.length > 0) {
      const validation_error = errors.reduce((acc: any, error) => {
        // Destructuring error object and getting property and constraints
        // For e.g. property : password, constraint: minLength['password must be longer or than equal to 8 characters ]
        const { property, constraints } = error;
        acc[property] = Object.values(constraints || {});
        return acc;
      }, {});
      return next(
        res.status(400).json({ success: false, message: validation_error })
      );
    }

    // check if email is registered with business

    const business = await Business.findOne({
      user: new ObjectId(req.user._id),
    });

    if (business) {
      return next(
        res.status(401).json({
          success: false,
          message: "Only one email can be used for one business.",
        })
      );
    }

    // save location
    const location: Point = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    // save business

    const new_business = await Business.create({
      name,
      description,
      logo,
      image,
      phone_number,
      telephone,
      vat_number,
      website,
      category,
      opening_hours,
      amenity,
      social_links,
      address,
      business_location: location,
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      new_business,
      message: "Successfully Registered Business.",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET ALL BUSINESS (PUBLIC) ---------------------------------

export const getAllBusiness = async (req: any, res: any, next: any) => {
  try {
    const business = await Business.find({
      is_verified: true,
      account_status: BusinessAccountStatus.APPROVED,
    });
    const result = business.map((item) => {
      return {
        image: item.image[0],
        logo: item.logo,
        name: item.name,
        // ratings: item.ratings,
        address: item.address,
        contact: item.phone_number,
        id: item._id,
        category: item.category,
        is_online: item.is_online,
        is_popular: item.is_popular,
        is_featured: item.is_featured,
      };
    });
    return res.status(200).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET SINGLE BUSINESS (PUBLIC) ---------------------------------

export const getSingleBusiness = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const business: any = await Business.findOne({
      id,
      is_verified: true,
      account_status: BusinessAccountStatus.APPROVED,
    });

    return res.status(200).json({ success: true, business });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

