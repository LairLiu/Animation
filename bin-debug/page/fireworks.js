var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fireworks = (function (_super) {
    __extends(fireworks, _super);
    /**
     * constructor
     */
    function fireworks() {
        var _this = _super.call(this) || this;
        // bg
        var bg = wy.Tools.createSprBtn(0, 0, 640, 1236, 0xffffff, 1);
        _this.addChild(bg);
        bg.touchEnabled = true;
        bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.shoot, _this);
        // draw fireworks
        _this.draworks();
        return _this;
    }
    /**
     * @description 发射
     * @author Lair
     * @date 2019-03-06
     * @private
     * @memberof fireworks
     */
    fireworks.prototype.shoot = function () {
        this.draworks();
    };
    /**
     * @description 创建烟花
     * @author Lair
     * @date 2019-03-06
     * @private
     * @memberof firewroks
     */
    fireworks.prototype.draworks = function () {
        var _this = this;
        var rocket = new egret.Shape();
        rocket.graphics.beginFill(0, 1);
        rocket.graphics.drawCircle(0, 0, 10);
        rocket.graphics.endFill();
        rocket.x = 320;
        rocket.y = 1000;
        this.addChild(rocket);
        egret.Tween.get(rocket).to({ y: 300 }, 1000)
            .to({ alpha: 0 })
            .call(function () {
            console.log(_this.y + "," + rocket.y);
            _this.boom(rocket.x, rocket.y);
        }, this);
    };
    /**
     * @description 烟花炸开效果
     * @author Lair
     * @date 2019-03-06
     * @private
     * @param {number} _x
     * @param {number} _y
     * @memberof fireworks
     */
    fireworks.prototype.boom = function (_x, _y) {
        console.log("boom");
        var ran_num = RandomUtils.limitInteger(20, 40);
        // let ran_num = 3;
        for (var i = 0; i < ran_num; i++) { }
        var craate_num = 0;
        var create_key = setInterval(function () {
            console.log("" + create_key);
            update();
            craate_num > ran_num ? clearInterval(create_key) : craate_num++;
        }, 20);
        console.log("-----" + create_key);
        var self = this;
        function update() {
            var ceil = create();
            self.addChild(ceil);
            move(ceil);
        }
        function create() {
            var ran_raduis = RandomUtils.limitInteger(10, 20);
            var ceil = new egret.Shape();
            ceil.graphics.beginFill(0xff0000, 1);
            ceil.graphics.drawCircle(0, 0, ran_raduis);
            ceil.graphics.endFill();
            ceil.x = _x;
            ceil.y = _y;
            return ceil;
        }
        function move(ceil) {
            // 随机位置发射
            // let ran_x = RandomUtils.limitInteger(-200, 200);
            // let ran_y = RandomUtils.limitInteger(-200, 200);
            // egret.Tween.get(ceil).to({ x: _x + ran_x, y: _y + ran_y, scaleX: 0, scaleY: 0 }, 1000);
            // 以烟花的位置为中心呈圆形炸开
            var ran_range = RandomUtils.limitInteger(100, 200); // 随机爆炸范围
            var speed = 2; // 爆炸初速度
            var gravity = 0.2;
            var shrink = Math.random() * 0.05 + 0.93;
            var resistance = 1; // 爆炸衰减速度，大于1则为加速度
            var ran_angle = Math.random() * Math.PI * 2; // 随机弧度
            var speed_x = Math.cos(ran_angle) * speed; // 横向速度
            var speed_y = Math.sin(ran_angle) * speed; // 纵向向速度
            var num = 0;
            var run_key = setInterval(function () {
                ceil.x += speed_x * resistance;
                ceil.y += speed_y * resistance;
                ceil.y += gravity;
                ceil.scaleX *= shrink;
                ceil.scaleY *= shrink;
                // console.log(`${num}`);
                num > 100 ? clearInterval(run_key) : num++;
            }, 30);
        }
    };
    return fireworks;
}(wy.BaseSprite));
__reflect(fireworks.prototype, "fireworks");
