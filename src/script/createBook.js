import $ from "jquery";

$(document).ready(function () {
  $("#form-upload").on("submit", function (event) {
    event.preventDefault(); // Mencegah halaman reload

    const form = $(this)[0]; // Ambil elemen form
    const formData = new FormData(form); // Buat objek FormData dari form

    $.ajax({
      type: "POST",
      url: "https://perpustakaan-online-server.vercel.app/v1/create-book", // Ganti dengan URL yang sesuai
      data: formData,
      contentType: false, // Ini penting untuk mengunggah file
      processData: false, // Jangan proses data form secara otomatis
      success: function (response) {
        if (response.status === "success") {
          window.location.href = "/src/pages/get-all-book.html"; // Redirect jika sukses
        } else {
          console.log("Gagal: " + response.message);
        }
      },
      error: function (xhr, status, error) {
        console.log("Error: " + xhr.responseText); // Tampilkan error jika gagal
      },
    });
  });
});
