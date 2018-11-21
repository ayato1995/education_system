function main_parser (prog) {
  var prog_stack = [];
  prog_stack.push(new Main_stmts());
  var arg_id = null;
  for (var i = 0; i < prog.length; i++) {
    var stmts = prog_stack.pop();
    var block = prog[i];
    if (arg_id != block.get_arg_id()) {
      var call = prog_stack.pop();
      call.set_arg(arg_id, stmts);
      stmts = call;
    }
    arg_id = block.get_arg_id();
    if (arg_id != null) {
      prog_stack.push(stmts);
      stmts = new Func_arg(arg_id);
    }
    if (block.type == "advance") {
      stmts.push_stmt(new Up());
    } else if (block.type == "rotate_right") {
      stmts.push_stmt(new Rotate_right());
    } else if (block.type == "rotate_left") {
      stmts.push_stmt(new Rotate_left());
    } else if (block.type == "main_loop_start") {
      prog_stack.push(stmts);
      stmts = new Main_loop(block.n);
    } else if (block.type == "main_loop_end") {
      var p = prog_stack.pop();
      p.push(stmts);
      stmts = p;
    } else if (block.type == "func_call") {
      prog_stack.push(stmts);
      stmts = new Func_call(block.name);
    }
    // console.log(stmts);
    prog_stack.push(stmts);
  }

  return prog_stack.pop();
}

function func_parser (func_prog) {
  var prog_stack = [];
  prog_stack.push(new Func_stmts(func_prog.name));
  var arg_id = null;
  var prog = func_prog.prog;
  for (var i = 0; i < prog.length; i++) {
    var stmts = prog_stack.pop();
    var block = main_prog[i];
    if (arg_id != block.get_arg_id()) {
      var call = prog_stack.pop();
      call.set_arg(arg_id, stmts);
      stmts = call;
    }
    arg_id = block.get_arg_id();
    if (arg_id != null) {
      prog_stack.push(stmts);
      stmts = new Func_arg(arg_id);
    }
    if (block.type == "advance") {
      stmts.push_stmt(new Up());
    } else if (block.type == "rotate_right") {
      stmts.push_stmt(new Rotate_right());
    } else if (block.type == "rotate_left") {
      stmts.push_stmt(new Rotate_left());
    } else if (block.type == "func_loop_start") {
      prog_stack.push(stmts);
      stmts = new Func_loop(block.n);
    } else if (block.type == "func_loop_end") {
      var p = prog_stack.pop();
      p.push(stmts);
      stmts = p;
    } else if (block.type == "func_call") {
      prog_stack.push(stmts);
      stmts = new Func_call(block.name);
    }
    prog_stack.push(stmts);
  }

  return prog_stack.pop();
}