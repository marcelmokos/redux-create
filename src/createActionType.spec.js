import createActionType from "./createActionType";

describe("createActionType", () => {
  it("simple type", () => {
    expect(createActionType("A")).toBe("A");
  });

  it("simple type using spread arguments", () => {
    expect(createActionType("A", "B")).toBe("A_B");
  });

  it("simple type using list of arguments", () => {
    expect(createActionType(["A", "B"])).toBe("A_B");
  });
});
