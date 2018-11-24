var Terminal_symbol = enchant.Class.create(enchant.Sprite, {
  initialize: function(type) {
    enchant.Sprite.call(this, 16, 16);
    this.type = type;
  },

  display: function() {
    console.log(this.type);
  },
});