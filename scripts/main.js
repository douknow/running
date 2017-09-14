function Main () {
  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(
    800,
    600,
    { view: document.getElementById('canvas') }
  );
  this.requestAnimationFrameId;
  
  this.game = new Game(this);

  this.loadImages();
}

// 加载游戏中的资源文件
Main.prototype.loadImages = function () {
  var loader = new PIXI.loaders.Loader();
  loader.add('background', './images/background.png')
        .add('Tile', './images/ground.json')
        .add('role', './images/role.json');
  loader.load(this.init.bind(this));
};

// 游戏初始化
Main.prototype.init = function () {
  // 保存当前位置
  this.positionX = 0;
  this.speed = 8;  
  
  this.background = new Background();
  this.stage.addChild(this.background);

  // 创建地面
  this.ground = new Ground();
  this.stage.addChild(this.ground);
  this.grounds = this.ground.grounds;
  
  // 创建角色
  this.role = new Role(this.grounds);
  this.stage.addChild(this.role);

  if (!this.requestAnimationFrameId) this.update();
};

Main.prototype.update = function () {
  this.requestAnimationFrameId = requestAnimationFrame(this.update.bind(this));
  
  // 渲染舞台
  this.renderer.render(this.stage);

  switch(this.game.status) {
    case Game.READY:
      this.game.ready(this.stage);
      break;
    case Game.RUN:
      // 修改距离
      this.speed += .01;
      if (this.speed > 25) this.speed = 20;
      this.positionX = Math.floor(this.positionX += this.speed);
    
      // 移动背景
      this.background.moveByX(this.positionX);
    
      // 移动地面
      this.ground.moveByX(this.positionX);
    
      // 更新角色
      this.role.update(this.game);
      break;
    case Game.OVER:
      // gameover
      this.game.gameOver(this.stage, this.positionX);
      break;
    default:
      break;
  }
};
