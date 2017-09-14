function Role (grounds) {
  PIXI.Container.call(this);
  this.grounds = grounds;

  this.x = 30;

  // 设置碰撞矩形
  this.offsetRect = {
    x: 5, y: 0, width: -5, height: 0
  };

  this.speedY = 0;
  this.gracity = 2.7;
  
  // 显示当前角色
  this.scale.set(1.5);
  // 保存角色的所有状态
  this.statuses = [];
  // 保存角色当前状态
  this.status;

  this.isCollision = null;

  this.init();
  this.addKeyListener();
  this.addAllStatuses();
  
  this.jumping();
}

Role.prototype = Object.create(PIXI.Container.prototype);

Role.JUMP = 2;
Role.RUN = 3;

Role.prototype.update = function (game) {
  this.speedY += this.gracity;
  
  this.position.y += this.speedY;

  // 当角色的 y 坐标大于600时 视为游戏结束
  if (this.y > 600) {
    game.over();
  }
  this.getCollisiopn();

  // 切换为跳跃状态
  if (this.speedY > 0) {
    this.jumping();
  }
};

Role.prototype.addAllStatuses = function () {
  this.statuses.forEach(function (status) {
    this.addChild(status);
  }.bind(this));
};

// 切换为跑步状态
Role.prototype.running = function () {
  this.hideOtherStatus(this.run);
  this.status = Role.RUN;
};

// 切换为跳跃状态
Role.prototype.jumping = function () {
  this.hideOtherStatus(this.jump);
  this.status = Role.JUMP;
};

// 角色状态初始化
Role.prototype.init = function () {
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
  this.isCollision = null;
  this.grounds.forEach(function (ground) {
    if (ground.parent && this.isCollision === null) {
      this.isCollision = collision(this, this.offsetRect, ground, ground.offsetRect);
    }
  }.bind(this));
  if (this.isCollision) {
    if (this.isCollision.one.x + this.isCollision.one.width >= this.isCollision.two.x && this.isCollision.one.y < this.isCollision.two.y) {
      // 设置碰撞时角色的速度  和   正确位置
      this.speedY = 0;
      this.y = this.isCollision.two.y - this.isCollision.one.height;
      if (this.status === Role.JUMP) {
        this.running();
      }
    } else {
      // 撞上了，
      this.x = this.isCollision.two.x - this.isCollision.one.width;
    }
  }
};

// 添加键盘控制
Role.prototype.addKeyListener = function () {
  window.addEventListener('keypress', function (key) {
    if (key.keyCode === 32 && this.status === Role.RUN) {
      this.jumping();
      this.speedY = -40;
    }
  }.bind(this), false);
};
