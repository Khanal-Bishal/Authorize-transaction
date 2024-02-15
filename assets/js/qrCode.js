function generateQRCode(paymentId) {
  const canvas = document.getElementById("canvas");

  QRCode.toCanvas(canvas, `pyypl://paymentOrderConfirm/${paymentId}`, {
    width: 200,
    margin: 2,
    color: {
      dark: "#34c5bf",
      light: "#ffffff",
    },
  });
}
