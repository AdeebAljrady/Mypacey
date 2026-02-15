const sidebarBox = document.querySelector('.page-sidebar'),
    sidebariIcon = document.querySelector('.navicon-toggle'),
    pageWrapper = document.querySelector('#page-wrapper');

sidebariIcon.addEventListener('click', event => {
    sidebariIcon.classList.toggle('active');
    sidebarBox.classList.toggle('active');
});

pageWrapper.addEventListener('click', event => {

    if (sidebarBox.classList.contains('active')) {
        sidebariIcon.classList.remove('active');
        sidebarBox.classList.remove('active');
    }
});

window.addEventListener('keydown', event => {

    if (sidebarBox.classList.contains('active') && event.keyCode === 27) {
        sidebariIcon.classList.remove('active');
        sidebarBox.classList.remove('active');
    }
});



/******************************* */

function previewImage() {
    var file = document.getElementById("productImage").files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        document.getElementById("preview").style.display = "block";
        document.getElementById("preview").src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        document.getElementById("preview").src = "";
    }
}

function toggleSubmitButton() {
    document.getElementById("submitBtn").disabled = !document.getElementById("terms").checked;
}
