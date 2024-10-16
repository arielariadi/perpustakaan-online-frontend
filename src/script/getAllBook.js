import $ from "jquery";
import Swal from 'sweetalert2'

$(document).ready(function () {
    $.ajax({
        url: 'https://perpustakaan-online-server.vercel.app/v1/books',
        success: result => {
            let output = "";
            const books = result.data;

            books.forEach(e => {
                output += getData(e);
            });

            $(".row").html(output);

            $(".row").on("click", ".deleteBtn", function () {
                const bookId = $(this).data("id");
                confirmData(bookId);
            });
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
});

function confirmData(bookId) {
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
                data: JSON.stringify({ id: bookId }),
                success: function () {
                    Swal.fire(
                        'Terhapus',
                        'Daftar Buku dihapus!',
                        'success'
                    ).then(() => {
                        window.location.href = "/index.html";
                    });
                },
                error: function (error) {
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

// Mengambil data buku
function getData(e) {
    return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div class="card h-100">
            <div class="d-flex justify-content-center align-items-center" style="height: 200px; overflow: hidden;">
                <img src="${e.image}" alt="Buku 1" class="card-img-top" style="object-fit: cover; height: 100%; width: 100%;" />
            </div>
            <div class="card-body">
                <div class="d-flex flex flex-row justify-content-between">
                    <h5 class="card-title">${e.title}</h5>
                    <h5 class="card-text">${e.year}</h5>
                </div>
                <p class="card-author">By: ${e.author}</p>
                <div class="d-flex justify-content-start gap-1">
                    <a href="/src/pages/detail-book.html?id=${e._id}"><button type="button" class="btn btn-primary">Detail</button></a>
                    <button class="btn btn-danger deleteBtn" data-id="${e._id}">Hapus</button>
                </div>
            </div>
        </div>
    </div>`;
}
