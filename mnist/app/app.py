from flask import Response,Flask,request

app = Flask(__name__)

#app.debug = True

import predict 
import os

import time

app.config['UPLOAD_FOLDER'] = 'tmp'

@app.route('/')
def hello_world():
    return app.send_static_file('index.html')

@app.route('/index1')
def test():
    return app.send_static_file('index1.html')


@app.route('/predict', methods=['POST'])
def predictFromImg():
    if request.method == 'POST':
        
        predictImg = request.files['predictImg']
        
        filename=str(int(time.mktime(time.localtime())))+'.png'
         
        predictImg.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
 
        imgurl='./tmp/'+filename
        result=predict.img2class(imgurl)
        print(result)
        return str(result)
        

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8888)

