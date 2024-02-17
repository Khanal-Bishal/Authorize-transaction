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
