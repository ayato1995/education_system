var Play = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, stage) {
    enchant.Sprite.call(this, 32, 32);
    this.image = game.assets[PLAY];
    this.type = "play";
    this.x = x;
    this.y = y;
    this.register_play(stage);
    // 実行中のブロックの管理
    this.play_progs = [];
    // ハイライトのブロックを管理
    this.highlight_block = [];
  },

  play: function(stage) {
    var prog = stage.prog;
    var fm = new Func_map();
    var main = main_parser(prog.main_head);
    var main_head = prog.copy_blocks(stage, prog.main_head, stage.map.x + stage.map.width + 20, 10, "gray");
    this.play_progs.push(main_head);
    fm.set_spead(func_parser(prog.s_head, "spead"));
    fm.set_heart(func_parser(prog.h_head, "heart"));
    fm.set_dia(func_parser(prog.d_head, "dia"));
    fm.set_clover(func_parser(prog.c_head, "clover"));
    run(main, new State(stage.player), fm);
  },

  register_play: function(stage) {
    this.addEventListener("touchstart", function() {
      if (!stage.prog.is_append()) {
        return;
      }
      stage.play_flag = true;
      stage.remove();
      stage.prog.move_blocks(stage.map.x + stage.map.width + 20);
      game.height += stage.prog.get_total_height();
      console.log("=============== play ===============");
      this.play(stage);
    });
  },

  main_head_highlight_off: function() {
    var node = this.play_progs.pop();
    while (node.next != null) {
      node = node.next;
      if (node.type != "arg_start" && node.type != "arg_end") {
        node.backgroundColor = "silver";
      }
    }
  },

  loop_end_highlight_off: function(state) {
    var frame_i = state.stack_frame.length - 1;
    var frame = state.get_index_frame(frame_i);
    var total_ip = 0;
    while (frame.type == "loop_frame") {
      total_ip += frame.ip;
      frame_i--;
      frame = state.get_index_frame(frame_i);
      if (stage.arg_play) {
        while (frame.type != "func_frame") {
          frame_i--;
          frame = state.get_index_frame(frame_i);
        }
        frame_i--;
        frame = state.get_index_frame(frame_i);
      }
    }
    total_ip += frame.ip;
    var play_index = this.play_progs.length - 1;
    if (stage.arg_play) {
      play_index--;
    }
    var head = this.play_progs[play_index];
    var i = 0;
    while (i < total_ip) {
      head = head.next;
      if (head != null && head.type != "arg_start" && head.type != "arg_end") {
        i++;
      }
    }
    if (total_ip != 0) {
      head.backgroundColor = "silver";
    }
  },
  /*
  highlight: function(state) {
    var frame_i = state.stack_frame.length - 1;
    var frame = state.get_index_frame(frame_i);
    var total_ip = 0;
    var loop_flag = false;
    while (frame.type == "loop_frame") {
      loop_flag = true;
      total_ip += frame.ip;
      frame_i--;
      frame = state.get_index_frame(frame_i);
      if (stage.arg_play) {
        while (frame.type != "func_frame") {
          frame_i--;
          frame = state.get_index_frame(frame_i);
        }
        frame_i--;
        frame = state.get_index_frame(frame_i);
      }
    }
    total_ip += frame.ip;
    var play_index = this.play_progs.length - 1;
    if (stage.arg_play) {
      // console.log("gagag");
      play_index--;
    }
    console.log(total_ip);
    // console.log(play_index + " " + (this.play_progs.length - 1));
    var head = this.play_progs[play_index];
    var i = 0;
    while (i < total_ip) {
      head = head.next;
      if (!loop_flag) {
        if (head.type == "loop_start") {
          // console.log("gaete");
          head = this.get_loop_end_next(head);
        }
      }
      if (head.type != "arg_start" && head.type != "arg_end") {
        i++;
      }
    }
    if (this.highlight_block.length != 0) {
      var b = this.highlight_block.pop();
      b.backgroundColor = "silver";
      console.log(b.type);
    }
    head = head.next;
    if (head != null) {
      // console.log(head.type);
      this.highlight_block.push(head);
      head.backgroundColor = "yellow";
    }
  },
  */
  highlight: function(frame) {
    if (this.highlight_block.length != 0) {
      /*
      if (frame.type != "func_frame") {
        var b = this.highlight_block.pop();
        b.backgroundColor = "silver";
      }
      */
      var b = this.highlight_block.pop();
      if (b.type == "func_id") {
        this.highlight_block.push(b);
      } else {
        b.backgroundColor = "silver";
      }
    }
    var name = frame.type;
    var index = this.play_progs.length - 1;
    if (stage.arg_play) {
      console.log("ga");
      index--;
    }
    var block = this.play_progs[index];
    var i = 0;
    var ip = frame.ip;
    if (frame.type == "func_frame") {
      ip += frame.args_ip;
    }
    var arg_flag = 0;
    while (i <= ip) {
      // console.log(block.type);
      block = block.next;

      if (stage.arg_play && block.type == "func_id") {
        block = block.next;
      } else if (block.type == "arg_start") {
        arg_flag++;
        block = block.next;
      } else if (block.type == "arg_end") {
        arg_flag--;
        block = block.next;
      } else {
        i++;
      }

      if (block.type == "func_id" && i <= frame.ip) {
        while (true) {
          block = block.next;
          var type = block.type;
          if (type == "arg_start") {
            block = block.next;
            type = block.type;
            arg_flag++;
          } else if (type == "arg_end") {
            block = block.next;
            type = block.type;
            arg_flag--;
          }
          if (arg_flag == 0 && type != "func_id") {
            break;
          }
        }
        i++;
      }
    }
    console.log(block.type);
    block.backgroundColor = "yellow";
    this.highlight_block.push(block);
  },

  end_func: function() {
    var b = this.highlight_block.pop();
    b.backgroundColor = "silver";
    while (b.type != "func_id") {
      b = this.highlight_block.pop();
      b.backgroundColor = "silver";
    }
  },

  get_loop_end_next: function(head) {
    var loop_nest = 1;
    while (loop_nest != 0) {
      head = head.next;
      if (head.type == "loop_start") {
        loop_nest++;
      } else if (head.type == "loop_end") {
        loop_nest--;
      }
    }
    return head;
  },
})