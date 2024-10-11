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
            // Insert to row class
            $(".row").html(output);

            // Event handler untuk tombol Hapus
            $(".row").on("click", ".deleteBtn", function () {
                const bookId = $(this).data("id");
                confirmData(bookId);
            });

            // Event handler untuk tombol Detail
            $(".row").on("click", ".btn-primary", function () {
                const bookId = $(this).data("id");  // Ambil bookId dari tombol yang diklik
                fetchBookData(bookId);
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
                        window.location.href = "/src/pages/get-all-book.html";
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
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookModal" data-id="${e._id}">Detail</button>
                    <button class="btn btn-danger deleteBtn" data-id="${e._id}">Hapus</button>
                </div>
            </div>
        </div>
    </div>`;
}

// Get detail book
function fetchBookData(bookId) {
    $.ajax({
        url: `https://perpustakaan-online-server.vercel.app/v1/books/${bookId}`,
        method: 'GET',
        success: function (response) {
            const book = response.data;

            const modalContent = getModalBox(book)
            // Mengisi konten modal
            $('#modalContent').html(modalContent);
        },
        error: function (err) {
            console.log('Error:', err);
        }
    });
}

// Detail Modalbox

function getModalBox(book){
    return `
    <div class="detail-wrapper d-flex flex-row gap-2">
        <div class="img-wrapper col-md-6">
            <img src="${book.image}" alt="Buku 1" class="card-img-top" style="object-fit: cover; height: 100%; width: 100%;" />
        </div>
        <div class="text-detail col-md-6 mt-3">
            <p><strong>Judul Buku:</strong> ${book.title}</p>
            <p><strong>Penulis:</strong> ${book.author}</p>
            <p><strong>Tahun:</strong> ${book.year}</p>
            <p><strong>Deskripsi:</strong> ${book.description}</p>
        </div>
    </div>
`;
}