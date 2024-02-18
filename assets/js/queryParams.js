/**
 * @description parses url and returns payment order id
 *
 * @param {String} queryParamName
 *
 * @returns  {String}
 */
function getQueryParam(queryParamName) {
  const queryString = window.location.search;
  if (!queryString) {
    displayErrorBlock();
    return;
  }
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(queryParamName);
}
