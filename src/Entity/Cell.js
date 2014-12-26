Jazzy.Entity.Cell = function(){};

Jazzy.Entity.Cell.prototype = {

};


Jazzy.Entity.extends(Jazzy.Entity.Cell,[

    {
        "name" : "chords",
        "isEntity" : true,
        "type"     : "chord",
        "isArray"  : true
    },
    {
        "name" : "pattern",
        "default" : "4",
        "import" : function(v){

            var knownPatterns = [

                "4",
                "2-2",
                "3-1",
                "repeat",
                "2-1-1",
                "1-3",
                "1-2-1",
                "1-1-2",
                "1-1-1-1"

            ];

            if(knownPatterns.indexOf(v) !== 1){
                return v;
            }else{
                return "4";
            }

        }
    }

] );



Jazzy.Entity.registerName("cell",Jazzy.Entity.Cell);