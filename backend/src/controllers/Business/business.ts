import { Business } from "../../models/Business/business.js";
import { ObjectId } from "mongodb";
import { RegisterBusinessDTO, UpdateBusinessDTO } from "./dto/business.dto.js";
import { validate } from "class-validator";
import { Point } from "typeorm";
import { BusinessAccountStatus } from "../../@types/business.t.js";
import * as fs from "fs";
import { BASE_URL } from "../../@config/constants.config.js";
import { slugify } from "../../@helpers/slugify.js";

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
      slug: slugify(name),
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

    res.status(201).json({
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

    const businesses = business.map((item) => {
      return {
        image: BASE_URL.backend + item.image[0].replace(/\\/g, "/"),
        logo: BASE_URL.backend + item.logo.replace(/\\/g, "/"),
        name: item.name,
        slug: item.slug,
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
    return res.status(200).json({ success: true, businesses });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET SINGLE BUSINESS (PUBLIC) ---------------------------------

export const getSingleBusiness = async (req: any, res: any, next: any) => {
  try {
    let { slug } = req.params;
    const business: any = await Business.findOne({
      slug,
      is_verified: true,
      account_status: BusinessAccountStatus.APPROVED,
    });
    const result = {
      business_location: business.business_location,
      name: business.name,
      description: business.description,
      logo: business.logo,
      image: business.image,
      phone_number: business.phone_number,
      telephone: business.telephone,
      website: business.website,
      category: business.category,
      social_links: business.social_links,
      address: business.address,
      is_featured: business.is_featured,
      is_popular: business.is_popular,
      is_online: business.is_online,
      is_verified: business.is_verified,
      slug: business.slug,
    };
    return res.status(200).json({ success: true, business: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- UPDATE BUSINESS ---------------------------------

export const updateBusiness = async (req: any, res: any, next: any) => {
  try {
    const {
      name,
      description,
      phone_number,
      telephone,
      website,
      opening_hours,
      amenity,
      social_links,
      address,
      latitude,
      longitude,
    } = req.body;

    // Handle Single Image
    let logo: string = "";
    let image: any = [];

    const payload = new UpdateBusinessDTO();
    payload.name = name;
    payload.description = description;
    payload.logo = logo;
    payload.image = image;
    payload.phone_number = phone_number;
    payload.telephone = telephone;
    payload.website = website;
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
      _id: req.params.id,
      user: new ObjectId(req.user._id),
    });

    if (!business) {
      return next(
        res.status(400).json({
          success: false,
          message: "Business Listing Not Found.",
        })
      );
    }

    if (payload.logo) {
      payload.logo = null;
    }
    if (payload.image) {
      payload.image = [];
    }
    if (req.files["logo"]) {
      logo = req.files["logo"][0].path;
      payload.logo = logo;

      // Delete old logo (assuming business.logo is an array)
      if (business.logo && business.logo.length > 0) {
        const path = business.logo;
        fs.unlinkSync(path);
      }
    }

    if (req.files["image"]) {
      const images = req.files["image"];
      images.forEach((item: any) => image.push(item.path));
      payload.image = image;

      // Delete old images
      if (business.image && business.image.length > 0) {
        business.image.forEach((path) => fs.unlinkSync(path));
      }
    }
    // save location
    const location: Point = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    // save business
    const updated_business = {
      name: payload.name,
      slug: slugify(name),
      description: payload.description,
      logo: payload.logo,
      image: payload.image,
      phone_number: payload.phone_number,
      telephone: payload.telephone,
      website: payload.website,
      opening_hours: payload.opening_hours,
      amenity: payload.amenity,
      social_links: payload.social_links,
      address: payload.address,
      business_location: location,
    };

    await Business.findByIdAndUpdate(business._id, updated_business, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Successfully Update Business Details.",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- DELETE BUSINESS ---------------------------------

export const deleteBusiness = async (req: any, res: any, next: any) => {
  try {
    const business = await Business.findOne({
      _id: req.params.id,
      user: new ObjectId(req.user._id),
    });

    if (!business) {
      return next(
        res.status(400).json({ success: false, message: "Business not found." })
      );
    }

    // Delete images & logo
    if (business.logo) {
      const path = business.logo;
      fs.unlinkSync(path);
    }

    if (business.image) {
      business.image.forEach((path) => {
        fs.unlinkSync(path);
      });
    }

    await Business.findByIdAndDelete({ _id: business._id });

    res
      .status(200)
      .json({ success: true, message: "Business Deleted Successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
