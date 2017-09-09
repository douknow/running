function collision (x, y) {
  var xhw = x.width / 2, xhh = x.height / 2,
      yhw = y.width / 2, yhh = y.height / 2,
      xcx = x.x + xhw, xcy = x.y + xhh,
      ycx = y.x + yhw, ycy = y.y + yhh;
    
  if (Math.abs(ycx - xcx) < yhw + xhw && Math.abs(ycy - xcy) < yhh + xhh) {
    return true;
  }
}
