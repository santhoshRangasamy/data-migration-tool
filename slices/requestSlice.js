import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    loading: false,
  },
  reducers: {
    getRequest(state, action) {
      return {
        loading: true,
      };
    },
    getSuccess(state, action) {
      return {
        loading: false,
        requests: action.payload.requests,
      };
    },
    getFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    postRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    postSuccess(state, action) {
      return {
        loading: false,
        requests: action.payload,
      };
    },
    postFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    updateRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateSuccess(state, action) {
      return {
        loading: false,
        requests: action.payload.requests,
      };
    },
    updateFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = requestSlice;

export const {
  getRequest,
  getSuccess,
  getFail,
  postRequest,
  postSuccess,
  postFail,
  updateRequest,
  updateSuccess,
  updateFail,
} = actions;

export default reducer;
