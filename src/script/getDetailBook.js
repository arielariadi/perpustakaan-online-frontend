import $ from "jquery"
import Swal from 'sweetalert2'

$(document).ready(function () {
  // Get ID Parameter
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");
  if (bookId) {
    $.ajax({
      type: "GET",
      url: `https://perpustakaan-online-server.vercel.app/v1/books/${bookId}`,
      dataType: "json",
      success: function (response) {
        const book = response.data;
        // Set class value
        $(".card-title").text(book.title);
        $(".card-author").text("By : " + book.author);
        $(".card-year").text(book.year);
        $(".card-genre").text("Genre : " + book.genre);
        $(".card-description").text(book.description);
        $("#img-book").attr("src", book.image);

        // Set link with book id
        $("#edit-book").attr("href", `/src/pages/edit-book?id=${bookId}`);
        // Button confirmation
        $("#deleteBtn").on("click", function () {
          confirmData();
        });


      },
      error: function (error) {
        console.error("Error fetching note details:", error);
      },
    });
  } else {
    alert("No note ID provided");
  }
});

function confirmData() {
  Swal.fire({
    title: 'Anda yakin untuk menghapusnya?',
    icon: 'warning',
    showCancelButton: true,       
    confirmButtonText: 'Hapus',  
    cancelButtonText: 'Batal',       
    reverseButtons: true,         
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "DELETE",
        url: `https://perpustakaan-online-server.vercel.app/v1/delete-book`,  
        contentType: "application/json", 
        data: JSON.stringify({ id: bookId }),  // Send request body
        success: function () {
          Swal.fire(
            'Terhapus',
            'Daftar Buku dihapus!',
            'success'
          ).then(() => {
            window.location.href = "/src/pages/get-all-book.html";  // Redirect 
          });
        },
        error: function (error) {
          console.error("Error deleting note:", error);
          Swal.fire(
            'Error',
            'Terjadi kesalahan saat menghapus buku.',
            'error'
          );
        },
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Dibatalkan',
        'Buku tidak dihapus.',
        'error'
      );
    }
  });
}