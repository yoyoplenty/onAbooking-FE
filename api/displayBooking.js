window.onload = function () {
  function formatTime(timestamp) {
    const date = new Date(timestamp);

    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate().toString().padStart(2, "0");
    const dayOfWeek = date.toLocaleString("default", { weekday: "short" }).toUpperCase();

    const formattedTime = month + " " + day + " " + dayOfWeek;

    return formattedTime;
  }

  function formatDate(dateString) {
    var date = new Date(dateString);

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

    var day = date.getUTCDate();
    var monthIndex = date.getUTCMonth();
    var year = date.getUTCFullYear();

    var formattedDate = day + " " + monthNames[monthIndex] + " " + year;
    return formattedDate;
  }

  function showLoader() {
    document.getElementById("preloader").style.display = "block";
  }

  function hideLoader() {
    document.getElementById("preloader").style.display = "none";
  }

  function displayBookings() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      alert("You are not logged in.");
      console.error("Token not found in localStorage");
      return;
    }

    // showLoader();
    document.getElementById("loader").style.display = "block";

    fetch(`https://onabooking-api.onrender.com/api/v1/bookings?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((bookingData) => {
        renderBookings(bookingData);

        document.getElementById("loader").style.display = "none";
        // hideLoader();
      })
      .catch((error) => {
        alert("There was a problem with the fetch operation:", error.message);
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function renderBookings(data) {
    const bookingContainer = document.getElementById("section-1");

    data?.data?.data.forEach((booking) => {
      const bookingElement = document.createElement("div");
      bookingElement.className = "strip_booking";
      const getFormattedTime = formatTime(booking?.propertyId?.createdAt);

      bookingElement.innerHTML = `
        <div class="row">
          <div class="col-lg-2 col-md-2">
            <div class="date">
              <span class="month">${getFormattedTime.split(" ")[0]}</span>
              <span class="day"><strong>${getFormattedTime.split(" ")[1]}</strong>${
        getFormattedTime.split(" ")[2]
      }</span>
            </div>
          </div>
          <div class="col-lg-6 col-md-5">
            <h3 class="tours_booking">${booking?.propertyId?.name}<span>${booking?.adultNo ?? 0} Adult / ${
        booking?.childNo ? booking?.childNo : ""
      } Child</span></h3>
          </div>
          <div class="col-lg-2 col-md-3">
            <ul class="info_booking">
              <li><strong>Booking id</strong> ${booking?._id}</li>
              <li><strong>Booked on</strong> ${formatDate(booking?.createdAt)}</li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-2">
            <div class="booking_buttons">
              <a href="#0" class="btn_2">Edit</a>
              <a href="#0" class="btn_3">Cancel</a>
            </div>
          </div>
        </div>
      `;
      bookingContainer.appendChild(bookingElement);
    });
  }

  displayBookings();
};
