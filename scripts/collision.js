function collision (sx, offsetX, sy, offsetY) {
  // 计算传入两个精灵的碰撞矩形
  var x = {
    x: sx.x + offsetX.x,
    y: sx.y + offsetX.y,
    width: sx.width + offsetX.width,
    height: sx.height + offsetX.height
  };
  
  var y = {
    x: sy.x + offsetY.x,
    y: sy.y + offsetY.y,
    width: sy.width + offsetY.width,
    height: sy.height + offsetY.height
  };

  var xhw = x.width / 2, xhh = x.height / 2,
      yhw = y.width / 2, yhh = y.height / 2,
      xcx = x.x + xhw, xcy = x.y + xhh,
      ycx = y.x + yhw, ycy = y.y + yhh;
    
  if (Math.abs(ycx - xcx) <= yhw + xhw && Math.abs(ycy - xcy) <= yhh + xhh) {
    return { 
      one: x, two: y
    };
  } else return null;
}
