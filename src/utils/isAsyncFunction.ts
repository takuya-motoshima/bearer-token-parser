/**
 * Returns whether it is an Async function
 * @param {Function} payload Function.
 * @return {boolean} `TRUE` for asynchronous functions, `FALSE` otherwise.
 */
export default (payload: Function): boolean => {
  return payload && payload.constructor && payload.constructor === Object.getPrototypeOf(async function(){}).constructor
}