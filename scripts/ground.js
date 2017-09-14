function Ground () {
  PIXI.Container.call(this);

  this.grounds = [];
  this.prePositionX = 0;

  this.createRandomGround();
}

Ground.prototype = Object.create(PIXI.Container.prototype);

Ground.RECTANGLE = 1;
Ground.CRICLE = 2;

Ground.prototype.createRandomGround = function (x) {
  var x = x || -200;
  for (var i = 0; i < 10; i++) {
    // 计算随机样式（方形 ground 或者圆形 ground）
    var type = Math.random() > .5 ? Ground.RECTANGLE : Ground.CRICLE;
    // 计算随机长度
    var spans = Math.floor(Math.random() * 10);
    var y = Math.floor(Math.random() * 300) + 100;

    if (i === 0) {
      type = Ground.RECTANGLE;
      spans = 2;
      y = 120;
    }
    
    // 根据条件创建地面
    var ground = this.CreateGround(spans, type);
    ground.position.x = x;
    ground.position.y = y;
    // 设置碰撞矩形
    ground.offsetRect = {
      x: 88, y: 107, width: -185, height: -118
    };

    x += ground.width;
    this.grounds.push(ground);
  }
};

// 移动地面
Ground.prototype.moveByX = function (newPositionX) {
  var distance = newPositionX - this.prePositionX;
  this.prePositionX = newPositionX;
  this.grounds.forEach(function (ground, index) {
    ground.position.x -= distance;
    // 当地面超过左边边界时从舞台上移除
    if (ground.x + ground.width < 0 && ground.parent) {
      this.removeChild(ground);
    }
    // 当地面在画面中时 将其添加到舞台上
    if (ground.x < 800 && ground.x + ground.width > 0 && ground.parent === null) {
      this.addChild(ground);
    }

    // 如果最后一块地面 出现在画面中，则继续添加地面
    if (index === this.grounds.length - 1 && ground.parent) {
      this.createRandomGround(ground.x + ground.width);
    }
  }.bind(this));
};

// 根据传入的参数构建小块 返回不同样式的 ground
Ground.prototype.CreateGround = function (spans, type) {
  var type = type || 1;
  
  var container = new PIXI.Container();

  if (type === Ground.RECTANGLE) {
    var front = PIXI.Sprite.fromFrame('Tile_1.png');
    var back = PIXI.Sprite.fromFrame('Tile_3.png');

    var front_d = PIXI.Sprite.fromFrame('Tile_4.png');
    var back_d = PIXI.Sprite.fromFrame('Tile_6.png');
  } else if (type === Ground.CRICLE) {
    var front = PIXI.Sprite.fromFrame('Tile_10.png');
    var back = PIXI.Sprite.fromFrame('Tile_12.png');
  }
  
  container.addChild(front);

  if (front_d) {
    front_d.position.y = front.y + front.height;
    container.addChild(front_d);
  }
  
  for (var i = 0; i < spans; i++) {
    if (type === Ground.RECTANGLE) {
      var center = PIXI.Sprite.fromFrame('Tile_2.png');
      var center_d = PIXI.Sprite.fromFrame('Tile_5.png');
    } else if (type === Ground.CRICLE) {
      var center = PIXI.Sprite.fromFrame('Tile_11.png');
    }
    center.position.x = front.width + i * center.width;
    container.addChild(center);
    if (center_d) {
      center_d.position.y = center.y + center.height;
      center_d.position.x = center.x;
      container.addChild(center_d);
    }
  }
  
  // 计算尾块位置
  spans > 0 ? back.position.x = front.width + spans * center.width : back.position.x = front.width;
  container.addChild(back);

  if (back_d) {
    back_d.position.x = back.x;
    back_d.position.y = back.y + back.height;
    container.addChild(back_d);
  }
  return container;
};
