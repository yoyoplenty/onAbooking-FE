const token = localStorage.getItem("token");
if (token) {
  document.getElementById("top_links").style.display = "none";
} else {
  document.getElementById("top_links").style.display = "block";
}
