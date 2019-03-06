var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 *@author
 *
 */
var particles = (function (_super) {
    __extends(particles, _super);
    function particles() {
        return _super.call(this) || this;
    }
    particles.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    particles.prototype.show = function (data) {
        _super.prototype.show.call(this, data);
        var bg = wy.Tools.createSprBtn(0, 0, 640, 1236, 0xffffff, 1);
        this.addChild(bg);
        // var imageLoader = new egret.ImageLoader();
        // imageLoader.load("./resource/assets/build.png");
        // imageLoader.addEventListener(egret.Event.COMPLETE, this.loaderComplete, this);
        this.drawImage();
    };
    particles.prototype.loaderComplete = function (e) {
        // 原图片
        var imageLoader = e.currentTarget;
        var imageData = imageLoader.data;
        var texture = new egret.Texture();
        texture._setBitmapData(imageData);
        var image = new egret.Bitmap(texture);
        this.addChild(image);
    };
    particles.prototype.drawImage = function () {
        this.imgArr = [];
        var image = new egret.Bitmap(RES.getRes("build_png"));
        this.addChild(image);
        var s_w = 20; // 像素点的大小;
        var s_h = 20; // 像素点的大小;
        var rows = Math.ceil(image.texture._bitmapWidth / s_w); // 行数
        var cols = Math.ceil(image.texture._bitmapHeight / s_h); // 列数
        var len = rows * cols; // 总数量
        var pos = 0; // 当前数量
        var par_x = 0, par_y = 0; // 粒子所在位置
        this.imgSpr = new egret.Sprite();
        this.imgSpr.width = 640;
        this.imgSpr.height = 1236;
        this.addChild(this.imgSpr);
        this.imgSpr.touchEnabled = true;
        this.imgSpr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        // 通过截图获取每个粒子的图像
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                par_x = i * s_w;
                par_y = j * s_h;
                var rect = new egret.Rectangle(par_x, par_y, s_w, s_h);
                var texture = new egret.RenderTexture();
                texture.drawToTexture(image, rect);
                // textureArr.push({ _x: par_x, _y: par_y, _texture: texture });
                var bitmap = new egret.Bitmap(texture);
                this.imgSpr.addChild(bitmap);
                bitmap.width = s_w;
                bitmap.height = s_h;
                bitmap.x = par_x + RandomUtils.limit(1, 10);
                bitmap.y = par_y + RandomUtils.limit(1, 10);
                bitmap.name = par_x + "_" + par_y;
                pos++;
                this.imgArr.push({ _x: par_x, _y: par_y, _bitmap: bitmap });
            }
        }
        wy.Tools.removeFromParent(image);
        // for (){
        // }
    };
    particles.prototype.reset = function () {
        var len = this.imgArr.length;
        for (var i = 0; i < len; i++) {
            // this.imgArr[i]._bitmap.x = this.imgArr[i]._x;
            // this.imgArr[i]._bitmap.y = this.imgArr[i]._y;
            var img = this.imgArr[i], _bitmap = img._bitmap, _x = img._x, _y = img._y;
            egret.Tween.get(_bitmap).to({ x: _x, y: _y }, 1000, egret.Ease.backOut);
        }
        console.log('done');
    };
    particles.prototype.hide = function () {
        _super.prototype.hide.call(this);
        this.imgSpr.touchEnabled = false;
        this.imgSpr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    particles.prototype.onTouchTap = function (e) {
        switch (e.currentTarget) {
            case this.imgSpr:
                this.reset();
                break;
            default:
                break;
        }
    };
    return particles;
}(particlesUI));
__reflect(particles.prototype, "particles");
