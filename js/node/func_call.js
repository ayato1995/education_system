var Func_call = enchant.Class.create({
  initialize: function(id) {
    this.type = "func_call";
    this.id = id;
    this.func_args = [];
  },

  set_func_args: function(index, arg) {
    this.func_args[index] = arg;
  },

  get_args: function() {
    return this.func_args;
  },

  display_stmts: function(stage, x, y) {
    var res = new Object();
    res.x = x;
    res.y = y;
    var block = new Func_id(this.id);
    block.set_x(x);
    block.set_y(y);
    block.set_backgroundColor("green");
    stage.addChild(block);
    res.y += block.height + 5;
    for (var i = 0; i < this.func_args.length; i++) {
      res = this.func_args[i].display_stmts(stage, res.x, res.y);
    }
    return res;
  },

  display: function() {
    console.log("func_call : " + this.id);
    for (var i = 0; i < this.func_args.length; i++) {
      this.func_args[i].display();
    }
  },
});