function Main () {
  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(
    800,
    600,
    { view: document.getElementById('canvas') }
  );

  this.background = new Background();
  this.stage.addChild(this.background);

  // 保存当前位置
  this.positionX = 0;

  this.update();
}

Main.prototype.update = function () {
  // 渲染舞台
  this.renderer.render(this.stage);

  // 修改距离，进行移动
  this.positionX += 10;
  this.background.moveByX(this.positionX);

  requestAnimationFrame(this.update.bind(this));
};
