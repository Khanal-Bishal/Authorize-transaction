function getQueryParam(param) {
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

function generateQRCode(paymentId) {
  const canvas = document.getElementById("canvas");

  QRCode.toCanvas(canvas, `pyypl://payment/${paymentId}`, {
    width: 200,
    margin: 2,
    color: {
      dark: "#34c5bf",
      light: "#ffffff",
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var paymentId = getQueryParam("paymentId");
  if (paymentId) {
    generateQRCode(paymentId);
  } else {
    console.log("No paymentId provided!");
  }
});