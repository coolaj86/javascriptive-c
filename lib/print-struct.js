(function () {
  require('remedial');
  var util = require('util');

  var printf_types = {
    "int": "d",
    "uint": "%u",
    "long": "%l",
    "double": "%lf",
    "float": "%f",
    "char*": "%s",
    "char": "%c"
  };

  var structs = {
    "global_settings": {
      members: [
        {
          key: "log_mode",
          type: "int"
        },
        {
          key: "daemonize",
          type: "int"
        },
      ]
    }
  };

  function struct_scaffold(name, struct) {
    console.log('void debug_{name}(struct {name} &data)\n{'.supplant({name: name}));
    struct.members.forEach(function (member) {
      var printf = ('  printf("{key}: %' + printf_types[member.type] + '\\n", data->{key});').supplant(member);
      //console.log(printf, 5);
      util.puts(printf);
    });
    console.log('}');
  }

  function structs_scaffold(structs) {
    Object.keys(structs).forEach(function (key) {
      //console.log("key: " + key);
      struct_scaffold(key, structs[key]);
    });
  }

  structs_scaffold(structs); 
}());
