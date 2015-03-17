
  pg._save = function() {
    ctx.save();
    // set default colors
  //  ctx.fillStyle = '#fff';
 //   ctx.strokeStyle = '#000';
  };

  pg._restore = function() {
    ctx.restore();
  };

  
  return pg;
}