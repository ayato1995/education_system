var State = function(player) {
  this.player = player;
  this.collision_frag = false;
  this.stack_frame = [];
  this.exp_block = [];
}

State.prototype.push_frame = function(frame) {
  this.stack_frame.push(frame);
}

State.prototype.pop_frame = function() {
  return this.stack_frame.pop();
}

State.prototype.push_block = function(block) {
  this.exp_block.push(block);
}

State.prototype.pop_block = function() {
  return this.exp_block.pop();
}

State.prototype.limited_pop_block = function() {
  var b = this.exp_block.pop();
  if (b == null) {
    return null;
  } else if (b == "func_call") {
    this.push_block(b);
    return null;
  }
  return b;
}

State.prototype.frame_top = function() {
  return this.stack_frame[this.stack_frame.length - 1];
}