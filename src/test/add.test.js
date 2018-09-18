//const add = (a, b) => a + b + 1; // failed as the expected result was 7 but the result is 8
const add = (a, b) => a + b;

const generateGreeting = (name = "Anonymous") => `Hello ${name}!`;

test("should add two numbers", () => {
  const result = add(3, 4);
  expect(result).toBe(7);

  /*   if (result !== 7) {
    throw new Error(`You added 4 and 3. The result was ${result}. Expect 7`);
  } // test failed as the result was 8, expecting 7 */
});

test("Show up the name", () => {
  const foo = generateGreeting("Mike");
  expect(foo).toBe("Hello Mike!");
});

test("should show up the name", () => {
  const result = generateGreeting();
  expect(result).toBe("Hello Anonymous!");
});
