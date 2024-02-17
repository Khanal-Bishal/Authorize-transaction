const $merchantName = document.querySelector(".merchantName");
const $transactionId = document.querySelector(".transactionId");
const $dateOfTransaction = document.querySelector(".dateOfTransaction");
const $transactionAmt = document.querySelector(".transactionAmt");
const $mainSection = document.querySelector("main");
const $headerSection = document.querySelector(".header");
const $currency = document.querySelector(".currency");
const $amount = document.querySelector(".amount");
const $errorContainer = document.querySelector(".error__container");
const $paymentContainer = document.querySelector(".payment__container");
const $spinner = document.querySelector(".spinner");
const $authorizeTransaction = document.querySelector(".header__wrapper");

/**
 * @description renders the error into the DOM
 */
const renderError = () => {
  hideSpinner();
  displayErrorBlock();
};

/**
 * @description displays the error message along with error image
 */
const displayErrorBlock = () => {
  console.log("From  display error block ");
  $paymentContainer.style.display = "none";
  $authorizeTransaction.style.display = "none";
  $errorContainer.style.display = "block";
};

/**
 * @description displays the html content and hides the spinner
 */
const hideSpinner = () => {
  $spinner.style.display = "none";
  $mainSection.style.display = "block";
  $headerSection.style.display = "block";
};

/**
 * @description writes date in element with class name dateOfTransaction
 *
 * @param {Date} transactionDate
 */
const displayDate = (transactionDate) => {
  const date = new Date(transactionDate);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = date.getDay();
  day = day < 10 ? "0" + day : day;

  $dateOfTransaction.innerText = `${day}.${month}.${year}`;
};

/**
 * @description writes transaction amount in class with name transactionAmt
 *
 * @param {String} currency
 * @param {Number} amount
 */
const displayTransactionAmount = (currency, amount) => {
  if (!currency || !amount) {
    $transactionAmt.innerText = `XX XXX.XX`;
    return;
  }
  $transactionAmt.innerText = `${currency} ${amount?.toFixed(2)}`;
};

/**
 *
 * @param {HTMLElement} elementId
 * @param {String} text
 * @returns
 */
const displayText = (elementId, text) => {
  if (!text) {
    elementId.innerText = "---";
    return;
  }
  elementId.innerText = text;
};

/**
 * @description inserts transaction details into the card component
 */
const displayTransactionData = (transactionData) => {
  displayText($merchantName, transactionData?.organizationId);
  displayText($transactionId, transactionData?.paymentOrderId);
  displayDate(transactionData?.createdAt);
  displayTransactionAmount(transactionData?.currency, transactionData?.amount);
};

/**
 * @description passes data to display transaction after data is fetched
 */
const main = async () => {
  const paymentOrderId = getQueryParam("paymentOrderId");
  if (!paymentOrderId) {
    renderError();
    return;
  }
  const paymentOrderDetail = await fetchPaymentOrder(paymentOrderId);
  if (!paymentOrderDetail) {
    renderError();
    return;
  }
  displayTransactionData(paymentOrderDetail);
  generateQRCode(paymentOrderDetail.paymentOrderId);
};

document.addEventListener("DOMContentLoaded", function () {
  main();
});
