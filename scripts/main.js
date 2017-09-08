function Main () {
  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(
    800,
    600,
    { view: document.getElementById('canvas') }
  );

  // 保存当前位置
  this.positionX = 0;
  
  this.loadImages();  
}

// 加载游戏中的资源文件
Main.prototype.loadImages = function () {
  var loader = new PIXI.loaders.Loader();
  loader.add('background', './images/background.png')
        .add('Tile', './images/ground.json');
  loader.load(this.init.bind(this));
};

// 游戏初始化
Main.prototype.init = function () {
  this.background = new Background();
  this.stage.addChild(this.background);

  // test
  this.ground = new Ground(this.stage);

  this.update();
};

Main.prototype.update = function () {
  // 渲染舞台
  this.renderer.render(this.stage);

  // 修改距离，进行移动
  this.positionX += 10;
  this.background.moveByX(this.positionX);

  requestAnimationFrame(this.update.bind(this));
};
