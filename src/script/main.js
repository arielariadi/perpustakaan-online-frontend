import '../css/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

document.getElementById('form-upload').addEventListener('submit', function(event) {
    let tahun = document.getElementById('tahun').value;
    let currentYear = new Date().getFullYear();
    const file = document.getElementById('gambarBuku').files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    // Validasi Tahun
    if (tahun > currentYear) {
        event.preventDefault(); // Menghentikan pengiriman form
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tahun tidak boleh lebih dari tahun saat ini.'
        });
        return; // Stop further validation
    }

    // Validasi File (jika ada file yang diunggah)
    if (file) {
        // Validasi tipe file
        if (!allowedTypes.includes(file.type)) {
            event.preventDefault(); // Menghentikan pengiriman form
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hanya file dengan format JPG, PNG, atau GIF yang diperbolehkan.'
            });
            return; // Stop further validation
        }

        // Validasi ukuran file
        if (file.size > maxSize) {
            event.preventDefault(); // Menghentikan pengiriman form
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ukuran file maksimal adalah 2MB.'
            });
            return; // Stop further validation
        }
    } else {
        event.preventDefault(); // Menghentikan pengiriman form
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Harap unggah file gambar terlebih dahulu.'
        });
        return; // Stop further validation
    }

    // Jika semua validasi lolos, tampilkan konfirmasi submit
    event.preventDefault(); // Menghentikan pengiriman form sebelum konfirmasi
    Swal.fire({
        title: 'Apakah data sudah benar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById('form-upload').submit(); // Jika dikonfirmasi, submit form
        }
    });
});