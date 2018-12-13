var State = function(player) {
  this.player = player;
  this.collision_flag = false;
  this.stack_frame = [];
}

State.prototype.push_frame = function(frame) {
  this.stack_frame.push(frame);
}

State.prototype.pop_frame = function() {
  return this.stack_frame.pop();
}

State.prototype.frame_top = function() {
  return this.stack_frame[this.stack_frame.length - 1];
}