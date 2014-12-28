Jazzy.Entity.Chord = function(){};

Jazzy.Entity.Chord.prototype = {

    update : function(chordName){


        try{
            var chord = teoria.chord(chordName);
        }catch(e){
            return false;
        }

        var oldChord = this.chord;

        this.chord = chord;

        this.fire("chordUpdated",[this,oldChord]);

        var grid = this.parent("grid");
        if(grid)
            grid.fire("chordUpdated",[this,oldChord]);

        var line = this.parent("line");
        if(line)
            line.fire("chordUpdated",[this,oldChord]);

        var cell = this.parent("cell");
        if(cell)
            cell.fire("chordUpdated",[this,oldChord]);

        return true;


    }

};

Jazzy.Entity.extends(Jazzy.Entity.Chord,[
    
    {
        "name"   : "chord",
        "export" : function(v){
            return  v.name();
        },
        "import" : function(v,d){
            return new teoria.chord(v);
        }
    }
] );
Jazzy.Entity.registerName("chord",Jazzy.Entity.Chord);
