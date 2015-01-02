Jazzy.Entity = function(){};
Jazzy.EntityName = {};

Jazzy.Entity.prototype = {

    export  : function(){
        
        var exportData = {};
        
        
        for(var i in this.creator._iEntities){
            
            var dataDef = this.creator._iEntities[i];

            var self = this;
            var handler;

            if( dataDef.isEntity === true ){
                
                handler = function(data){
                    return data.export();
                };
                
            }else{
                if( typeof dataDef.export === "function" ){
                    handler = function(data){
                        return dataDef.export.call(self,data);
                    };
                }else{
                    handler = function(data){
                        return data;
                    };
                }
            }

            var value;
            
            if(dataDef.isArray === true){
                value = [];
                for(var ii=0;ii<self[dataDef.name].length;ii++){
                    value.push(handler(self[dataDef.name][ii]));
                }
            }else{
                value = handler(self[dataDef.name]);
            }

            exportData[dataDef.name] = value;
        }
        return exportData;
    },

    afterImport : function(){

    },

    parent : function(name){

        if(undefined == name){
            return this._iParent[Object.keys(this._iParent)[0]];
        }

        if( this._iParent.hasOwnProperty(name)){

            return this._iParent[name];
        }else{
            var p = this.parent();

            if(p){
                return p.parent(name);
            }
        }

        return null;

    },

    setParent : function(name,o){
        this._iParent[name] = o;
    },

    import : function(data){
        
        for(var i in this.creator._iEntities ){
            
            var dataDef = this.creator._iEntities[i] ;
            
            var value = null;
            
            if( data.hasOwnProperty(dataDef.name) ){
                value = data[dataDef.name];
            }else{
                if(dataDef.default !== undefined  ){
                    value = dataDef.default;
                }
            }
            
            
            var handler;
            var self = this;
            
            if( dataDef.isEntity === true ){
                
                if(!dataDef.type){
                    Jazzy.error("No type in dataDef. Type is required for import : ");
                    Jazzy.debug(dataDef);
                    continue;
                }
                
                handler = function(value){
                    var e = Jazzy.createEntity(dataDef.type,value);

                    if( typeof dataDef.parentName == "string"){
                        e.setParent(dataDef.parentName , self);
                    }

                    return e;
                };
                
            }else{
                if( typeof dataDef.import === "function" ){
                    handler = function(value){
                        return dataDef.import.call(self,value,data);
                    };
                }else{
                    handler = function(value){
                        return value;
                    };
                }
            }

            if(dataDef.isArray === true){
                this[dataDef.name] = [];

                if(value instanceof Array){
                    for(var i = 0 ; i<value.length ; i++){
                        this[dataDef.name].push(handler(value[i]));
                    }
                }

            }else{
                this[dataDef.name] = handler(value);
            }
            
            this.afterImport();
            
        }
        
    },


    addChildHelper : function(data,index,parentName,ElementName,removerMethodName,arrayPropertyName){

        var expectedElementInstance = Jazzy.EntityName[ElementName];

        var e;

        if(data instanceof expectedElementInstance){
            e = data;
            var parent = e.parent(parentName);
            if(parent){
                parent[removerMethodName](e);
            }
        }else
            e = Jazzy.createEntity(ElementName,data);

        if(index>0 || index === 0)
            this[arrayPropertyName].splice(index,0,e);
        else
            this[arrayPropertyName].push(e);

        e.setParent(parentName,this);

        return e;

    },

    removeChildHelper : function(data,elementName,arrayPropertyName){

        var i = this[arrayPropertyName].indexOf(data);

        if(i >= 0){
            var e = this[arrayPropertyName][i];
            e.setParent(elementName,null);
            this[arrayPropertyName].splice(i,1);

            return e;
        }

        return null;

    }
  
};

Jazzy.Entity.extends = function (what,entities){
    what.prototype.export  = Jazzy.Entity.prototype.export;
    what.prototype.import  = Jazzy.Entity.prototype.import;
    what.prototype.afterImport  = Jazzy.Entity.prototype.afterImport;
    what.prototype.parent  = Jazzy.Entity.prototype.parent;
    what.prototype.setParent  = Jazzy.Entity.prototype.setParent;
    what.prototype.addChildHelper  = Jazzy.Entity.prototype.addChildHelper;
    what.prototype.removeChildHelper  = Jazzy.Entity.prototype.removeChildHelper;

    Jazzy.Bindable.extends(what);

    what._iEntities = {};
    
    for(var i = 0 ; i < entities.length ; i++){
        
        var e = Jazzy.Entity.__parseDataDef(entities[i]);
        
        if(!e.name){
            Jazzy.error("Entity Data has no name");
            Jazzy.debug(e);
        }
        
        what._iEntities[e.name] = e;
    }
    
};

Jazzy.Entity.registerName = function( hName , entity ){
    Jazzy.EntityName[hName] = entity;
};


Jazzy.createEntity = function(name,data){
    
    var e = new Jazzy.EntityName[name];
    
    e.creator = Jazzy.EntityName[name];

    e._iParent = {};
    
    if(data){
        e.import(data);
    }
    
    return e;
};

Jazzy.Entity.__parseDataDef = function(dataDef){
    
    var i = {},p;
    
    if(typeof dataDef === "string"){
        p = {"name" : dataDef};
    }else if(typeof dataDef === "object" ){
        p = dataDef;
    }else{
        Jazzy.error("Bad data definition");
        Jazzy.debug(dataDef);
    }
        
    Jazzy.applyParams(i,p,{
         
        name        : undefined,
        import      : null,
        export      : null,
        default     : undefined,
        isEntity    : false,
        isArray     : false,
        type        : undefined,
        parentName  : undefined
        
    });
    
    return i;
    
};
