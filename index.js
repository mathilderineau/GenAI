let currentPage = 0;
let currentImage = 0;
const imagesPerPage = 20; // 5x4 table
const images = Array.from({length: 63}, (_, i) => `CatsDogs_000${String(i+1).padStart(2, '0')}.jpg`);
const imageTable = document.getElementById('imageTable');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const overlay = document.getElementById('overlay');
const overlayImage = document.getElementById('overlayImage');
const prevImageButton = document.getElementById('prevImage');
const nextImageButton = document.getElementById('nextImage');

window.onload = function() {
    displayImages();
};

function displayImages() {
    // Clear the table
    imageTable.innerHTML = '';

    // Calculate the start and end indices for the images on the current page
    const start = currentPage * imagesPerPage;
    const end = start + imagesPerPage;
    const imagesOnPage = images.slice(start, end);

    // Create a new row for every 5 images
    for (let i = 0; i < imagesOnPage.length; i += 5) {
        const row = document.createElement('tr');
        for (let j = i; j < i + 5 && j < imagesOnPage.length; j++) {
            const cell = document.createElement('td');
            const img = document.createElement('img');
            img.src = 'Pictures/CatsDogs/' + imagesOnPage[j];
            img.onclick = function() {
                showOverlay(this.src);
            };
            cell.appendChild(img);
            row.appendChild(cell);
        }
        imageTable.appendChild(row);
    }

    // Enable or disable the previous/next page buttons based on the current page
    prevPageButton.disabled = (currentPage === 0);
    nextPageButton.disabled = (end >= images.length);
}

function changePage(direction) {
    currentPage += direction;
    displayImages();
}

function showOverlay(src) {
    currentImage = images.indexOf(src.split('/').pop());
    overlayImage.src = src;
    overlay.style.display = 'flex';

    // Enable or disable the previous/next image buttons based on the current image
    prevImageButton.disabled = (currentImage === 0);
    nextImageButton.disabled = (currentImage === images.length - 1);
}

function hideOverlay() {
    overlay.style.display = 'none';
}

function changeImage(direction) {
    currentImage += direction;
    overlayImage.src = 'Pictures/CatsDogs/' + images[currentImage];

    // Enable or disable the previous/next image buttons based on the current image
    prevImageButton.disabled = (currentImage === 0);
    nextImageButton.disabled = (currentImage === images.length - 1);

    // Stop the click event from propagating to the overlay
    event.stopPropagation();
}
