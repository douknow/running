function Ground (stage) {
  this.stage = stage;
  this.grounds = [];

  this.CreateCricleGround(2);

  this.addToStage();
}

Ground.prototype.addToStage = function () {
  this.grounds.forEach(function (ground) {
    this.stage.addChild(ground);
  }.bind(this));
};

Ground.prototype.CreateCricleGround = function (spans) {
  var container = new PIXI.Container();
  var front = PIXI.Sprite.fromFrame('Tile_1.png');
  var center = PIXI.Sprite.fromFrame('Tile_2.png');
  center.position.x = front.x;
  var back = PIXI.Sprite.fromFrame('Tile_3.png');

  container.addChild(front);
  for (var i = 0; i < spans; i++) {
    center.position.x = center.x + center.width * i;
    container.addChild(center);
  }
  back.position.x = spans * center.width;
  container.addChild(back);
  this.grounds.push(container);
};

Ground.prototype.getSpriteType = function (type) {
  var i = 0;
  switch (type) {
    case GROUND_TYPE.CRILE_LEFT:
      i = 1;
      break;
    case GROUND_TYPE.CRILE_CENTER:
      i = 2;
      break;
    case GROUND_TYPE.CRILE_RIGHT:
      i = 3;
      break;
    case GROUND_TYPE.RECT_LEFT:
      break;
    case GROUND_TYPE.RECT_CENTER:
      break;
    case GROUND_TYPE.RECT_RiGHT:
      break;
    default:
      break;
  }
  var image_name = "Tile_" + i + ".png";
  return PIXI.Sprite.fromFrame(image_name);
};
