Jazzy.Entity.Cell = function(){
    
    
    
};


Jazzy.Entity.extends(Jazzy.Entity.Cell,[
    
    {
        "name" : "chord1",
        "isEntity" : true,
        "type"     : "chord"
    },
    {
        "name" : "chord2",
        "isEntity" : true,
        "type"     : "chord"
    },
    {
        "name" : "chord3",
        "isEntity" : true,
        "type"     : "chord"
    },
    {
        "name" : "chord4",
        "isEntity" : true,
        "type"     : "chord"
    }

] );

Jazzy.Entity.registerName("cell",Jazzy.Entity.Cell);