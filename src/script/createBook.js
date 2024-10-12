import $ from "jquery";
import Swal from 'sweetalert2'; 

$(document).ready(function () {
  $("#form-upload").on("submit", function (event) {
    event.preventDefault(); 

    const form = $(this)[0]; 
    const formData = new FormData(form); 

    $.ajax({
      type: "POST",
      url: "https://perpustakaan-online-server.vercel.app/v1/create-book", 
      data: formData,
      contentType: false, 
      processData: false, 
      success: function (response) {
        if (response.status === "success") {
          Swal.fire({
            title: 'Berhasil!',
            text: 'Buku berhasil ditambahkan.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.href = "/index.html"; // Redirect jika sukses
          });
        } else {
          Swal.fire({
            title: 'Gagal',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      error: function (xhr, status, error) {
        Swal.fire({
          title: 'Error',
          text: xhr.responseText || 'Terjadi kesalahan.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      },
    });
  });
});
