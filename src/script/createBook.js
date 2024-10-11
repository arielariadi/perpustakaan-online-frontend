import $ from "jquery";

$(document).ready(function () {
  $("#form-upload").on("click", function (event) {
    event.preventDefault(); // Mencegah form submit secara tradisional

    const form = $(this)[0]; // Mengambil elemen DOM form
    const formData = new FormData(form); // Membuat objek FormData, termasuk file gambar

    $.ajax({
      type: "POST",
      url: "https://perpustakaan-online-server.vercel.app/v1/create-book",
      data: formData, // Mengirimkan data dalam bentuk FormData
      contentType: false, // Jangan ubah content type secara otomatis oleh jQuery
      processData: false, // Jangan memproses data menjadi string
      success: function (response) {
        if (response.status === "success") {
          window.location.href = "/src/pages/get-all-book.html"; // Redirect jika sukses
        } else {
          console.log("Gagal: " + response.message); // Menangani kegagalan respons
        }
      },
      error: function (xhr, status, error) {
        console.log("Error: " + xhr.responseText); // Menampilkan pesan error dari server
      },
    });
  });
});
