var Func_id = enchant.Class.create(Terminal_symbol, {
  initialize: function(name) {
    Terminal_symbol.call(this, "func_id");
    this.name = name;
    this.args = [];
  },

  create_block: function(stage, x, y) {
    var fi = new Func_id(this.name, this.args);
    fi.set_image(this.image);
    fi.set_x(x);
    fi.set_y(y);
    fi.set_backgroundColor(this.backgroundColor);
    fi.register_move(stage);
    fi.register_append(stage);
    fi.register_above(stage);
    return fi;
  },

  set_args: function(arg_id) {
    this.args.push(arg_id);
  },

  display: function() {
    console.log("type : " + this.type + " name : " + this.name);
  }
});