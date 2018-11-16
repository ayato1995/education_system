class Func_loop {
  constractor(n) {
    this.type = "func_loop";
    this.n = n;
    this.stmts;
  }

  set_stmts(stmts) {
    this.stmts = stmts;
  }

  get_stmts() {
    return this.stmts;
  }
}