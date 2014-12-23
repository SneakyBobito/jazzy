(function(Jazzy,QUnit){
    
    
    QUnit.test( "Test Bindable", function(assert) {
        var A = function(){};
        Jazzy.Bindable.extends(A);

        ////////////////////////
        // SIMPLE
        var simple = 0 , simple2 = 0;
        var a = new A();
        a.bind("simple",function(){
            simple = 1;
        });
        a.bind("simple2",function(){
            simple2 = 2;
        });
        
        assert.ok( true === a.fire("simple") );
        assert.ok( true === a.fire("simple2") );
        assert.ok( 1 === simple );
        assert.ok( 2 === simple2 );
        
        
        ////////////////////////
        // CANCEL ON FALSE
        var cof = 0 , cof2 = 0 , cof3 = 0;
        var b = new A();
        b.bind("cof",function(){
            cof = 1;
            return true;
        });
        b.bind("cof",function(){
            cof2 = 2;
            return false;
        });
        b.bind("cof",function(){
            cof3 = 3;
            return true;
        });
        
        assert.ok(false === b.fire("cof",{},true));
        assert.ok( 1 === cof );
        assert.ok( 2 === cof2 );
        assert.ok( 0 === cof3 );
        
    });
    
    
    QUnit.test( "Test Entity", function(assert) {
                
        var A = function(){};
        Jazzy.Entity.extends( A ,[

            "nameOnly",
            {
                "name"    : "withdefault",
                "default" : "defaultValue"
            },
            {
                "name"    : "importExport",
                "import"  : function(v,d){
                    return "-" + v;
                },
                "export"  : function(v){
                    return "+" + v;
                }
            },
            {
                "name"    : "importDefault",
                "import" : function(v,d){
                    return "-" + v;
                },
                "default" : "d"
            },
            {
                "name"    : "entitySimple",
                "isEntity": true,
                "type"    : "TestEntityB"
                
            }

        ] );
        Jazzy.Entity.registerName("TestEntityA",A);
        
        
        
        var B = function(){};
        Jazzy.Entity.extends( B ,[
            {   
                "name" : "simple",
                'export' : function(d){
                    return "-" + d;
                }
            },
            {
                "name"    : "entityArray",
                "isEntity": true,
                "type"    : "TestEntityC",
                "isArray" : true,
                "default" : []
            }
        ] );
        Jazzy.Entity.registerName("TestEntityB",B);
        
        var C = function(){};
        Jazzy.Entity.extends( C ,[
            {   
                "name" : "simple"
            }
        ] );
        Jazzy.Entity.registerName("TestEntityC",C);
        
        
        
        var useDefault = Jazzy.createEntity("TestEntityA",{
            "nameOnly" : "a",
            "importExport" : "b",
            "entitySimple" : {
                'simple' : "subEntitySimpleValue",
                "entityArray"  : [
                    {"simple" : "arr1"},
                    {"simple" : "arr2"},
                    {"simple" : "arr3"}
                ]
            }
            
        });
        console.log(useDefault);
        assert.ok( useDefault.nameOnly      === "a" );
        assert.ok( useDefault.withdefault   === "defaultValue" );
        assert.ok( useDefault.importExport  === "-b" );
        assert.ok( useDefault.importDefault === "-d" );
        assert.ok( useDefault.entitySimple.hasOwnProperty("creator"));
        assert.ok( useDefault.entitySimple.simple === "subEntitySimpleValue" );
        assert.ok( useDefault.entitySimple.entityArray[0].simple === "arr1" );
        assert.ok( useDefault.entitySimple.entityArray[1].simple === "arr2" );
        assert.ok( useDefault.entitySimple.entityArray[2].simple === "arr3" );
        
        var useDefaultExport = useDefault.export();
        assert.ok( useDefaultExport.nameOnly      === "a" );
        assert.ok( useDefaultExport.withdefault   === "defaultValue" );
        assert.ok( useDefaultExport.importExport  === "+-b" );
        assert.ok( useDefaultExport.importDefault === "-d" );
        assert.ok( useDefaultExport.entitySimple.simple === "-subEntitySimpleValue" );
        
        var fullSet = Jazzy.createEntity("TestEntityA",{
            "nameOnly" : "a",
            "importExport" : "b",
            "withdefault"  : "z",
            "importDefault": "w",
            "entitySimple" : {
                'simple' : "subEntitySimpleValue"
            },
            
        }); 
        assert.ok( fullSet.nameOnly      === "a" );
        assert.ok( fullSet.withdefault   === "z" );
        assert.ok( fullSet.importExport  === "-b" );
        assert.ok( fullSet.importDefault === "-w" );
        assert.ok( fullSet.entitySimple.simple === "subEntitySimpleValue" );
        assert.ok( fullSet.entitySimple.entityArray instanceof Array );
        assert.ok( fullSet.entitySimple.entityArray.length == 0 );
        
    });
    
    
})(Jazzy,QUnit);




