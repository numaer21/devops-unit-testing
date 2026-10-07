import { expect } from "chai";
import { add, subtract, multiply, divide } from "../mylib.js";

describe("mylib arithmetic functions", function () {
  before(function () {
    console.log("Starting mylib tests.");
  });

  after(function () {
    console.log("Finished mylib tests.");
  });

  describe("add", function () {
    it("adds two positive numbers", function () {
      expect(add(2, 3)).to.equal(5);
    });

    it("adds a negative number", function () {
      expect(add(-2, 3)).to.equal(1);
    });

    it("adds decimal numbers within a small tolerance", function () {
      expect(add(0.1, 0.2)).to.be.closeTo(0.3, 0.000000000001);
    });
  });

  describe("subtract", function () {
    it("subtracts two numbers", function () {
      expect(subtract(8, 3)).to.equal(5);
    });

    it("returns a negative result when appropriate", function () {
      expect(subtract(3, 8)).to.equal(-5);
    });
  });

  describe("multiply", function () {
    it("multiplies two numbers", function () {
      expect(multiply(4, 3)).to.equal(12);
    });

    it("returns zero when multiplying by zero", function () {
      expect(multiply(4, 0)).to.equal(0);
    });
  });

  describe("divide", function () {
    it("divides two numbers", function () {
      expect(divide(10, 2)).to.equal(5);
    });

    it("returns a fractional result", function () {
      expect(divide(5, 2)).to.equal(2.5);
    });

    it("throws an error when the divisor is zero", function () {
      expect(() => divide(10, 0)).to.throw(
        Error,
        "Division by zero is not allowed"
      );
    });
  });
});
