Jazzy.Entity.Grid = function(){};

Jazzy.Entity.extends(Jazzy.Entity.Grid,[

    {
        "name"      : "lines",
        "isEntity"  : true,
        "type"      : "line",
        "isArray"   : true
    }

] );
Jazzy.Entity.registerName("grid",Jazzy.Entity.Grid);