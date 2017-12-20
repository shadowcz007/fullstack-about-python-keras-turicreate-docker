// add by shadow

SignaturePad.prototype.getArea = function() {

  var xs = [],
    ys = [];
    
  var orign = this.toData();

  for (var i = 0; i < orign.length; i++) {
    var orignChild = orign[i];

    for (var j = 0; j < orignChild.length; j++) {
      xs.push(orignChild[j].x);
      ys.push(orignChild[j].y);
    }

  };

  var paddingNum = 30;

  var min_x = Math.min.apply(null, xs) - paddingNum;
  var min_y = Math.min.apply(null, ys) - paddingNum;
  var max_x = Math.max.apply(null, xs) + paddingNum;
  var max_y = Math.max.apply(null, ys) + paddingNum;

  var width = max_x - min_x,
    height = max_y - min_y;

  var grid = {
    x: min_x,
    y: min_y,
    w: width,
    h: height
  };

  return grid;

};

SignaturePad.prototype.change2grid = function(area) {
  var w = area.w,
    h = area.h,
    x = area.x,
    y = area.y;

  var xc = x,
    yc = y,
    wc = w,
    hc = h;

  if (h >= w) {
    xc = x - (h - w) * 0.5;
    wc = h;
  } else {
    yc = y - (w - h) * 0.5;
    hc = w;
  };

  return {
    x: xc,
    y: yc,
    w: wc,
    h: hc
  }
}


SignaturePad.prototype.getMNISTGridBySize = function(isDev,size, cb) {

  var area = this.getArea();
  var grid = this.change2grid(area);

  if (isDev) {
    
    this._ctx.strokeStyle = "green";
    this._ctx.strokeRect(area.x, area.y, area.w, area.h);
    
    this._ctx.strokeStyle = "pink";
    this._ctx.strokeRect(grid.x, grid.y, grid.w, grid.h);

  };


  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;

  var img = new Image();
  
  img.onload = function() {

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, grid.w, grid.h);

    ctx.drawImage(img, grid.x, grid.y, grid.w, grid.h, 0, 0, size, size);

    var imgData = ctx.getImageData(0, 0, size, size);

    for (var i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = 255 - imgData.data[i];
      imgData.data[i + 1] = 255 - imgData.data[i + 1];
      imgData.data[i + 2] = 255 - imgData.data[i + 2];
      imgData.data[i + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);

    cb(canvas.toDataURL());
    
    if (isDev) {
      document.body.append(canvas);
      setTimeout(function() {
        canvas.remove()
      }, 2000);
    };
    
  };
  
  img.src = this.toDataURL();
  
};
