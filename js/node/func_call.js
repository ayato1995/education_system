var Func_call = function(id) {
  this.type = "func_call";
  this.id = id;
  this.func_args = [];
}

Func_call.prototype.set_func_args = function(index, arg) {
  this.func_args[index] = arg;
}

Func_call.prototype.get_args = function() {
  return this.func_args;
}

Func_call.prototype.display = function() {
  console.log("func_call : " + this.id);
  for (var i = 0; i < this.func_args.length; i++) {
    this.func_args[i].display();
  }
}