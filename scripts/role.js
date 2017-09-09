function Role (stage, grounds) {
  this.stage = stage;
  this.grounds = grounds;

  this.speedY = 0;
  this.gracity = 10;
  
  // 显示当前角色
  this.container = new PIXI.Container();
  this.container.scale.set(1.5, 1.5);
  // 保存角色的所有状态
  this.statuses = [];

  this.init();
  this.addToStage();
  this.jumping();
}

Role.prototype.update = function () {
  this.speedY += this.gracity;
  
  this.getCollisiopn();
  this.container.position.y += this.speedY;
};

Role.prototype.addToStage = function () {
  this.statuses.forEach(function (status) {
    this.container.addChild(status);
  }.bind(this));
  this.stage.addChild(this.container);
};

// 切换为站立状态
Role.prototype.standing = function () {
  this.hideOtherStatus(this.stand);
};

// 切换为跑步状态
Role.prototype.running = function () {
  this.hideOtherStatus(this.run);
};

// 切换为跳跃状态
Role.prototype.jumping = function () {
  this.hideOtherStatus(this.jump);
};

// 角色状态初始化
Role.prototype.init = function () {
  // 创建站立状态
  this.stand = PIXI.Sprite.fromFrame('role_1.png');
  this.statuses.push(this.stand);

  // 创建跳跃状态
  this.jump = PIXI.Sprite.fromFrame('role_2.png');
  this.statuses.push(this.jump);

  // 创建跑步状态
  var textures = [];
  for (var i = 1; i <= 4; i++) {
    textures.push(PIXI.Texture.fromFrame('role_' + i + '.png'));
  }
  this.run = new PIXI.extras.AnimatedSprite(textures);
  this.run.play();
  this.statuses.push(this.run);
};

// 隐藏其他的状态
Role.prototype.hideOtherStatus = function (status) {
  this.statuses.forEach(function (s) {
    if (s !== status) s.visible = false;
    else s.visible = true;
  }.bind(this));
};

// 判断角色是否与地面发生了碰撞
Role.prototype.getCollisiopn = function () {
  this.grounds.forEach(function (ground) {
    if (ground.visible && collision(this.container, ground)) {
      this.speedY = 0;
    }
  }.bind(this));
};
