class Func_arg {
  constractor() {
    this.args = [];
  }

  set_stmt(id, stmts) {
    this.args[id] = stmts;
  }

  get_stmt(id) {
    return this.args[id];
  }

  is_args_empty() {
    if (this.args.lenght == 0)
      return true;
    return false;
  }
}