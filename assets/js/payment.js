/**
 * @description fetches transaction details for the endpoint
 */
const fetchPaymentOrder = async (paymentOrderId) => {
  try {
    const response = await fetch(
      `https://hot-beans-rest.loca.lt/pay/payment/order/${paymentOrderId}`,
      {
        method: "GET", // The method is optional here because GET is the default value
        headers: {
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "true",
        },
      }
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    hideSpinner();
    return data;
  } catch (err) {
    renderError();
  }
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

  dateOfTransaction.innerText = `${day}.${month}.${year}`;
};

/**
 * @description writes transaction amount in class with name transactionAmt
 *
 * @param {String} currency
 * @param {Number} amount
 */
const displayTransactionAmount = (currency, amount) => {
  if (!currency || !amount) {
    transactionAmt.innerText = `XX XXX.XX`;
    return;
  }
  transactionAmt.innerText = `${currency} ${amount?.toFixed(2)}`;
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
  displayText(merchantName, transactionData?.organizationId);
  displayText(transactionId, transactionData?.paymentOrderId);
  displayDate(transactionData?.createdAt);
  displayTransactionAmount(transactionData?.currency, transactionData?.amount);
};

function getQueryParam(queryParamName) {
  const queryString = window.location.search;
  if (!queryString) {
    displayErrorBlock();
    return;
  }
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(queryParamName);
}

document.addEventListener("DOMContentLoaded", function () {
  main();
});
