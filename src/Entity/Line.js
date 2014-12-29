Jazzy.Entity.Line = function(){};

Jazzy.Entity.Line.prototype = {

    get : function(icell,ichord){

        if(undefined == icell)
            return this;

        var cell = this.cells[icell];

        if(undefined == cell)
            return null;
        else
            return cell.get(ichord);

    },
            
    coordinate : function(){
        
        var p = this.parent();
        
        var i = p.lines.indexOf(this);
        
        return [i];
        
    },


    addCell : function(data,index){
        var parentName = "line";
        var ElementName = "cell";
        var removerMethodName = "removeCell";
        var arrayPropertyName = "cells";
        var cell = this.addChildHelper(data,index,parentName,ElementName,removerMethodName,arrayPropertyName);

        this.fire("cellAdded",[{
            "parent" : this,
            "child"  : cell
        }]);

        var grid = this.parent("grid");
        if(grid)
            grid.fire("cellAdded",[{
                "parent" : this,
                "child"  : cell
            }]);

        return cell;

    },

    removeCell : function(data){
        var arrayPropertyName = "cells";
        var elementName = "cell";
        var cell = this.removeChildHelper(data,elementName,arrayPropertyName);

        this.fire("cellRemoved",[{
            "parent" : this,
            "child"  : cell
        }]);

        var grid = this.parent("grid");
        if(grid)
            grid.fire("cellRemoved",[{
                "parent" : this,
                "child"  : cell
            }]);

        return cell;

    }

};


Jazzy.Entity.extends(Jazzy.Entity.Line,[

    {
        "name"      : "cells",
        "isEntity"  : true,
        "type"      : "cell",
        "isArray"   : true,
        "parentName": "line",
    },
    {
        "name"      : "section",
        "default"   : undefined
    }

] );
Jazzy.Entity.registerName("line",Jazzy.Entity.Line);