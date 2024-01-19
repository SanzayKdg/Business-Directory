/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../Api/Api";
import { BusinessType, AllBusinesses, SingleBusiness } from "../../@config/types";

// ----------- ACTION STARTS HERE --------------
// get all business lists
export const getAllBusiness = createAsyncThunk(
  "business/get-all-listings",
  async () => {
    try {
      const response = await api.get("/business/all");
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

// get single business
export const getSingleBusiness = createAsyncThunk(
  "business/get-single-listing",
  async (slug: string) => {
    try {
      const response = await api.get(`/business/${slug}`);
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------
export const businessSlice = createSlice({
  name: "business",
  initialState: {
    loading: false,
    businesses: <AllBusinesses[]>[],
    business: <SingleBusiness>{},
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Business Lists
      .addCase(getAllBusiness.pending, (state) => {
        state.loading = true;
        state.businesses = [];
      })
      .addCase(
        getAllBusiness.fulfilled,
        (state, action: PayloadAction<BusinessType>) => {
          state.loading = false;
          state.businesses = action.payload.businesses;
        }
      )
      .addCase(getAllBusiness.rejected, (state, action: any) => {
        state.loading = false;
        state.businesses = [];
        state.message = action.payload.message;
      })
      // Get Single Business
      .addCase(getSingleBusiness.pending, (state) => {
        state.loading = true;
        state.business = <SingleBusiness>{};
      })
      .addCase(getSingleBusiness.fulfilled, (state, action:PayloadAction<BusinessType>) => {
        state.loading = false;
        state.business = action.payload.business;
      })
      .addCase(getSingleBusiness.rejected, (state, action: any) => {
        state.loading = false;
        state.business = <SingleBusiness>{};
        state.message = action.payload.message;
      });
  },
});
export default businessSlice.reducer;
