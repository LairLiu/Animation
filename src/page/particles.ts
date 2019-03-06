/**
 *
 *@author
 *
 */
class particles extends particlesUI {
	constructor() {
		super();
	}

	protected createChildren(): void {
		super.createChildren();
	}

	public show(data?): void {
		super.show(data);

		let bg = wy.Tools.createSprBtn(0, 0, 640, 1236, 0xffffff, 1);
		this.addChild(bg);

		// var imageLoader = new egret.ImageLoader();
		// imageLoader.load("./resource/assets/build.png");
		// imageLoader.addEventListener(egret.Event.COMPLETE, this.loaderComplete, this);

		this.drawImage();
	}

	private loaderComplete(e: egret.Event) {

		// 原图片
		let imageLoader = <egret.ImageLoader>e.currentTarget;
		let imageData = imageLoader.data;
		let texture = new egret.Texture();
		texture._setBitmapData(imageData);
		let image = new egret.Bitmap(texture);
		this.addChild(image);
	}

	private imgSpr: egret.Sprite;
	private imgArr: { _x: number, _y: number, _bitmap: egret.Bitmap, _texture?: egret.RenderTexture }[];
	private drawImage() {
		this.imgArr = [];

		let image = new egret.Bitmap(RES.getRes("build_png"));
		this.addChild(image);

		let s_w = 20;	// 像素点的大小;
		let s_h = 20;	// 像素点的大小;
		let rows = Math.ceil(image.texture._bitmapWidth / s_w);		// 行数
		let cols = Math.ceil(image.texture._bitmapHeight / s_h);	// 列数
		let len = rows * cols;		// 总数量
		let pos = 0;				// 当前数量
		let par_x = 0, par_y = 0;	// 粒子所在位置

		this.imgSpr = new egret.Sprite();
		this.imgSpr.width = 640;
		this.imgSpr.height = 1236;
		this.addChild(this.imgSpr);
		this.imgSpr.touchEnabled = true;
		this.imgSpr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

		// 通过截图获取每个粒子的图像
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {

				par_x = i * s_w;
				par_y = j * s_h;

				let rect = new egret.Rectangle(par_x, par_y, s_w, s_h);

				let texture = new egret.RenderTexture();
				texture.drawToTexture(image, rect);

				// textureArr.push({ _x: par_x, _y: par_y, _texture: texture });
				let bitmap = new egret.Bitmap(texture);
				this.imgSpr.addChild(bitmap);
				bitmap.width = s_w;
				bitmap.height = s_h;
				bitmap.x = par_x + RandomUtils.limit(1, 10);
				bitmap.y = par_y + RandomUtils.limit(1, 10);
				bitmap.name = `${par_x}_${par_y}`;

				pos++;
				this.imgArr.push({ _x: par_x, _y: par_y, _bitmap: bitmap });
			}
		}

		wy.Tools.removeFromParent(image);
		// for (){
		// }
	}

	private reset() {
		let len = this.imgArr.length;
		for (let i = 0; i < len; i++) {
			// this.imgArr[i]._bitmap.x = this.imgArr[i]._x;
			// this.imgArr[i]._bitmap.y = this.imgArr[i]._y;
			let img = this.imgArr[i],
				_bitmap = img._bitmap,
				_x = img._x,
				_y = img._y;
			egret.Tween.get(_bitmap).to({ x: _x, y: _y }, 1000, egret.Ease.backOut);
		}
		console.log('done');
	}

	public hide(): void {
		super.hide();

		this.imgSpr.touchEnabled = false;
		this.imgSpr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}

	private onTouchTap(e: egret.TouchEvent): void {
		switch (e.currentTarget) {
			case this.imgSpr:
				this.reset();
				break;
			default:
				break;
		}
	}
}