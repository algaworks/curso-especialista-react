/* eslint-disable jest/valid-expect */
/// <reference types="Cypress" />

describe("My first test", () => {
  it("compares value with true", () => {
    const value = true;
    expect(value).to.equal(true);
  });
});
