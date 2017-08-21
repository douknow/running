function Background () {
  var backTexture = PIXI.Texture.fromImage('./images/Background.png');
  PIXI.extras.TilingSprite.call(this, backTexture, 800, 600);

  this.oldPositionX = 0;
}

Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Background.prototype.moveByX = function (newPositionX) {
  var distance = newPositionX - this.oldPositionX;
  this.tilePosition.x -= distance;
  this.oldPositionX = newPositionX;
}
