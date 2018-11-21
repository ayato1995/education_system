var Main_loop = function(n) {
  this.type = "main_loop";
  this.stmts = [];
  this.n = n;
}

Main_loop.prototype.push_stmt = function(stmt) {
  this.stmts.push(stmt);
}

Main_loop.prototype.print_stmts = function() {
  console.log(this.type + " : " + this.stmts.lenght);
  console.log("loop count : " + this.n);
  for (var i = 0; i < this.stmts.lenght; i++) {
    if (this.stmts[i].type == "main_loop" ||
      this.stmts[i].type == "main_stmts") {
      this.stmts[i].print_stmts();
    } else {
      this.stmts[i].display();
    }
  }
  console.log("loop end");
}