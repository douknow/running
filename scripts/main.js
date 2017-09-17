function Main () {
  // 创建“舞台对象”
  this.stage = new PIXI.Container();
  // 根据浏览器支持情况自动创建渲染器
  this.renderer = PIXI.autoDetectRenderer(
    800,
    600,
    { view: document.getElementById('canvas') }
  );
  // 保存游戏循环状态
  this.requestAnimationFrameId;
  
  // 控制游戏开始及结束
  this.game = new Game(this);

  // 调用资源加载函数
  this.loadImages();
}

// 加载游戏中的资源文件
Main.prototype.loadImages = function () {
  // 创建加载器对象
  var loader = new PIXI.loaders.Loader();
  // 添加需要加载的图片文件
  loader.add('background', './images/background.png')
        .add('Tile', './images/ground.json')
        .add('role', './images/role.json');
  // 开始加载，并在加载完成后调用 init 函数
  loader.load(this.init.bind(this));
};

// 游戏初始化
Main.prototype.init = function () {
  // 保存当前位置
  this.positionX = 0;
  // 初始化速度
  this.speed = 8;  
  
  // 创建背景图属性，并添加到舞台上
  this.background = new Background();
  this.stage.addChild(this.background);

  // 创建地面,并添加到舞台
  this.ground = new Ground();
  this.stage.addChild(this.ground);
  // 保存对 grounds 的引用
  this.grounds = this.ground.grounds;
  
  // 创建角色， 并添加到舞台
  this.role = new Role(this.grounds);
  this.stage.addChild(this.role);

  // 判断当前循环状态，避免在游戏重新开始时创建重复的循环
  if (!this.requestAnimationFrameId) this.update();
};

Main.prototype.update = function () {
  // 使用 requestAnimationFrame 函数进行游戏循环
  this.requestAnimationFrameId = requestAnimationFrame(this.update.bind(this));
  
  // 渲染舞台
  this.renderer.render(this.stage);

  // 判断游戏状态
  switch(this.game.status) {
    // 准备开始状态
    case Game.READY:
      // 调用 game 属性的准备函数
      this.game.ready(this.stage);
      break;
    case Game.RUN:
      // 修改距离
      this.speed += .01;
      // 限制最大速度
      if (this.speed > 25) this.speed = 20;
      // 计算新的距离并取整
      this.positionX = Math.floor(this.positionX += this.speed);
    
      // 移动背景
      this.background.moveByX(this.positionX);
    
      // 移动地面
      this.ground.moveByX(this.positionX);
    
      // 更新角色
      this.role.update(this.game);
      break;
    case Game.OVER:
      // 调用 game 属性的 gameOver 函数
      this.game.gameOver(this.stage, this.positionX);
      break;
    default:
      break;
  }
};
