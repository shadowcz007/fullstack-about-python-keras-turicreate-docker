from flask import Response,Flask,request

app = Flask(__name__)

#app.debug = True

import predict 
import os

app.config['UPLOAD_FOLDER'] = 'tmp'

@app.route('/')
def hello_world():
    return app.send_static_file('index.html')

@app.route('/predict', methods=['POST'])
def predictFromImg():
    if request.method == 'POST':
        
        predictImg = request.files['predictImg']
 
        predictImg.save(os.path.join(app.config['UPLOAD_FOLDER'], predictImg.filename))
 
        imgurl='./tmp/'+predictImg.filename
        result=predict.img2class(imgurl)
        print(result)
        return '<h1>HELLO~~~: %s</h1>' % result
        

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8888)

