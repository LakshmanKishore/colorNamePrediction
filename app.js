let imageInput = document.querySelector('.imageInput');
let introduction = document.querySelector('.introduction');
let image = document.querySelector('.image');
let canvas = document.querySelector('canvas');
let answer = document.querySelector('.answer');
let c = canvas.getContext('2d');

var colorData = [];

fetch('./colorName.csv')
  .then(response => response.text())
  .then(data => {
    // Process the CSV data
    processData(data);
  })
  .catch(error => {
    console.error('Error loading CSV file:', error);
  });

function processData(data) {
  const rows = data.split('\n');

  for (let i = 1; i < rows.length; i++) {
    const columns = rows[i].split(',');
    const color = {
      name: columns[1],
      r: columns[3],
      g: columns[4],
      b: columns[5]
    };
    colorData.push(color);
  }
  console.log(colorData)
}

function loadImage(src) {
    introduction.hidden = true;
    image.hidden = false;
    image.src = src;
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
    answer.innerText = text;
    answer.innerHTML += "  :  <div class='colorBox'></div>";
    let colorBox = document.querySelector('.colorBox');
    colorBox.style.backgroundColor = "rgb(" + rgb + ")";
}

function useCanvas(el, image, callback) {
    el.width = image.width;
    el.height = image.height;
    el.getContext('2d')
        .drawImage(image, 0, 0, image.width, image.height);
    return callback();
}


function findNearestColor(r, g, b, k) {
    // Calculate the Euclidean distance between the input RGB values and colors in the data
    const distances = colorData.map(color => {
      const d = Math.sqrt(
        Math.pow(r - color.r, 2) +
        Math.pow(g - color.g, 2) +
        Math.pow(b - color.b, 2)
      );
      return { color: color.name, distance: d };
    });
  
    // Sort the distances in ascending order
    distances.sort((a, b) => a.distance - b.distance);
  
    // Get the k nearest neighbors
    const nearestNeighbors = distances.slice(0, k);
  
    // Extract the color names of the nearest neighbors
    const nearestColorNames = nearestNeighbors.map(neighbor => neighbor.color);
  
    // Return the nearest color name(s)
    return nearestColorNames;
  }
  

function predict(e) {
    if (e.offsetX) {
        x = e.offsetX;
        y = e.offsetY;
    }
    else if (e.layerX) {
        x = e.layerX;
        y = e.layerY;
    }
    image.crossOrigin = "Anonymous";
    useCanvas(canvas, image, function () {
        let rgb = getColor(x, y);
        let rgb_string = rgb[0] + "," + rgb[1] + "," + rgb[2];
        
        const nearestColor = findNearestColor(rgb[0], rgb[1], rgb[2], 1);
        // console.log("Nearest Color", nearestColor)
        displayAnswer(nearestColor[0], rgb_string);
    });
};


imageInput.addEventListener('change', loadFile);
image.addEventListener('click', predict);