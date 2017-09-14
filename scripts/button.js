function Button (text, click) {
  PIXI.Container.call(this);

  this.click = click;

  this.interactive = true;
  this.buttonMode = true;

  this.graphics = new PIXI.Graphics();
  this.addChild(this.graphics);
  this.graphics.beginFill(0xff66a5);
  this.graphics.lineStyle(4, 0xffffff, 1);
  this.graphics.drawRoundedRect(4, 4, 170, 60, 10);

  // 按钮中字体样式
  this.style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 26,
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
  });
  this.text = new PIXI.Text(text, this.style);
  this.text.x = this.width / 2 - this.text.width / 2;
  this.text.y = this.height / 2 - this.text.height / 2;

  this.addChild(this.text);

  // 设置坐标及缩放中心
  this.pivot.x = this.width / 2;
  this.pivot.y = this.height / 2;

  this.addSomeEvent();
}

Button.prototype = Object.create(PIXI.Container.prototype);

// 添加事件
Button.prototype.addSomeEvent = function () {
  this.on('click', function () {
    // 重新开始游戏
    this.click();
  }.bind(this));

  this.on('mouseover', function () {
    this.scale.set(1.1);
  }.bind(this));

  this.on('mouseout', function () {
    this.scale.set(1);
  }.bind(this));
};
