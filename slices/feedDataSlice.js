import { createSlice } from "@reduxjs/toolkit";

const feedDataSlice = createSlice({
  name: "feedData",
  initialState: {
    loading: false,
    feedData: [],
  },
  reducers: {
    getfeedData(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getSuccess(state, action) {
      return {
        ...state,
        loading: false,
        feedData: action.payload,
      };
    },
    postfeeddata(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    postfeeddataSuccess(state, action) {
      return {
        loading: false,
        requests: action.payload.requests,
      };
    },
    postfeeddataFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = feedDataSlice;

export const {
  getfeedData,
  getSuccess,
  postfeeddata,
  postfeeddataSuccess,
  postfeeddataFail,
} = actions;

export default reducer;
