var Jazzy = {};

/**
 * Allows to bind params to an object instance according to the given definition.
 * A definition is the list of the properties of the instance and what should be default values
 * @param instance
 * @param params
 * @param definition
 */
Jazzy.applyParams = function(instance,params,definition){
    params = params || {};
    for( var item in definition ){
        if(definition[item] && definition[item]["kCallback"] !== undefined )
            instance[item] = definition[item]["kCallback"](params[item]) ;
        else
            instance[item] = params[item] || definition[item] ;
    }

};

Jazzy.error = function(message , url){
    var errorMessage = "Jazzy Error : " + message ;
    if( url !== undefined )
        errorMessage += " More informations at : " + url;
    
    console.log(errorMessage);
    
};


Jazzy.debug = function(item){
    console.log(item);
};