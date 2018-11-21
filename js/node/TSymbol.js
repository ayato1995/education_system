var Terminal_symbol = enchant.Class.create(enchant.Sprite, {
  initialize: function(type) {
    enchant.Sprite.call(this, 16, 16);
    this.type = type;
    this.arg_type = null;
  },

  get_arg_id: function() {
    return this.arg_type;
  },

  set_arg_id: function(id) {
    this.arg_type = id;
  },

  display: function() {
    console.log(this.type);
  },
});