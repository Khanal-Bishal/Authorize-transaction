const $remainingTime = document.querySelector(".timer__time-remaining");

/**
 * @description return seconds remaining for expiry time
 *
 * @param {Number} expiresAt
 * @returns
 */
const getSecondsToExpire = async (expiresAt) => {
  const expiryTime = expiresAt.getTime();
  const currentTime = new Date().getTime();
  const secondsRemaining = (expiryTime - currentTime) / 1000;
  console.log(secondsRemaining);
  return secondsRemaining;
};

/**
 * @description runs the stop watch timer
 *
 * @param {Number} secondsRemaining
 */
const runTimer = (secondsRemaining) => {
  const intervalId = setInterval(() => {
    if (secondsRemaining <= 0) {
      clearInterval(intervalId);
      return null;
    } else {
      const minutes = Math.floor(secondsRemaining / 60);
      const seconds = Math.floor(secondsRemaining % 60);
      $remainingTime.innerText = `${minutes}:${seconds}`;
      --secondsRemaining;
    }
  }, 1000);
};

/**
 * @description passes data to display time and qr after data is fetched
 */
const main = async () => {
  try {
    //running timer
    const fetchedData = await mockAPICall();
    const secondsRemaining = await getSecondsToExpire(fetchedData.expiresAt);
    runTimer(secondsRemaining);

    //qr code
    const paymentOrderId = getQueryParam("paymentOrderId");
    if (!paymentOrderId) {
      //   renderError();
      return;
    }
    // const paymentOrderDetail = await fetchPaymentOrder(paymentOrderId);
    const paymentOrderDetail = await mockAPICall();
    console.log(paymentOrderDetail.paymentOrderId);
    if (!paymentOrderDetail) {
      //   renderError();
      return;
    }
    generateQRCode(paymentOrderDetail.paymentOrderId);
  } catch (err) {
    console.log("Error", err);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  main();
});
