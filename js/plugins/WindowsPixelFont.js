//=============================================================================
// WindowsPixelFont.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc Use windows's native pixel fonts
 * @author utunnels
 *
 * @param font#1 family name
 * @desc Font family name for font#1
 * @default gamefont
 *
 * @param font#1 base size
 * @desc Base font size for font#1
 * @default {min:12,max:17}
 *
 * @param ------------------------
 *
 * @param font#2 family name
 * @desc Font family name for font#2
 * @default simsun
 *
 * @param font#2 base size
 * @desc Base font size for font#2
 * @default {min:12,max:17}
 *
 * @param ------------------------
 *
 * @param font#3 family name
 * @desc Font family name for font#3
 * @default ms gothic
 *
 * @param font#3 base size
 * @desc Base font size for font#3
 * @default {min:20,max:22}
 *
 * @param ------------------------
 *
 * @param font#4 family name
 * @desc Font family name for font#4
 *
 * @param font#4 base size
 * @desc Base font size for font#4
 * @default 12
 *
 * @param ------------------------
 *
 * @param font#5 family name
 * @desc Font family name for font#5
 *
 * @param font#5 base size
 * @desc Base font size for font#5
 * @default 12
 *
 * @param ------------------------
 *
 * @param font#6 family name
 * @desc Font family name for font#6
 *
 * @param font#6 base size
 * @desc Base font size for font#6
 * @default 12
 *
 * @param ------------------------
 *
 * @param font#7 family name
 * @desc Font family name for font#7
 *
 * @param font#7 base size
 * @desc Base font size for font#7
 * @default 12
 *
 * @param ------------------------
 *
 * @param font#8 family name
 * @desc Font family name for font#8
 *
 * @param font#8 base size
 * @desc Base font size for font#8
 * @default 12
 *
 * @param ------------------------
 *
 * @param font#9 family name
 * @desc Font family name for font#9
 *
 * @param font#9 base size
 * @desc Base font size for font#9
 * @default 12
 *
 * @param ------------------------
 *
 * @help
 *
 * Will write it later.
 */

/*:zh
 * @target MV MZ
 * @plugindesc 用windows系统自带的像素绘制文字
 * @author utunnels
 *
 * @param font#1 family name
 * @desc 字体名称#1
 * @default gamefont
 *
 * @param font#1 base size
 * @desc 像素字体尺寸范围#1
 * @default {min:12,max:17}
 *
 * @param ------------------------
 *
 * @param font#2 family name
 * @desc 字体名称#2
 * @default simsun
 *
 * @param font#2 base size
 * @desc 像素字体尺寸范围#2
 * @default {min:12,max:17}
 *
 * @param ------------------------
 *
 * @param font#3 family name
 * @desc 字体名称#3
 * @default ms gothic
 *
 * @param font#3 base size
 * @desc 像素字体尺寸范围#3
 * @default {min:10,max:22}
 *
 * @param ------------------------
 *
 * @param font#4 family name
 * @desc 字体名称#4
 *
 * @param font#4 base size
 * @desc 像素字体尺寸范围#4
 * @default 12
 *
 * @param ------------------------
 *
 * @param font#5 family name
 * @desc 字体名称#5
 *
 * @param font#5 base size
 * @desc 像素字体尺寸范围#5
 * @default 12
 *
 * @param ------------------------
 *
 * @param font#6 family name
 * @desc 字体名称#6
 *
 * @param font#6 base size
 * @desc 像素字体尺寸范围#6
 * @default 12
 *
 * @param ------------------------
 *
 * @param font#7 family name
 * @desc 字体名称#7
 *
 * @param font#7 base size
 * @desc 像素字体尺寸范围#7
 * @default 12
 *
 * @param ------------------------
 *
 * @param font#8 family name
 * @desc 字体名称#8
 *
 * @param font#8 base size
 * @desc 像素字体尺寸范围#8
 * @default 12
 *
 * @param ------------------------
 *
 * @param font#9 family name
 * @desc 字体名称#9
 *
 * @param font#9 base size
 * @desc 像素字体尺寸范围#9
 * @default 12
 *
 * @param ------------------------
 *
 * @help
 *
 * 以后再写。
 */
