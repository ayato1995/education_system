var State = enchant.Class.create({
  initialize: function(player) {
    this.player = player;
    this.collision_flag = false;
    this.stack_frame = [];
  },

  push_frame: function(frame) {
    this.stack_frame.push(frame);
  },

  pop_frame: function() {
    return this.stack_frame.pop();
  },

  frame_top: function() {
    return this.stack_frame[this.stack_frame.length - 1];
  },
});