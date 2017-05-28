import asyncActionType from "./asyncActionType";
import {createAsyncActionCreator} from "./createAsyncActionCreator";

describe("create async action creator", () => {
  describe("call with simple text", () => {
    it("request action", () => {
      expect(
        createAsyncActionCreator("FETCH_PRODUCT").request({
          id: 1,
        }),
      ).toEqual({
        type: `FETCH_PRODUCT_${asyncActionType.REQUEST}`,
        payload: {id: 1},
      });
    });

    it("success action", () => {
      expect(
        createAsyncActionCreator("FETCH_PRODUCT").success({
          id: 1,
          name: "Product 1",
        }),
      ).toEqual({
        type: `FETCH_PRODUCT_${asyncActionType.SUCCESS}`,
        payload: {id: 1, name: "Product 1"},
      });
    });

    it("failure action", () => {
      expect(
        createAsyncActionCreator("FETCH_PRODUCT").failure({
          error: {
            message: "something went wrong",
          },
        }),
      ).toEqual({
        type: `FETCH_PRODUCT_${asyncActionType.FAILURE}`,
        payload: {
          error: {
            message: "something went wrong",
          },
        },
      });
    });
  });

  describe("call with multiple strings", () => {
    it("request action", () => {
      expect(
        createAsyncActionCreator("FETCH", "PRODUCT").request({
          id: 1,
        }),
      ).toEqual({
        type: `FETCH_PRODUCT_${asyncActionType.REQUEST}`,
        payload: {id: 1},
      });
    });

    it("success action", () => {
      expect(
        createAsyncActionCreator("FETCH", "PRODUCT").success({
          id: 1,
          name: "Product 1",
        }),
      ).toEqual({
        type: `FETCH_PRODUCT_${asyncActionType.SUCCESS}`,
        payload: {id: 1, name: "Product 1"},
      });
    });

    it("failure action", () => {
      expect(
        createAsyncActionCreator("FETCH", "PRODUCT").failure({
          error: {
            message: "something went wrong",
          },
        }),
      ).toEqual({
        type: `FETCH_PRODUCT_${asyncActionType.FAILURE}`,
        payload: {
          error: {
            message: "something went wrong",
          },
        },
      });
    });
  });
});
