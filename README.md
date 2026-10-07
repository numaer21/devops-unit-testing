# Unit testing an arithmetic library

DevOps Engineering, exercise II: Unit testing.

This JavaScript project provides four arithmetic functions and a separate example program. Mocha runs the unit tests, and Chai's `expect` style checks their results.

## Files

| File | Purpose |
| --- | --- |
| `mylib.js` | Exports `add`, `subtract`, `multiply`, and `divide`. |
| `main.js` | Imports all four functions and prints example calculations. |
| `tests/mylib.test.js` | Contains ten unit tests and the `before` and `after` hooks. |
| `package.json` | Defines the commands, ES module format, and development dependencies. |
| `package-lock.json` | Records the dependency versions for reproducible installation. |
| `validation.txt` | Records the example program and test output from verification. |
| `.gitignore` | Excludes installed dependencies and generated files from Git. |

## Requirements and setup

Use Node.js 22.12 or newer. Node.js 24 LTS is a suitable choice. npm is included with Node.js.

Open a terminal inside this project folder and install the locked dependencies:

```bash
npm ci
```

On Windows, if PowerShell blocks `npm.ps1`, use `npm.cmd` instead of `npm`, or use a Command Prompt terminal in VS Code.

## Run the example program

```bash
npm start
```

Expected calculation output:

```text
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2
```

## Run the tests separately

```bash
npm test
```

This command runs Mocha on `tests/**/*.test.js`. The test file imports `mylib.js` directly and never imports or executes `main.js`.

Expected result: `10 passing`. Execution time may vary.

## What the tests check

| Function | Input | Expected result |
| --- | --- | --- |
| `add` | `2, 3` | `5` |
| `add` | `-2, 3` | `1` |
| `add` | `0.1, 0.2` | Within `0.000000000001` of `0.3` |
| `subtract` | `8, 3` | `5` |
| `subtract` | `3, 8` | `-5` |
| `multiply` | `4, 3` | `12` |
| `multiply` | `4, 0` | `0` |
| `divide` | `10, 2` | `5` |
| `divide` | `5, 2` | `2.5` |
| `divide` | `10, 0` | An `Error` containing `Division by zero is not allowed` |

The outer suite's `before` hook prints a message once before its tests run. Its `after` hook prints a message once after all those tests finish. No database or file cleanup is necessary because these arithmetic functions do not hold external resources.

## Error handling

`divide` checks `b === 0` before performing the calculation and throws a standard JavaScript `Error`. This also rejects numeric negative zero because `-0 === 0` is true. Other inputs are expected to be JavaScript numbers.

The error test passes a function to Chai:

```javascript
expect(() => divide(10, 0)).to.throw(
  Error,
  "Division by zero is not allowed"
);
```

The wrapper lets Chai call the function and inspect the thrown error. Passing `divide(10, 0)` directly would throw before Chai could perform the assertion.

## Limitations

- The functions assume numeric inputs. Strings, missing arguments, `NaN`, and infinity are not validated. For example, `add("2", 3)` produces the string `"23"`.
- JavaScript uses floating-point numbers, so some decimal calculations are approximate. `closeTo` allows a small tolerance in the decimal test; it does not change the library's arithmetic.
- Very large numbers may lose integer precision or overflow.
- Ten selected test cases do not cover every input. The main program's printed output was checked separately; it is not part of the unit test suite.

The `private: true` setting in `package.json` prevents accidental publication to the npm package registry. It does not control GitHub repository visibility.

## References

- Mocha: https://mochajs.org/
- Mocha hooks: https://mochajs.org/features/hooks/
- Chai assertion styles: https://www.chaijs.com/guide/styles/
- Chai expect API: https://www.chaijs.com/api/bdd/
- Node.js downloads: https://nodejs.org/en/download
