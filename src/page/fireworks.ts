class fireworks extends wy.BaseSprite {
	/**
	 * constructor
	 */
	public constructor() {
		super();

		// bg
		let bg = wy.Tools.createSprBtn(0, 0, 640, 1236, 0xffffff, 1);
		this.addChild(bg);
		bg.touchEnabled = true;
		bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shoot, this);

		// draw fireworks
		this.draworks();
	}

	/**
	 * @description 发射 
	 * @author Lair
	 * @date 2019-03-06
	 * @private
	 * @memberof fireworks
	 */
	private shoot() {
		this.draworks();
	}

	/**
	 * @description 创建烟花
	 * @author Lair
	 * @date 2019-03-06
	 * @private
	 * @memberof firewroks
	 */
	private draworks() {
		let rocket: egret.Shape = new egret.Shape();
		rocket.graphics.beginFill(0, 1);
		rocket.graphics.drawCircle(0, 0, 10);
		rocket.graphics.endFill();
		rocket.x = 320;
		rocket.y = 1000;
		this.addChild(rocket);

		egret.Tween.get(rocket).to({ y: 300 }, 1000)
			.to({ alpha: 0 })
			.call(() => {
				console.log(`${this.y},${rocket.y}`);
				this.boom(rocket.x, rocket.y);
			}, this);
	}

	/**
	 * @description 烟花炸开效果
	 * @author Lair
	 * @date 2019-03-06
	 * @private
	 * @param {number} _x
	 * @param {number} _y
	 * @memberof fireworks
	 */
	private boom(_x: number, _y: number) {
		console.log(`boom`);
		let ran_num = RandomUtils.limitInteger(20, 40);
		// let ran_num = 3;

		for (let i = 0; i < ran_num; i++) { }

		let craate_num = 0;
		let create_key = setInterval(() => {
			console.log(`${create_key}`);
			update();
			craate_num > ran_num ? clearInterval(create_key) : craate_num++;
		}, 20)
		console.log(`-----${create_key}`);

		const self = this;
		function update() {
			let ceil = create();
			self.addChild(ceil);
			move(ceil);
		}

		function create(): egret.Shape {
			let ran_raduis = RandomUtils.limitInteger(10, 20)

			let ceil: egret.Shape = new egret.Shape();
			ceil.graphics.beginFill(0xff0000, 1);
			ceil.graphics.drawCircle(0, 0, ran_raduis);
			ceil.graphics.endFill();
			ceil.x = _x;
			ceil.y = _y;

			return ceil;
		}

		function move(ceil: egret.Shape) {
			// 随机位置发射
			// let ran_x = RandomUtils.limitInteger(-200, 200);
			// let ran_y = RandomUtils.limitInteger(-200, 200);
			// egret.Tween.get(ceil).to({ x: _x + ran_x, y: _y + ran_y, scaleX: 0, scaleY: 0 }, 1000);

			// 以烟花的位置为中心呈圆形炸开
			let ran_range: number = RandomUtils.limitInteger(100, 200); 		// 随机爆炸范围
			let speed: number = 2;												// 爆炸初速度
			let gravity: number = 0.2;
			let shrink: number = Math.random() * 0.05 + 0.93;
			let resistance: number = 1;											// 爆炸衰减速度，大于1则为加速度
			let ran_angle: number = Math.random() * Math.PI * 2; 				// 随机弧度
			let speed_x: number = Math.cos(ran_angle) * speed;					// 横向速度
			let speed_y: number = Math.sin(ran_angle) * speed;					// 纵向向速度

			let num = 0;
			let run_key = setInterval(() => {
				ceil.x += speed_x * resistance;
				ceil.y += speed_y * resistance;

				ceil.y += gravity;

				ceil.scaleX *= shrink;
				ceil.scaleY *= shrink;

				// console.log(`${num}`);
				num > 100 ? clearInterval(run_key) : num++;
			}, 30)
		}
	}
}