import $ from "jquery";
import Swal from "sweetalert2"; // Import SweetAlert

$(document).ready(function () {
  // Get parameter ID
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");

  if (bookId) {
    // Get Book data
    $.ajax({
      type: "GET",
      url: `https://perpustakaan-online-server.vercel.app/v1/books/${bookId}`,
      dataType: "json",
      success: function (response) {
        const book = response.data;
        // Get data from API
        $("#title").val(book.title);
        $("#author").val(book.author);
        $("#genre").val(book.genre);
        $("#year").val(book.year);
        $("#description").val(book.description);
        $("#img-book").attr("src", book.image);

        // Handle form submission
        $("#form-edit").submit(function (event) {
          event.preventDefault();

          // collect data to be edited
          const updatedTitle = $("#title").val();
          const updatedAuthor = $("#author").val();
          const updatedGenre = $("#genre").val();
          const updatedYear = $("#year").val();
          const updatedDescription = $("#description").val();
          const updatedImage = $("#image")[0].files[0]; // File upload handling

          // Prepare the data for updating
          const formData = new FormData();
          formData.append("title", updatedTitle);
          formData.append("author", updatedAuthor);
          formData.append("genre", updatedGenre);
          formData.append("year", updatedYear);
          formData.append("description", updatedDescription);

          // Include image file if there's an update
          if (updatedImage) {
            formData.append("image", updatedImage);
          }

          // AJAX call to update the book
          $.ajax({
            type: "PATCH",
            url: `https://perpustakaan-online-server.vercel.app/v1/update-book/${bookId}`,
            processData: false, // Don't process the data
            contentType: false, // Let the server know it's form data
            data: formData, // Send the form data
            success: function (response) {
              Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Buku berhasil diperbarui.',
                confirmButtonText: 'OK'
              }).then(() => {
                window.location.href = `detail.html?id=${bookId}`; // Redirect to the detail page
              });
            },
            error: function (error) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan saat memperbarui buku.',
              });
              console.error("Error updating book:", error);
            },
          });
        });
      },
      error: function (error) {
        console.error("Error fetching book details:", error);
      },
    });

  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Perhatian!',
      text: 'Tidak ada ID buku yang ditemukan.',
    });
  }
});
