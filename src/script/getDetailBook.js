import $ from "jquery"
import Swal from 'sweetalert2'

$(document).ready(function () {
  // Get the note ID from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");
  if (bookId) {
    $.ajax({
      type: "GET",
      url: `https://perpustakaan-online-server.vercel.app/v1/books/${bookId}`,
      dataType: "json",
      success: function (response) {
        const book = response.data;
        // Populate the page with note details
        $(".card-title").text(book.title);
        $(".card-genre").text("Genre : " + book.genre);
        // $(".card-text").text(new Date(book.createdAt).toLocaleString());
        $(".card-description").text(book.description);
        $("#img-book").attr("src",book.image);

        // Set link with book id
        $("#edit-book").attr("href", `/src/pages/edit-book?id=${bookId}`);
        // Button confirmation
        $("#deleteBtn").on("click", function () {
          Swal.fire({
              title: 'Anda yakin untuk menghapusnya?',
              icon: 'warning',
              showCancelButton: true,       // Menampilkan tombol "Batal"
              confirmButtonText: 'Hapus',  // Teks untuk tombol konfirmasi
              cancelButtonText: 'Batal',       // Teks untuk tombol batal
              reverseButtons: true,         // Mengatur urutan tombol (opsional)
          }).then((result) => {
              if (result.isConfirmed) {
                  $.ajax({
                      type: "DELETE",
                      url: `https://perpustakaan-online-server.vercel.app/v1/delete-book`,  // Tetap gunakan URL tanpa bookId di path
                      contentType: "application/json",  // Menentukan tipe konten sebagai JSON
                      data: JSON.stringify({ id: bookId }),  // Kirim bookId di dalam body sebagai JSON
                      success: function () {
                          Swal.fire(
                              'Terhapus',
                              'Daftar Buku dihapus!',
                              'success'
                          ).then(() => {
                              window.location.href = "/src/pages/get-all-book.html";  // Redirect kembali ke halaman utama
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
                  // Jika pengguna mengklik tombol "Batal"
                  Swal.fire(
                      'Dibatalkan',
                      'Buku tidak dihapus.',
                      'error'
                  );
              }
          });
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

        // Add click event listener for delete button here to ensure noteId is available
        // $("#deleteBtn").on("click", function () {
        //   Swal.fire({
        //     title: 'Error!',
        //     text: 'Do you want to continue',
        //     icon: 'error',
        //     confirmButtonText: 'Cool'
        //   })
        //   if (confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
            
        //   }
        // });

