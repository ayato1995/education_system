var Func_arg = function(id) {
  this.type = "func_arg";
  this.id = id;
  this.stmts = [];
}

Func_arg.prototype.get_id = function() {
  return this.id;
}

Func_arg.prototype.push_stmt = function(stmt) {
  this.stmts.push(stmt);
}

Func_arg.prototype.get_stmts = function() {
  return this.stmts;
}

Func_arg.prototype.get_stmt = function(i) {
  return this.stmts[i];
}

Func_arg.prototype.get_stmts_length = function() {
  return this.stmts.length;
}

Func_arg.prototype.display = function() {
  console.log("arg" + this.id);
  for (var i = 0; i < this.stmts.length; i++) {
    this.stmts[i].display();
  }
}