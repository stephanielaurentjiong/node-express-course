// Extend from error class
// NEW custom error class

const { create } = require("../models/Task")

class CustomAPIError extends Error {
    constructor(message, statusCode) { //constructor method is we invoke to create new instance of a class; here we pass 2 arguments
        super(message) //since we are extending, setted up a child class called 'super' method, which invokes a constructor a parent class; here we pass message value
        this.statusCode = statusCode
    }
}

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode) //return the new instance
}

module.exports = { createCustomError, CustomAPIError }
// Explanation
/*
Let's break down the provided code to understand what an instance is and identify which part of the code involves creating an instance.

### Definitions

1. **Class**: A blueprint for creating objects (instances) with predefined properties and methods.
2. **Instance**: An object created from a class. It has the properties and methods defined by the class.

### Code Explanation

1. **Class Definition**:

    class CustomAPIError extends Error {
        constructor(message, statusCode) {
            super(message); 
            this.statusCode = statusCode;
        }
    }
    ```

   - `CustomAPIError` is a class that extends the built-in `Error` class. It has a constructor that takes two arguments: `message` and `statusCode`.
   - `super(message)` calls the constructor of the parent `Error` class, passing the `message` value.
   - `this.statusCode = statusCode` sets a new property `statusCode` on instances of `CustomAPIError`.

2. **Factory Function**:

    ```javascript
    const createCustomError = (msg, statusCode) => {
        return new CustomAPIError(msg, statusCode);
    }
    ```

   - `createCustomError` is a function that takes two arguments: `msg` and `statusCode`.
   - `return new CustomAPIError(msg, statusCode)` creates a new instance of the `CustomAPIError` class and returns it.

### Identifying Instances

- **Class**: `CustomAPIError`
- **Instance**: An object created from the `CustomAPIError` class using the `new` keyword.

### Instance Creation

In the `createCustomError` function, the line `return new CustomAPIError(msg, statusCode)` creates a new instance of the `CustomAPIError` class. This instance is an object with the properties `message` and `statusCode`.

### Example Usage

Here's how you might use the `createCustomError` function to create an instance:

```javascript
const errorInstance = createCustomError('Not Found', 404);
console.log(errorInstance instanceof CustomAPIError); // true
console.log(errorInstance.message); // 'Not Found'
console.log(errorInstance.statusCode); // 404
```

In this example:
- `createCustomError('Not Found', 404)` creates a new instance of `CustomAPIError` with the `message` property set to 'Not Found' and the `statusCode` property set to 404.
- `errorInstance` is the instance created by the `createCustomError` function.

### Summary

- **Class**: `CustomAPIError` is a class that extends the `Error` class and adds a `statusCode` property.
- **Instance**: An object created from the `CustomAPIError` class, such as the one returned by the `createCustomError` function.
- **Instance Creation**: The line `return new CustomAPIError(msg, statusCode)` in the `createCustomError` function creates and returns a new instance of the `CustomAPIError` class.
*/