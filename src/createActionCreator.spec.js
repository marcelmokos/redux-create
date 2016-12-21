import createActionCreator from "./createActionCreator";


describe("create reducer", () => {
  it("simple action", () => {
    expect(createActionCreator("A")("test")).toEqual({type: "A", payload: "test"});
  });

  it("simple action containing object", () => {
    expect(createActionCreator("A")({test: "test"})).toEqual({type: "A", payload: {test: "test"} });
  });

  it("simple action joining two types", () => {
    expect(createActionCreator("A", "B")(true)).toEqual({type: "A_B", payload: true});
  });

  it("simple action joining two types", () => {
    expect(createActionCreator(["A", "B"])(true)).toEqual({type: "A_B", payload: true});
  });
});
