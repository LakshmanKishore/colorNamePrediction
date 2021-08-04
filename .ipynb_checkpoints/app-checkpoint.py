from flask import Flask, render_template, request
import jsonify
import requests
import pickle
import numpy as np
import sklearn
from sklearn.preprocessing import StandardScaler
app = Flask(__name__)
model = pickle.load(open('color.pkl', 'rb'))

@app.route('/',methods=['GET'])
def Home():
    return render_template('index.html')


if __name__=="__main__":
    app.run(debug=True)