function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const viewInvoice = document.getElementById("toInvoice");

window.onload = function () {
  function formatDate(dateString) {
    var date = new Date(dateString);

    // Array of month names
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract day, month, and year from the date object
    var day = date.getUTCDate();
    var monthIndex = date.getUTCMonth();
    var year = date.getUTCFullYear();

    // Create the formatted date string
    var formattedDate = day + " " + monthNames[monthIndex] + " " + year;
    return formattedDate;
  }

  const toastPayment = document.getElementById("paymentToast");

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastPayment);

  function showToast(message) {
    toastBootstrap.show();
    document.getElementById("paymentToastText").textContent = message;
  }

  // Fetch single property data based on ID
  function fetchBooking(propertyId, userId) {
    const token = localStorage.getItem("token");

    if (!token) {
      // alert("You are not logged in.");
      showToast("You are not logged in.");
      console.error("Token not found in localStorage");
      return;
    }

    fetch(
      `https://onabooking-api.onrender.com/api/v1/bookings?propertyId=${propertyId}&userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((bookingData) => {
        const data = bookingData?.data?.data[0];
        const checkIn = formatDate(data?.checkIn);
        const checkOut = formatDate(data?.checkOut);
        const adultNo = data?.adultNo;
        const childNo = data?.childNo;
        const name = `${data?.userId?.firstName} ${data?.userId?.lastName}`;
        const email = data?.userId?.email;
        const phone = data?.userId?.phoneNumber;
        const room = data?.propertyId?.name;

        document.getElementById("name").textContent = name;
        document.getElementById("email").textContent = email;
        document.getElementById("phone").textContent = phone;
        document.getElementById("room").textContent = room;
        document.getElementById("check_in").textContent = checkIn;
        document.getElementById("check_out").textContent = checkOut;
        document.getElementById(
          "booking_cost"
        ).textContent = `$${data?.propertyId?.price}`;
        document.getElementById("adult_no").textContent = adultNo;
        document.getElementById("child_no").textContent = childNo;

        // hideLoader();
      })
      .catch((error) => {
        // alert("There was a problem with the fetch operation:", error.message);
        showToast(
          "There was a problem with the fetch operation:" + error.message
        );
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  // Get property ID from URL query parameter
  const propertyId = getQueryParam("propertyId");
  const userId = getQueryParam("userId");
  const reference = getQueryParam("reference");

  function queryPayment() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in.");
      console.error("Token not found in localStorage");
      return;
    }

    fetch(
      `https://onabooking-api.onrender.com/api/v1/bookings/payment-verification/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        const res = response.json();

        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          // showToast(res?.message || "Payment made Successfully");
        }

        return response.json();
      })
      .catch((error) => {
        alert("There was a problem with the fetch operation:", error.message);
        // showToast(
        //   "There was a problem with the fetch operation:" + error.message
        // );
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  

  function navigateToInvoice() {
    viewInvoice.click();
  }

  // Fetch single property data
  fetchBooking(propertyId, userId);
  queryPayment();
};

viewInvoice.addEventListener("click", () => {
  const propertyId = getQueryParam("propertyId");
  const userId = getQueryParam("userId");

  window.location.href = `invoice.html?propertyId=${propertyId}&userId=${userId}`
})
