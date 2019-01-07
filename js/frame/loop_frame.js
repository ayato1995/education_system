var Loop_frame = function(stmts, cnt) {
  this.type = "loop_frame";
  this.stmts = stmts;
  this.ip = 0; // プログラムポインタ
  this.loop_count = cnt;
}

Loop_frame.prototype.get_loop_count = function() {
  return this.loop_count;
}

Loop_frame.prototype.get_stmts = function() {
  return this.stmts;
}

Loop_frame.prototype.get_stmt = function(state) {
  var stmt = this.stmts[this.ip];
  if (stage.arg_play.length != 0) {
    var id = stage.arg_play.pop();
  }
  if (stmt.type == "param") {
    if (id != stmt.id) {
      id = stmt.id
    }
    stage.arg_play.push(id);
    var frame = this.find_func_frame(state);
    if (frame == null) {
      console.log("error : loop_frame.get_stmt");
    }
    var arg = frame.args[id];
    return arg.stmts[frame.args_ip];
  }
  return stmt;
}

Loop_frame.prototype.get_stmts_length = function() {
  return this.stmts.length;
}

Loop_frame.prototype.dec_loop_count = function() {
  this.loop_count--;
}

Loop_frame.prototype.inc_ip = function(state) {
  var stmt = this.stmts[this.ip];
  if (stmt.type == "param") {
    var frame = this.find_func_frame(state);
    if (frame == null) {
      console.log("error : loop_frame.inc_ip");
      return null;
    }
    frame.args_ip++;
    var arg = frame.args[stmt.id];
    if (frame.args_ip <= arg.stmts.length) {
      this.args_ip = 0;
    }
  }
  this.ip++;
}

Loop_frame.prototype.find_func_frame = function(state) {
  var frame = state.frame_top();
  var index = state.stack_frame.length - 1;
  while (frame.type != "func_frame") {
    index--;
    frame = state.get_index_frame(index);
    if (frame == null) {
      return null;
    }
  }
  return frame;
}

Loop_frame.prototype.reset_ip = function() {
  this.ip = 0;
}