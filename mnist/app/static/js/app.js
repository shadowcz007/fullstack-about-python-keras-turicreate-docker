
var clearBtn = document.getElementById("mnist-pad-clear");
var saveBtn = document.getElementById("mnist-pad-save");
var canvas = document.querySelector("canvas");

var mnistPad = new SignaturePad(canvas, {
  backgroundColor: 'transparent',
  minWidth: 6,
  maxWidth: 8,
});

 
function resizeCanvas() {
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
//  canvas.getContext("2d").scale(ratio, ratio);
  mnistPad.clear();
}

window.onresize = resizeCanvas;
resizeCanvas();

 

function img2text(b64img){
  
  var formData = new FormData();

  var blob = dataURItoBlob(b64img);

  formData.append("predictImg", blob);

  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if ((request.status >= 200 && request.status < 300) || request.status == 304) {
                console.log(request.response)
                document.querySelector('#mnist-pad-result').innerHTML=request.response;
            };
        }
    };
    
  request.open("POST", "./predict");
  request.send(formData);

};


function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    };
    return new Blob([ia], {type:mimeString});
};


clearBtn.addEventListener("click", function (event) {
  mnistPad.clear();
});

saveBtn.addEventListener("click", function (event) {
  if (mnistPad.isEmpty()) {
    alert("请书写一个数字");
  } else {
     mnistPad.getMNISTGridBySize(true,28,img2text);
  }
});
