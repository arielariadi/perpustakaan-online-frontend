import $ from "jquery";

$(document).ready(function () {
  $("#form-upload").on("click", function (event) {
    event.preventDefault(); // Mencegah form submit secara tradisional

    const form = $(this)[0]; 
    const formData = new FormData(form); 

    $.ajax({
      type: "POST",
      url: "https://perpustakaan-online-server.vercel.app/v1/create-book",
       data: formData, // get all data
      contentType: false, 
      success: function (response) {
        if (response.status === "success") {
          window.location.href = "/src/pages/get-all-book.html"; 
        } else {
          console.log("Gagal: " + response.message); 
        }
      },
      error: function (xhr, status, error) {
        console.log("Error: " + xhr.responseText); 
      },
    });
  });
});
