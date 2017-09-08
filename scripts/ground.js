function Ground (stage) {
  this.stage = stage;
  this.grounds = [];

  this.CreateCricleGround(2, Ground.RECTANGLE);

  this.addToStage();
}

Ground.RECTANGLE = 1;
Ground.CRICLE = 2;

// 把所有的 ground 添加到舞台上
Ground.prototype.addToStage = function () {
  this.grounds.forEach(function (ground) {
    this.stage.addChild(ground);
  }.bind(this));
};

// 根据传入的参数构建小块 ground 并添加到 grounds 数组中
Ground.prototype.CreateCricleGround = function (spans, type) {
  var type = type || 1;
  
  var container = new PIXI.Container();

  if (type === Ground.RECTANGLE) {
    var front = PIXI.Sprite.fromFrame('Tile_1.png');
    var center = PIXI.Sprite.fromFrame('Tile_2.png');
    var back = PIXI.Sprite.fromFrame('Tile_3.png');
  } else if (type === Ground.CRICLE) {
    var front = PIXI.Sprite.fromFrame('Tile_1.png');
    var center = PIXI.Sprite.fromFrame('Tile_2.png');
    var back = PIXI.Sprite.fromFrame('Tile_3.png');
  }
  
  container.addChild(front);
  center.position.x = front.x;
  for (var i = 0; i < spans; i++) {
    center.position.x = center.x + center.width * i;
    container.addChild(center);
  }
  back.position.x = spans * center.width;
  container.addChild(back);
  this.grounds.push(container);
};
