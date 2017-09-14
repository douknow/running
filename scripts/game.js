function Game (main) {
  this.status = Game.READY;
  this.main = main;
  this.score = 0;

  this.style = new PIXI.TextStyle({
    // 字体
    fontFamily: 'Arial',
    // 字体大小
    fontSize: 36,
    // 斜体
    fontStyle: 'italic',
    // 加粗
    fontWeight: 'bold',
    // 文字填充颜色为渐变填充
    fill: ['#ffffff', '#00ff99'], // gradient
    // 描边颜色
    stroke: '#4a1850',
    // 描边粗细
    strokeThickness: 5,
    // 文字阴影
    dropShadow: true,
    // 阴影颜色
    dropShadowColor: '#000000',
    // 阴影模糊值
    dropShadowBlur: 4,
    // 阴影偏移角度
    dropShadowAngle: Math.PI / 6,
    // 阴影距离
    dropShadowDistance: 6,
    // 文字设置为换行
    wordWrap: true,
    // 文字换行宽度
    wordWrapWidth: 440,
    align: 'center'
  });

  this.gameoverText = new PIXI.Text('', this.style);
}

Game.READY = 0;
Game.RUN = 1;
Game.OVER = 2;

Game.prototype.over = function () {
  this.status = Game.OVER;
};

Game.prototype.ready = function () {
  if (!this.readyText) {
    this.readyText = new PIXI.Text('按空格键开始游戏以及进行跳跃', this.style);
    this.readyText.anchor.set(.5);
    this.readyText.position.set(400, 300);

    window.addEventListener('keydown', function (key) {
      if (key.keyCode === 32 && this.status === Game.READY) {
        this.status = Game.RUN;
        this.main.stage.removeChild(this.readyText);
      }
    }.bind(this), false);
    
    this.main.stage.addChild(this.readyText);
  }
};

Game.prototype.gameOver = function (stage, positionX) {
  if (!this.gameoverText.parent) {
    this.score = positionX / 2;
    this.gameoverText.text = '游戏结束\n得分：' + this.score;
    this.gameoverText.x = 400 - this.gameoverText.width / 2;
    this.gameoverText.y = 300 - this.gameoverText.height;
    this.main.stage.addChild(this.gameoverText);

    var restartButton = new Button('重新开始', this.restart.bind(this));
    restartButton.x = 400;
    restartButton.y = 300 + 50;
    stage.addChild(restartButton);
  }
};

Game.prototype.restart = function () {
  this.main.stage.removeChildren();
  this.status = Game.RUN;
  this.main.init();
};
