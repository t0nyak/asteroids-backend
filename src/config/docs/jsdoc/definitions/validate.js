/**
 * Function to validate a given value
 * @typedef isValid
 * @function
 * @param {any} value value to validate
 * @returns {boolean} - True if value is valid
 */

/**
 * Error object for wrong validation
 * @typedef InvalidField
 * @object
 * @property {string} name
 * @property {string} error_msg
 */

/**
 * Response from validate function
 * @typedef ValidateResponse

 * @object
 * @property {InvalidField[]} errors
 * @property {Object.<string, string>} validFields
 */

/**
 * @typedef Constraint
 * @object
 * @property {any} value - The value to validate
 * @property {boolean} optional  - Is the value optional ?
 * @property {object} validator
 * @property {isValid} validator.isValid
 * @property {string} validator.errorMessage
 */
