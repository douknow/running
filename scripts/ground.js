function Ground () {
  // 继承 PIXI.Container
  PIXI.Container.call(this);

  // 保存所有的地面块
  this.grounds = [];
  // 保存上一次位置（用于进行地面块的移动）
  this.prePositionX = 0;

  // 调用方法创建随机地面块
  this.createRandomGround();
}

// 继承 PIXI.Container
Ground.prototype = Object.create(PIXI.Container.prototype);

// 定义两个常量分别表示 方形地面 和 圆形地面
Ground.RECTANGLE = 1;
Ground.CRICLE = 2;

Ground.prototype.createRandomGround = function (x) {
  // 使参数 x 有效
  var x = x || -200;
  // 使用 for 循环创建一定量的随机样式的地面块
  for (var i = 0; i < 10; i++) {
    // 计算随机样式（方形 ground 或者圆形 ground）
    var type = Math.random() > .5 ? Ground.RECTANGLE : Ground.CRICLE;
    // 计算随机长度
    var spans = Math.floor(Math.random() * 10);
    // 计算随机高度
    var y = Math.floor(Math.random() * 300) + 100;

    // 固定设置第一块地面块的样式
    if (i === 0) {
      type = Ground.RECTANGLE;
      spans = 2;
      y = 120;
    }
    
    // 根据条件创建地面
    var ground = this.CreateGround(spans, type);
    // 设置地面块的位置
    ground.position.x = x;
    ground.position.y = y;
    // 设置碰撞矩形
    ground.offsetRect = {
      x: 88, y: 107, width: -185, height: -118
    };

    // 计算下一个地面块的位置
    x += ground.width;
    // 将创建好的地面块添加到 grounds 数组中
    this.grounds.push(ground);
  }
};

// 移动地面
Ground.prototype.moveByX = function (newPositionX) {
  // 计算两个位置之间的距离
  var distance = newPositionX - this.prePositionX;
  // 更新保存的上一次位置
  this.prePositionX = newPositionX;
  // 在每次更新地面块时遍历 grounds 数组
  this.grounds.forEach(function (ground, index) {
    // 移动每一个地面块
    ground.position.x -= distance;
    // 当地面超过左边边界时从舞台上移除
    if (ground.x + ground.width < 0 && ground.parent) {
      this.removeChild(ground);
    }
    // 当地面在画面中时 将其添加到舞台上
    if (ground.x < 800 && ground.x + ground.width > 0 && ground.parent === null) {
      this.addChild(ground);
    }

    // 如果最后一块地面 出现在画面中，则继续添加地面,以保证地图的无限长度
    if (index === this.grounds.length - 1 && ground.parent) {
      this.createRandomGround(ground.x + ground.width);
    }
  }.bind(this));
};

// 根据传入的参数构建小块 返回不同样式的 ground
Ground.prototype.CreateGround = function (spans, type) {
  // 如果没传入第二个参数则默认为方形低地面
  var type = type || RECTANGLE;
  
  // 定义一个容器变量用于承载地面块中的小块
  var container = new PIXI.Container();

  // 根据 type 值创建不同类型的地面块
  if (type === Ground.RECTANGLE) {
    var front = PIXI.Sprite.fromFrame('Tile_1.png');
    var back = PIXI.Sprite.fromFrame('Tile_3.png');

    // 方形地面比圆形地面多了下面的一层黑土
    var front_d = PIXI.Sprite.fromFrame('Tile_4.png');
    var back_d = PIXI.Sprite.fromFrame('Tile_6.png');
  } else if (type === Ground.CRICLE) {
    var front = PIXI.Sprite.fromFrame('Tile_10.png');
    var back = PIXI.Sprite.fromFrame('Tile_12.png');
  }
  
  // 将创建好的块添加到 Container 中
  container.addChild(front);

  // 如果有黑色土地块，则添加到 Contaienr 中
  if (front_d) {
    front_d.position.y = front.y + front.height;
    container.addChild(front_d);
  }
  
  // 根据传入的 span 值创建一定数量的中间块
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

  // 如果黑色土地块存在则添加
  if (back_d) {
    back_d.position.x = back.x;
    back_d.position.y = back.y + back.height;
    container.addChild(back_d);
  }
  return container;
};
