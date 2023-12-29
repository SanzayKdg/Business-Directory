import { Business } from "../../models/business.js";
import { ObjectId } from "mongodb";
import { RegisterBusinessDTO } from "./dto/business.dto.js";
import { validate } from "class-validator";
import { Point } from "typeorm";

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

    // Single Image
    const logo = req.files;
    if (logo) {
      return logo.filename;
    }
    // Multiple Images
    const image = [];
    image.push(req.files);

    if (image) {
      return image.map((item) => item.filename);
    }
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
