var Stage = enchant.Class.create(enchant.Scene, {
  initialize: function() {
    enchant.Scene.call(this);
  },

  display_blocks: function(blocks) {
    for (var i = 0; i < blocks.length; i++) {
      this.addChild(blocks[i]);
    }
  },

  display_map: function(map) {
    this.addChild(map);
  },
});