const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("booking_message");
const bookingSubmitBtn = document.getElementById("booking_btn");

const toastLiveExample = document.getElementById("liveToast");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get("id");

  const date = document.getElementById("booking_date").value;
  const adult = document.getElementById("adults").value;
  const children = document.getElementById("children").value;

  const splitDate = date.split(" > ");

  const checkIn = splitDate[0];
  const checkOut = splitDate[1];

  var checkInComponents = checkIn.split("-");
  var checkOutComponents = checkOut.split("-");

  var formattedCheckInDate =
    "20" +
    checkInComponents[2] +
    "-" +
    checkInComponents[0] +
    "-" +
    checkInComponents[1];

  var formattedCheckOutDate =
    "20" +
    checkOutComponents[2] +
    "-" +
    checkOutComponents[0] +
    "-" +
    checkOutComponents[1];

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Access Token not found");
    return;
  }

  bookingSubmitBtn.disabled = true;
  bookingSubmitBtn.innerHTML = "Loading...";

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  /**
   * TODO THIS SHOULD CHANGE WHEN PAYMENT IS IMPLEMENTED
   */
  try {
    const response = await fetch(
      "https://onabooking-api.onrender.com/api/v1/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId,
          checkIn: formattedCheckInDate,
          checkOut: formattedCheckOutDate,
          adultNo: Number(adult),
          childNo: Number(children),
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const bookingData = data?.data;

      toastBootstrap.show();
      document.getElementById("toastText").textContent = data.message;

      // alert("Booking made Successfully");
      if (!bookingData?.isPaid) {
        window.location.href = bookingData?.paymentUrl;
      } else {
        window.location.href = `payment_hotel.html?propertyId=${bookingData?.propertyId}&userId=${bookingData?.userId}`;
      }
    } else {
      const responseData = await response.json();

      if (responseData && responseData.message) {
        // alert(responseData.message);
        toastBootstrap.show();
        document.getElementById("toastText").textContent =
          responseData?.message;

        bookingSubmitBtn.disabled = false;
        bookingSubmitBtn.innerHTML = "CHECK NOW";
      } else {
        toastBootstrap.show();
        document.getElementById("toastText").textContent =
          "Booking failed. Please try again: " + error.message;
        // alert("Booking failed. Please try again: " + error.message);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    // alert("An error occurred. Please try again later");

    toastBootstrap.show();
    document.getElementById("toastText").textContent =
      "An error occurred. Please try again later";

    bookingSubmitBtn.disabled = false;
    bookingSubmitBtn.innerHTML = "Check Now";
  }
});
