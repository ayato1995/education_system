var Func_id = enchant.Class.create(Terminal_symbol, {
  initialize: function(name) {
    Terminal_symbol.call(this, "func_id");
    this.name = name;
    this.args = [];
  },

  create_block: function(stage, x, y) {
    var fi = new Func_id(this.name);
    fi.set_image(this.image);
    fi.set_x(x);
    fi.set_y(y);
    fi.set_args(this.args);
    fi.set_backgroundColor(this.backgroundColor);
    fi.register_move(stage);
    fi.register_append(stage);
    fi.register_above(stage);
    return fi;
  },

  set_args: function(args) {
    this.args = args;
  }

  push_args: function(arg_id) {
    for (var i = 0; i < this.args.length; i++) {
      if (this.args[i] == arg_id)
        return false;
    }
    this.args.push(arg_id);
    return true;
  },

  display: function() {
    console.log("type : " + this.type + " name : " + this.name);
  }
});