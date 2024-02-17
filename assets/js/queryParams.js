function getQueryParam(queryParamName) {
  const queryString = window.location.search;
  if (!queryString) {
    displayErrorBlock();
    return;
  }
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(queryParamName);
}
