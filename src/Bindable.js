/**
 * @class Bindable
 * make extending class bindable and firable
 */
Jazzy.Bindable = function(){};

Jazzy.Bindable.prototype={
    
    bind : function bind(what,how){
        
        if(!this.bindable_bounds){
            this.bindable_bounds = {};
        }
        
        if(!this.bindable_bounds[what]){
            this.bindable_bounds[what] = [];
        }
        
        this.bindable_bounds[what].push(how);
        
    },
            
    fire : function(what,params,cancelOnFalse){
        
        var cancelOnFalse = cancelOnFalse === undefined ? false : cancelOnFalse;

        if(!this.bindable_bounds || !this.bindable_bounds[what]){
            return true;
        }
        
        for(var i = 0 ; i < this.bindable_bounds[what].length ; i++ ){
            var cR = this.bindable_bounds[what][i].apply(this,params);
            if(cancelOnFalse && cR === false){
                return false;
            }
        }
        
        return true;
        
    }
    
};

Jazzy.Bindable.extends = function (what){
    
    what.prototype.bind = Jazzy.Bindable.prototype.bind;
    what.prototype.fire = Jazzy.Bindable.prototype.fire;
    
};