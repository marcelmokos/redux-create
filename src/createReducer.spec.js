import createReducer from "./createReducer";

const testReducerDispatchAction = ({
  reducer,
  action,
  expectState,
}) => {
  describe(`when action '${action.type}' has payload '${action.payload.toString()}'  `, () => {
    let state;

    beforeAll(() => {
      state = reducer(undefined, action);
    });

    it(`then state should be '${expectState.toString()}'`, () => {
      expect(state).toBe(expectState);
    });
  });
};

describe("create reducer", () => {
  describe("given simple reducer", () => {
    const reducer = createReducer(false, {
      A: (state, payload) => payload,
    });

    testReducerDispatchAction({
      reducer,
      action: {type: "A", payload: true},
      expectState: true,
    });

    testReducerDispatchAction({
      reducer,
      action: {type: "B", payload: true},
      expectState: false,
    });
  });

  describe("given nested reducer", () => {
    const reducer = createReducer(false, {
      A: {
        B: {
          C1: (state, payload) => payload,
          C2: {
            D: (state, payload) => payload,
          },
        },
      },
    });

    testReducerDispatchAction({
      reducer,
      action: {type: "A", payload: true},
      expectState: false,
    });

    testReducerDispatchAction({
      reducer,
      action: {type: "A_B", payload: true},
      expectState: false,
    });

    testReducerDispatchAction({
      reducer,
      action: {type: "A_B_C1", payload: true},
      expectState: true,
    });

    testReducerDispatchAction({
      reducer,
      action: {type: "A_B_C2", payload: true},
      expectState: false,
    });

    testReducerDispatchAction({
      reducer,
      action: {type: "A_B_C2_D", payload: true},
      expectState: true,
    });
  });

  describe("given incorrect reducer", () => {
    it("should throw error", () => {
      expect(() => createReducer(false, {
        A: false,
      })).toThrow();
    });
  });
});
