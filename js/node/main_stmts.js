var Main_stmts = function() {
  this.type = "main_stmts";
  this.stmts = [];
}

Main_stmts.prototype.push_stmt = function(stmt) {
  this.stmts.push(stmt);
}

Main_stmts.prototype.print_stmts = function() {
  console.log(this.stmts.length);
  for (var i = 0; i < this.stmts.length; i++) {
    this.stmts[i].display();
  }
}