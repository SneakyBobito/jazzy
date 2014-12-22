Jazzy.Entity = function(){};
Jazzy.EntityName = {};

Jazzy.Entity.prototype = {

    export  : function(){
        
        var exportData = {} ;
        
        
        for(var i in this.creator._iEntities){
            
            var dataDef = this.creator._iEntities[i];

            var value;

            if( typeof dataDef.export === "function" ){
                value = dataDef.export.call(this,this[dataDef.name]);
            }else{
                value = this[dataDef.name];
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
            
            if( typeof dataDef.import === "function" ){
                this[dataDef.name] = dataDef.import.call(this,value,data);
            }else{
                this[dataDef.name] = value;
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
         
        name   : undefined,
        import : null,
        export : null,
        default: undefined
        
    });
    
    return i;
    
};

