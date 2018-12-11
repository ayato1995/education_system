var Main_loop = enchant.Class.create({
  initialize: function(n) {
    this.type = "main_loop";
    this.stmts = [];
    this.n = n;
  },

  push_stmt: function(stmt) {
    this.stmts.push(stmt);
  },

  get_stmts: function() {
    return this.stmts;
  },

  get_loop_count: function() {
    return this.n;
  },

  display_stmts: function(stage, x, y) {
    var res = new Object();
    res.x = x;
    res.y = y;
    for (var i = 0; i < this.stmts.length; i++) {
      console.log(this.stmts[i].type);
      if (this.stmts[i].type == "main_loop" ||
        this.stmts[i].type == "main_stmts" ||
        this.stmts[i].type == "func_call") {
        res = this.stmts[i].display_stmts(stage, res.x, res.y);
      } else {
        this.stmts[i].set_x(res.x);
        this.stmts[i].set_y(res.y);
        this.stmts[i].set_backgroundColor("red");
        stage.addChild(this.stmts[i]);
        if (this.stmts[i].type == "loop_start") {
          this.stmts[i].register_label_move();
          stage.addChild(this.stmts[i].n_label);
        }
        res.y += this.stmts[i].height + 5;
      }
    }
    return res;
  },

  print_stmts: function() {
    console.log(this.type + " : " + this.stmts.length);
    console.log("loop count : " + this.n);
    for (var i = 0; i < this.stmts.length; i++) {
      if (this.stmts[i].type == "main_loop" ||
        this.stmts[i].type == "main_stmts") {
        this.stmts[i].print_stmts();
      } else {
        this.stmts[i].display();
      }
    }
  }
});