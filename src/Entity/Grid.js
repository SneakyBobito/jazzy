Jazzy.Entity.Grid = function(){};

Jazzy.Entity.Grid.prototype = {

    get : function(iline,icell,ichord){

        if(undefined == iline)
            return this;

        var line = this.lines[iline];

        if(undefined == line)
            return null;
        else
            return line.get(icell,ichord);

    },

    addLine : function(data,index){
        var parentName = "grid";
        var ElementName = "line";
        var removerMethodName = "removeLine";
        var arrayPropertyName = "lines";

        var line = this.addChildHelper(data,index,parentName,ElementName,removerMethodName,arrayPropertyName);

        this.fire("lineAdded",[{
            "parent" : this,
            "child"  : line
        }]);

        return line;

    },

    removeLine : function(data){
        var arrayPropertyName = "lines";
        var elementName = "line";
        var line = this.removeChildHelper(data,elementName,arrayPropertyName);

        if(line){
            this.fire("lineRemoved",[{
                "parent" : this,
                "child"  : line
            }]);
        }
        return line;
    }

};

Jazzy.Entity.extends(Jazzy.Entity.Grid,[

    {
        "name"      : "lines",
        "isEntity"  : true,
        "type"      : "line",
        "isArray"   : true,
        "parentName": "grid",
    }

] );
Jazzy.Entity.registerName("grid",Jazzy.Entity.Grid);