let imageInput = document.querySelector('.imageInput');
let introduction = document.querySelector('.introduction');
let canvas = document.querySelector('canvas');
let answer = document.querySelector('.answer');
let submit = document.querySelector('.submit');
let urlImage = document.querySelector('.urlImage');

let c = canvas.getContext('2d');

function displayImage(myImage) {
    introduction.hidden = true;
    canvas.hidden = false;
    let MAX_WIDTH = window.innerWidth - 20;
    let MAX_HEIGHT = window.innerHeight - 200;
    let width = myImage.width;
    let height = myImage.height;
    console.log(MAX_WIDTH, MAX_HEIGHT);

    if (width > height) {
        if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
        }
    }

    canvas.width = width;
    canvas.height = height;
    answer.width = canvas.width;
    c.drawImage(myImage, 0, 0, width, height);
}

function loadImage(src) {
    let myImage = new Image();
    myImage.crossOrigin = "Anonymous";
    myImage.src = src;
    myImage.onload = function () {
        displayImage(myImage);
    }
}

function loadImageFromUrl() {
    fetch(urlImage.value)
        .then(function () {
            loadImage(urlImage.value);
            // console.log("Fetched");
        })
        .catch(function () {
            answer.innerText = "Cannot fetch this image";
            introduction.hidden = true;
            canvas.hidden = true;
            // console.log("Not able to fetch")
        });
}

function loadFile(e) {
    if (e.target.files) {
        let imageFile = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function (e) {
            loadImage(e.target.result);
        }
    }
}

function getColor(x, y) {
    let pixel = c.getImageData(x, y, 1, 1);
    let rgb = pixel.data;

    return rgb;
}

function displayAnswer(text, rgb) {
    answer.innerText = text.answer;
    answer.innerHTML += "  :  <div class='colorBox'></div>";
    let colorBox = document.querySelector('.colorBox');
    colorBox.style.backgroundColor = "rgb(" + rgb + ")";
}

function predict(e) {
    let x = e.layerX, y = e.layerY;
    let rgb = getColor(x, y);
    let rgb_string = rgb[0] + "," + rgb[1] + "," + rgb[2];
    console.log(rgb_string);
    sender = JSON.stringify(rgb_string);
    fetch('/predict', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: sender,
    })
        .then(function (response) {
            return response.json();
        }).then(function (text) {
            displayAnswer(text, rgb_string);
        });
};

imageInput.addEventListener('change', loadFile);
canvas.addEventListener('click', predict);
submit.addEventListener('click', loadImageFromUrl);

console.log("Working");