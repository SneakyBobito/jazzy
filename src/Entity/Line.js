Jazzy.Entity.Line = function(){};

Jazzy.Entity.extends(Jazzy.Entity.Line,[

    {
        "name"      : "cells",
        "isEntity"  : true,
        "type"      : "cell",
        "isArray"   : true
    }

] );
Jazzy.Entity.registerName("line",Jazzy.Entity.Line);