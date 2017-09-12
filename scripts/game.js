function Game () {
  this.game = true;
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

Game.prototype.over = function () {
  this.game = false;
};

Game.prototype.drawGameOverText = function (stage, positionX) {
  if (!this.gameoverText.parent) {
    this.score = positionX / 2;
    this.gameoverText.text = '游戏结束\n得分：' + this.score;
    this.gameoverText.x = 400 - this.gameoverText.width / 2;
    this.gameoverText.y = 300 - this.gameoverText.height;
    stage.addChild(this.gameoverText);
  }
};
