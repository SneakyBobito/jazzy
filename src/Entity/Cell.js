Jazzy.Entity.Cell = function(){};

Jazzy.Entity.Cell.prototype = {
    get : function(ichord){

        if(undefined == ichord)
            return this;

        var chord = this.chords[ichord];

        if(undefined == chord)
            return null;
        else
            return chord;

    },


    addChord : function(data,index){
        var parentName = "cell";
        var ElementName = "chord";
        var removerMethodName = "removeChord";
        var arrayPropertyName = "chords";

        var chord = this.addChildHelper(data,index,parentName,ElementName,removerMethodName,arrayPropertyName);

        this.fire("chordAdded",[{
            "parent" : this,
            "child"  : chord
        }]);

        var grid = this.parent("grid");
        if(grid)
            grid.fire("chordAdded",[{
                "parent" : this,
                "child"  : chord
            }]);

        var line = this.parent("line");
        if(line)
            line.fire("chordAdded",[{
                "parent" : this,
                "child"  : chord
            }]);

        return chord;

    },

    removeChord : function(data){
        var arrayPropertyName = "chords";
        var elementName = "chord";
        var chord = this.removeChildHelper(data,elementName,arrayPropertyName);

        this.fire("chordRemoved",[{
            "parent" : this,
            "child"  : chord
        }]);

        var grid = this.parent("grid");
        if(grid)
            grid.fire("chordRemoved",[{
                "parent" : this,
                "child"  : chord
            }]);

        var line = this.parent("line");
        if(line)
            line.fire("chordRemoved",[{
                "parent" : this,
                "child"  : chord
            }]);

        return chord;
    }

};


Jazzy.Entity.extends(Jazzy.Entity.Cell,[

    {
        "name" : "chords",
        "isEntity" : true,
        "type"     : "chord",
        "isArray"  : true,
        "parentName": "cell",
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
                "1-1-2",
                "1-1-1-1"

            ];

            if(knownPatterns.indexOf(v) > -1){
                return v;
            }else{
                return "4";
            }

        }
    }

] );



Jazzy.Entity.registerName("cell",Jazzy.Entity.Cell);