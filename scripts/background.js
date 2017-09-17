function Background () {
  // 从图片加载纹理
  var backTexture = PIXI.Texture.fromImage('background');
  // 继承 PIXI.TilingSprite 类
  PIXI.extras.TilingSprite.call(this, backTexture, 800, 600);

  // 保存上一次位置
  this.oldPositionX = 0;
}

// 继承 PIXI.extras.TilingSprite
Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Background.prototype.moveByX = function (newPositionX) {
  // 计算出两次位置之间的距离
  var distance = newPositionX - this.oldPositionX;
  // 对背景位置进行移动
  this.tilePosition.x -= distance * .09;
  // 更新保存的上一次位置
  this.oldPositionX = newPositionX;
};
