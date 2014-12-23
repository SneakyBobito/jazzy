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
                for(var i=0;i<self[dataDef.name].length;i++){
                    value.push(handler(self[dataDef.name][i]));
                }
            }else{
                value = handler(self[dataDef.name]);
            }
            
            exportData[i] = value;
        }
        return exportData;
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
                    return Jazzy.createEntity(dataDef.type,value);
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
                
                console.log(data);
                
                for(var i = 0 ; i<value.length ; i++){
                    this[dataDef.name].push(handler(value[i]));
                }
                
            }else{
                this[dataDef.name] = handler(value);
            }
            
            
            
        }
        
    }
  
};

Jazzy.Entity.extends = function (what,entities){
    what.prototype =  Object.create(Jazzy.Entity.prototype);
    
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
        type        : undefined
        
    });
    
    return i;
    
};

