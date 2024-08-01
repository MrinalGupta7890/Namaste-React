import { sum } from "../sum"


// this is how we write test case
// test function basically takes two arguments 1.string, 2.a callback function
test("Sum function should calculate the sum of two numbers", () => {
    const result = sum(3, 4);

    // Assertion
    expect(result).toBe(7);
});