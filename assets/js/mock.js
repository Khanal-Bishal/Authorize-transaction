const currentTime = new Date();
const futureTime = new Date(currentTime.getTime() + 5 * 60000);
console.log(futureTime);

function mockAPICall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        paymentOrderId: "584b9587-6075-4938-8627-0a50af721f1a",
        organizationId: "27a0bb41-044d-4d3a-ba1e-438f016e3019",
        amount: 33,
        currency: "AED",
        createdAt: "2024-02-14T08:31:51.510Z",
        appRedirectUrl: "https://example.com",
        expiresAt: futureTime,
        status: "PENDING",
      };
      resolve(response);
    }, 1000); // Simulating a delay of 1 second (1000 milliseconds)
  });
}
