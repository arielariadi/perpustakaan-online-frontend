import $ from "jquery";
$(document).ready(function () {
    $.ajax({
        url: 'https://perpustakaan-online-server.vercel.app/v1/books', // Perbaikan URL
        success: result => {
            // usersData = result;
            let output = "";
            const books = result.data;

            books.forEach(e => {
                output += `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <div class="card h-100">
                        <div class="d-flex justify-content-center align-items-center" style="height: 200px; overflow: hidden;">
                            <img src="${e.image}" alt="Buku 1" class="card-img-top" style="object-fit: cover; height: 100%; width: 100%;" />
                        </div>
                            <div class="card-body">
                            <h5 class="card-title">${e.title}</h5>
                            <p class="card-text">${e.genre}</p>
                            <div class="d-flex justify-content-end">
                                <a href="/src/pages/detail-book.html?id=${e._id}" class="btn btn-dark">Detail</a>
                            </div>
                        </div>
                    </div>
                </div>`
            });
            // Insert to row class
            $(".row").html(output);
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
});


