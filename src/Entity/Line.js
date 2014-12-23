Jazzy.Entity.Line = function(){};

Jazzy.Entity.extends(Jazzy.Entity.Line,{
    
    "cells": {
        "export" : function(v){
            
            var data=[];
            
            for(var i=0;i<v.length;i++){
                data.push(v[i].export());
            }
            
            return  data;
        },
        "import" : function(v,d){
            
            var data=[];
            
            for(var i=0;i<v.length;i++){
                data.push(v[i].export());
            }
            
            return  data;
            
        }
    }

} );
Jazzy.Entity.registerName("line",Jazzy.Entity.Chord);