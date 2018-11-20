var Main_stmts = function() {
  this.type = "main_stmts";
  this.stmts = [];
}

Main_stmts.prototype.push_stmt = function(stmt) {
  this.stmts.push(stmt);
}