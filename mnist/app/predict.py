import matplotlib.image as mpimg
import numpy as np
from keras.models import model_from_json
model=model_from_json(open('./model/my_model_architecture.json').read())  
model.load_weights('./model/my_model_weights.h5')

def rgb2gray(rgb):
    return np.dot(rgb[...,:3], [0.299, 0.587, 0.114])

 
def img2class(imgFile): 
        
    img = mpimg.imread(imgFile) 
    print(img.shape)
    img = rgb2gray(img)
    print(img.shape)
    img = img.reshape(1, 784)
    
    pre=model.predict_classes(img)   
    result=pre[0]
    
    return result



