const merchantName = document.querySelector(".merchantName");
const transactionId = document.querySelector(".transactionId");
const dateOfTransaction = document.querySelector(".dateOfTransaction");
const transactionAmt = document.querySelector(".transactionAmt");
const mainSection = document.querySelector("main");
const headerSection = document.querySelector(".header");
const currency = document.querySelector(".currency");
const amount = document.querySelector(".amount");
const errorContainer = document.querySelector(".error__container");
const paymentContainer = document.querySelector(".payment__container");
const spinner = document.querySelector(".spinner");
const authorizeTransaction = document.querySelector(".header__wrapper");

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
  paymentContainer.style.display = "none";
  authorizeTransaction.style.display = "none";
  errorContainer.style.display = "block";
};

/**
 * @description displays the html content and hides the spinner
 */
const hideSpinner = () => {
  spinner.style.display = "none";
  mainSection.style.display = "block";
  headerSection.style.display = "block";
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
