
# Color Name Prediction

Predicts the color name when a user clicks on a image.
I have used KNN to find the nearest Color Name of the RGB value.
The dataset contains nearly 865 Color Names.

## Tech Stack

**Client:** HTML, CSS, JS

**Server:** Flask

  
## Demo

![](/static/colorName.gif)

  
## Lessons Learned

I was able to create a Machine Learning model. 
I learnt about KNN classifier. With the help of flask,
I was able to link the model to HTML file and used for live prediction.
  
## Run Locally

Clone the project

```bash
  git clone https://github.com/LakshmanKishore/colorNamePrediction.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the server

```bash
  python app.py
```

# You can watch the code live [here](https://lakshman-colorname.herokuapp.com)