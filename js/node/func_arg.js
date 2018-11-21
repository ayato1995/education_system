var Func_arg = function() {
  this.type = "func_arg";
  this.stmts = [];
}

Func_arg.prototype.push_stmts = function(stmt) {
  this.stmts.push(stmt);
}

Func_arg.prototype.display = function() {
  for (var i = 0; i < this.stmts.length; i++) {
    this.stmts[i].display();
  }
}