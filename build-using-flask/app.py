from flask import Flask, render_template, request
import jsonify
import requests
import pickle
import numpy as np

app = Flask(__name__)
model = pickle.load(open('color.pkl', 'rb'))

@app.route('/',methods=['GET'])
def Home():
    return render_template('index.html')

@app.route('/predict',methods=['GET','POST'])
def predict():
    if request.method == 'GET':
        message = {'answer':'Your answer is showed here'}
        return message
    if request.method == 'POST':
        data=str(request.data)
        # answer = model.predict([[request.body]]);
        predictionData = data[3:-2].split(',')
        r=int(predictionData[0])
        g=int(predictionData[1])
        b=int(predictionData[2])
        answer=model.predict([[r,g,b]])
        # print(answer)
        message = {'answer':answer[0]}
        return message

if __name__=="__main__":
    app.run(debug=True)