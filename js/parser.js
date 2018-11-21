function main_parser (prog) {
  var prog_stack = [];
  prog_stack.push(new Main_stmts());
  // arg_id : 現在の命令がどの引数のブロックか知るため
  var arg_id = null;
  // loopcount : ループのstartとendの対応が取れているか
  var loop_count = 0;
  // args : 関数呼び出しの引数がいくつかを覚えておく
  var args = [];
  for (var i = 0; i < prog.length; i++) {
    var stmts = prog_stack.pop();
    var block = prog[i];
    // console.log(block.type);
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
    } else if (block.type == "loop_start") {
      prog_stack.push(stmts);
      // block.n = 5;
      stmts = new Main_loop(block.n);
      stmts.push_stmt(block);
      loop_count++;
    } else if (block.type == "loop_end") {
      stmts.push_stmt(block);
      var p = prog_stack.pop();
      p.push_stmt(stmts);
      stmts = p;
      loop_count--;
    } else if (block.type == "func_id") {
      var fc = new Func_call(block.name);
      if (block.args != 0) {
        args.push(block.args);
        prog_stack.push(stmts);
        stmts = fc;
      } else {
        stmts.push_stmt(fc);
      }
    }
    // console.log(stmts);
    prog_stack.push(stmts);
  }

  if (loop_count != 0) {
    console.log("main error: loop_startとloop_endの対応が取れていない");
    return null;
  }
  return prog_stack.pop();
  /*
  var p = prog_stack.pop();
  console.log(p);
  return p;
  */
}

function func_parser (func_prog) {
  var prog_stack = [];
  prog_stack.push(new Func_stmts(func_prog.name));
  var arg_id = null;
  var prog = func_prog.prog;
  var loop_count = 0;
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
    } else if (block.type == "loop_start") {
      prog_stack.push(stmts);
      stmts = new Func_loop(block.n);
      loop_count++;
    } else if (block.type == "loop_end") {
      var p = prog_stack.pop();
      p.push_stmt(stmts);
      stmts = p;
      loop_count--;
    } else if (block.type == "func_call") {
      prog_stack.push(stmts);
      stmts = new Func_call(block.name);
    }
    prog_stack.push(stmts);
  }

  if (loop_count != 0) {
    console.log(func_prog.name + "error: loop_startとloop_endの対応が取れていない");
    return null;
  }
  return prog_stack.pop();
}