( function(){
var parameters = PluginManager.parameters('WindowsPixelFont');
var winfontList = {};
var findex =0;
for(var i=1;i<=9;i++){
  (function(){
    var fa = String(parameters['font#'+i+' family name']).toLowerCase();
    var bs;
    eval('bs='+parameters['font#'+i+' base size']);
    if(!fa) return;
    winfontList[fa] = {baseSize:bs};
  })();
}

//copy the canvas twice, use fairly bit more memory trading for the effect
//I'm lazy so I just use the original size
function _createFontScaleBuffer(ctx){
  if(!ctx.scalecanvas){
    ctx.scalecanvas = document.createElement('canvas');
    ctx.scalecanvas.width = ctx.canvas.width;
    ctx.scalecanvas.height = ctx.canvas.height;
    ctx.sctx = ctx.scalecanvas.getContext('2d');
    //shadow buffer, to draw semi-transparent outline
    ctx.scalecanvas2 = document.createElement('canvas');
    ctx.scalecanvas2.width = ctx.canvas.width;
    ctx.scalecanvas2.height = ctx.canvas.height;
    ctx.sctx2 = ctx.scalecanvas2.getContext('2d');
  }
}
//measureText, small text size x 2
var $mt = CanvasRenderingContext2D.prototype.measureText;
CanvasRenderingContext2D.prototype.measureText= function(t){
  var f = getFont(this.font);
  if(f.scale==1) {
    return $mt.call(this,t);
  }
  _createFontScaleBuffer(this);
  this.sctx.save();
  this.sctx.font = f.fontSmall;
  var metrix = $mt.call(this.sctx,t);
  this.sctx.restore();
  var result = {};
  for(var k in metrix) result[k] = metrix[k]*f.scale;
  return result;
};
var $ft = CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText = function(t,x,y,w){
  var f = getFont(this.font);
  if(f.scale==1) {
    return $ft.call(this,t,x,y,w);
  }
  _createFontScaleBuffer(this);//console.log(t,f)
  this.sctx.save();
  this.sctx.clearRect(0,0,this.scalecanvas.width,this.scalecanvas.height);
  this.sctx.font = f.fontSmall;
  this.sctx.globalAlpha = 1;
  this.sctx.textBaseline = this.textBaseline;
  this.sctx.textAlign = this.textAlign;
  this.sctx.fillStyle = this.fillStyle;
  $ft.call(this.sctx,t,x,y,w?w/f.scale:w);
  this.sctx.restore();
  this.save();
  var dx=-x*(f.scale-1), dy = -y*(f.scale-1);
  this.imageSmoothingEnabled = false;
  this.sctx.imageSmoothingEnabled = false;
  //this.globalCompositeOperation = 'xor';
  this.drawImage(this.scalecanvas,dx,dy, this.canvas.width*f.scale,this.canvas.height*f.scale);
  this.restore();
};

var $st = CanvasRenderingContext2D.prototype.strokeText;
//outline using fake text shadow, this is faster maybe sometimes looks better for pixel fonts
CanvasRenderingContext2D.prototype.strokeText2 = function(t,x,y,w){
  var f = getFont(this.font);
  //if(f.scale==1) {
  //  return $st.call(this,t,x,y,w);
  //}
  _createFontScaleBuffer(this);
  this.sctx.save();
  this.sctx.clearRect(0,0,this.scalecanvas.width,this.scalecanvas.height);
  this.sctx.font = f.fontSmall;
  this.sctx.globalAlpha = 1;
  this.sctx.textBaseline = this.textBaseline;
  this.sctx.textAlign = this.textAlign;
  this.sctx.fillStyle = this.strokeStyle;
  $ft.call(this.sctx,t,x,y,w?w/f.scale:w);
  this.sctx.restore();
  this.save();
  this.imageSmoothingEnabled = false;
  this.sctx.imageSmoothingEnabled = false;
  var lw = Math.round(this.lineWidth/2);
  if(lw<1) lw = 1;
  var dx=-x*(f.scale-1), dy = -y*(f.scale-1);
  this.drawImage(this.scalecanvas,dx+lw,dy+lw, this.canvas.width*f.scale,this.canvas.height*f.scale);
  this.restore();
};
//used to get color value
var pix = document.createElement('canvas');
pix.willReadFrequently = true;
pix.width=1;pix.height=1;
var pctx = pix.getContext('2d');
function getRgba(color){
  pctx.fillStyle = color;
  pctx.clearRect(0,0,1,1);
  pctx.fillRect(0,0,1,1);
  return pctx.getImageData(0,0,1,1).data;
}
//draw text outline, tricky and slow, draw multiple times around the text
CanvasRenderingContext2D.prototype.strokeText = function(t,x,y,w){
  var f = getFont(this.font);
  //if(f.scale==1) {
  //  return $st.call(this,t,x,y,w);
  //}
  _createFontScaleBuffer(this);
  this.sctx.save();
  this.sctx.clearRect(0,0,this.scalecanvas.width,this.scalecanvas.height);
  this.sctx.font = f.fontSmall;
  this.sctx.globalAlpha = 1;
  this.sctx.textBaseline = this.textBaseline;
  this.sctx.textAlign = this.textAlign;
  var rawcolor = getRgba(this.strokeStyle||'black');
  this.sctx.fillStyle = 'rgb('+rawcolor[0]+','+rawcolor[1]+','+rawcolor[2]+')';
  $ft.call(this.sctx,t,x,y,w?w/f.scale:w);
  this.sctx.restore();
  this.sctx2.save();
  this.sctx2.clearRect(0,0,this.canvas.width,this.canvas.height);
  this.sctx2.imageSmoothingEnabled = false;
  this.sctx.imageSmoothingEnabled = false;
  this.sctx2.globalAlpha=1;
  var dx=-x*(f.scale-1), dy = -y*(f.scale-1);
  var lw = Math.round(this.lineWidth/2);
  if(lw<1) lw = 1;
  for(var i=-lw;i<=lw;i=Math.min(i+f.scale,lw)){
    for(var j=-lw;j<=lw;j=Math.min(j+f.scale,lw)){
      this.sctx2.drawImage(this.scalecanvas,dx+i,dy+j, this.canvas.width*f.scale,this.canvas.height*f.scale);
      if(j==lw) break;
    }
    if(i==lw)break;
  }
  //finally hollow the text with xor
  this.sctx2.globalCompositeOperation = 'xor';
  this.sctx2.drawImage(this.scalecanvas,dx,dy, this.canvas.width*f.scale,this.canvas.height*f.scale);
  this.sctx2.restore();
  this.save();
  //this.reset();
  this.globalAlpha *= rawcolor[3]/255;
  this.globalCompositeOperation = 'xor'; //works if background is transparent and shadow alpha is 0.5 or 1
  this.drawImage(this.scalecanvas2,0,0);
  this.restore();
};
var $$font = {};//cache the results
var $$$p= document.createElement('p');
function getFont(font){
  var f = $$font[font];
  if(!f){
    $$$p.style.font = font;
    f = {};
    f.fontSize = $$$p.style.fontSize;
    f.fontFamily = $$$p.style.fontFamily.replace(/['"]/g,'').toLowerCase();
    f.fontStyle = $$$p.style.fontStyle;
    f.fontWeight = $$$p.style.fontWeight;
    f.size = parseInt(f.fontSize);
    determinePixelFontScale(f);
    $$font[font] = f;
  }
  return f;
}

//minSize minimal size the text is readable
//maxSize max size the text remains 'pixelated'
function _determineScale(f, minSize, maxSize){
    var size = f.size;
    f.minSize = minSize;
    f.maxSize = maxSize;
    if(size<=maxSize) {
      f.scale = 1;
      f.sizeSmall = f.size;
    }else{
      var close = Infinity;
      var result = -1;
      for(var i=1;i<=size;i++){
        var s = Math.round(size/i);
        if(s>=minSize&&s<=maxSize){
          var r = Math.abs(s * i / size - 1);
          if(r<close) {
            close = r;
            result = i;
            f.scale = i;
            f.sizeSmall = s;
          }
        }
      }
      close = Infinity;
      if(result<0){
        for(var i=1;i<=size;i++){
          var s = Math.round(size/i);
          var r = Math.abs(s - (minSize+maxSize)/2);
          if(r<close) {
            close = r;
            result = i;
            f.scale = i;
            f.sizeSmall = Math.round((minSize+maxSize)/2);
          }
        }
      }
      if(result<0){
        f.scale = 1;
        f.sizeSmall = f.size;
      }
    }
}
//determine a font's scale from its basic pixelate form
//params: font, size
//    if(f.fontFamily=='ms gothic'){
//      _determineScale(f,10,22); //10,22
//    }else if(f.fontFamily=='simsun'){
//      _determineScale(f, 12, 17); //12,17
function determinePixelFontScale(f){
    var ff = winfontList[f.fontFamily];
    if(ff){
      var bs = ff.baseSize;
      if(typeof bs=='number'){
        bs = {min:bs,max:bs};
      }else if(typeof bs=='function'){
        bs = bs();
      }
      if(!bs.min||!bs.max){
        var ss = bs[f.size];
        bs = {min:f.ss,max:ss};
      }
      _determineScale(f, bs.min, bs.max);
    }else{
      f.scale = 1;
      f.sizeSmall = f.size;
    }
    f.fontSmall = f.fontStyle + (f.fontStyle?' ':'') + f.sizeSmall + 'px "' + f.fontFamily + '"';
}


Window_Base.prototype.standardFontFace = function() {
  return 'gamefont';
};
Window_Message.prototype.newLineX = function() {
  return $gameMessage.faceName() === '' ? 2 : 170;
};

})();
