window.onload = function () {
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  function showLoader() {
    document.getElementById("preloader").style.display = "block";
  }

  function hideLoader() {
    document.getElementById("preloader").style.display = "none";
  }

  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  function showToast(message) {
    toastBootstrap.show();
    document.getElementById("toastText").textContent = message;
  }

  // Fetch single property data based on ID
  function fetchProperty(propertyId) {
    showLoader();

    fetch(`https://onabooking-api.onrender.com/api/v1/properties?_id=${propertyId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((propertyData) => {
        const data = propertyData?.data?.data[0];

        document.getElementById("hotelAddress").textContent = data?.name;
        document.getElementById("hotelPrice").textContent = `₦${data?.price}`;
        document.getElementById("description").textContent = data?.description;

        // Set background image
        document.querySelector(".parallax-window").style.backgroundImage = `url(${data?.images[0]?.imageUrl})`;

        hideLoader();
      })
      .catch((error) => {
        // alert(error.message);
        showToast(error.message);
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  // Get property ID from URL query parameter
  const propertyId = getQueryParam("id");

  // Fetch single property data
  fetchProperty(propertyId);
};
