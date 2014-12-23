Jazzy.Entity.Chord = function(){};

Jazzy.Entity.extends(Jazzy.Entity.Chord,{
    
    "chord": {
        "export" : function(v){
            return  v.name();
        },
        "import" : function(v,d){
            return new teoria.chord(v);
        }
    }

} );
Jazzy.Entity.registerName("chord",Jazzy.Entity.Chord);