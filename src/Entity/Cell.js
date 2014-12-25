Jazzy.Entity.Cell = function(){
    
    
    
};


Jazzy.Entity.extends(Jazzy.Entity.Cell,[
    
    {
        "name" : "chords",
        "isEntity" : true,
        "type"     : "chord",
        "isArray"  : true
    }

] );

Jazzy.Entity.registerName("cell",Jazzy.Entity.Cell);