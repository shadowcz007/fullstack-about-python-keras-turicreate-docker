import matplotlib.image as mpimg
import numpy as np
from keras.models import model_from_json
model=model_from_json(open('./model/my_model_architecture.json').read())  
model.load_weights('./model/my_model_weights.h5')

#
from PIL import Image


def rgb2gray(rgb):
    return np.dot(rgb[...,:3], [0.299, 0.587, 0.114])


def img2class(imgFile): 
        
    img = mpimg.imread(imgFile) 
    print(img.shape)
    img = rgb2gray(img)
    print(img)
    print(img.shape)
    img = img.reshape(1, 784)
    
    pre=model.predict_classes(img)   
    result=pre[0]
    
    return result

'''
def img2class(imgFile): 
        
    img = Image.open(imgFile).convert('1')
    
    if img.size[0] != 28 or img.size[1] != 28:
            img = img.resize((28, 28))
    
    imgNew = []
    for i in range(28):
        for j in range(28):  
            pixel = 1.0 - float(img.getpixel((j, i)))/255.0
            pixel=1.0-pixel
            imgNew.append(pixel)
    imgNew = np.array(imgNew)
    imgNew = imgNew.reshape(1, 784)
    
    pre=model.predict_classes(imgNew)   
    result=pre[0]
    
    return result

'''

