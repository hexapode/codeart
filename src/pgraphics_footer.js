
  pg._save = function() {
    ctx.save();

  };

  pg._restore = function() {
    ctx.restore();
  };
  
  return pg;
}