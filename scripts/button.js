function Button (text) {
  PIXI.Container.call(this);

  this.graphics = new PIXI.Graphics();
  this.addChild(this.graphics);
  this.graphics.beginFill(0xff66a5);
  this.graphics.lineStyle(4, 0xffffff, 1);
  this.graphics.drawRoundedRect(4, 4, 170, 60, 10);

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
}

Button.prototype = Object.create(PIXI.Container.prototype);
