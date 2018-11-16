class Func_call {
  constractor(id) {
    this.type = "func_call";
    this.func_id = id;
    this.arg = new Func_arg();
  }

  is_arg_empty() {
    return this.args.is_args_empty();
  }

  set_arg(id, stmts) {
    this.arg.set_stmt(id, stmts);
  }

  get_arg(id) {
    return this.arg.get_stmt(id);
  }
}