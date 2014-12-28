(function(Jazzy,QUnit){




    QUnit.test( "Test Grid Import", function(assert) {
        var grid = Jazzy.createEntity("grid",DataSample.grid);

        assert.ok( 4 == grid.lines.length);
        assert.ok( grid.get(1) instanceof Jazzy.Entity.Line );
        assert.ok( grid.get(1,1) instanceof Jazzy.Entity.Cell );
        assert.ok( grid.get(1,1,2) instanceof Jazzy.Entity.Chord );
        assert.ok( grid.get(1,1,2).chord.name  === DataSample.grid.lines[1].cells[1].chords[2].chord );
        assert.ok( grid.get(2,3,0).chord.name  === DataSample.grid.lines[2].cells[3].chords[0].chord );
        assert.ok( grid.get(3,1,0).chord.name  === DataSample.grid.lines[3].cells[1].chords[0].chord );

    });


    QUnit.test( "Test Parent", function(assert) {
        var grid = Jazzy.createEntity("grid",DataSample.grid);

        assert.ok( grid.get(1).parent() instanceof Jazzy.Entity.Grid );
        assert.ok( grid.get(1,1).parent() instanceof Jazzy.Entity.Line );
        assert.ok( grid.get(1,1,2).parent() instanceof Jazzy.Entity.Cell );

        var line  = grid.get(1);
        var cell  = grid.get(1,1);
        var chord = grid.get(1,1,0);

        assert.ok(line.parent("grid") instanceof Jazzy.Entity.Grid );

        assert.ok(cell.parent("line") instanceof Jazzy.Entity.Line );

        assert.ok(cell.parent("grid") instanceof Jazzy.Entity.Grid );

        assert.ok(chord.parent("cell") instanceof Jazzy.Entity.Cell );
        assert.ok(chord.parent("line") instanceof Jazzy.Entity.Line );
        assert.ok(chord.parent("grid") instanceof Jazzy.Entity.Grid );

    });


    QUnit.test( "Test Grid.AddLine()", function(assert) {
        var grid = Jazzy.createEntity("grid",DataSample.grid);

        var gridLineAdded = false;
        grid.bind("lineAdded",function(p){
            gridLineAdded = p.child;
        });
        var gridLineRem = false;
        grid.bind("lineRemoved",function(p){
            gridLineRem = p.child;
        });


        var line = Jazzy.createEntity("line",{});


        // added
        grid.addLine(line);
        assert.ok(grid.lines.length == 5);
        assert.ok(grid.get(4) === line);

        // events
        assert.ok(gridLineAdded === line);
        assert.ok(gridLineRem === false);

        // moved
        grid.addLine(line,2);
        assert.ok(grid.lines.length == 5);
        assert.ok(grid.get(2) === line);

        // events
        assert.ok(gridLineRem === line);





    });

    QUnit.test( "Test Grid.AddCell()", function(assert) {
        var grid = Jazzy.createEntity("grid",DataSample.grid);
        var line = grid.get(0);


        var gridCellAdded = false;
        grid.bind("cellAdded",function(p){
            gridCellAdded = p.child;
        });
        var gridCellRem = false;
        grid.bind("cellRemoved",function(p){
            gridCellRem = p.child;
        });
        var LineCellAdded = false;
        line.bind("cellAdded",function(p){
            LineCellAdded = p.child;
        });
        var lineCellRem = false;
        line.bind("cellRemoved",function(p){
            lineCellRem = p.child;
        });


        var cell = Jazzy.createEntity("cell",{});

        // added
        line.addCell(cell);
        assert.ok(line.cells.length == 5);
        assert.ok(line.get(4) === cell);

        // events
        assert.ok(gridCellAdded === cell);
        assert.ok(gridCellRem === false);
        assert.ok(LineCellAdded === cell);
        assert.ok(lineCellRem === false);

        // moved
        line.addCell(cell,2);
        assert.ok(line.cells.length == 5);
        assert.ok(line.get(2) === cell);
        // events
        assert.ok(gridCellRem === cell);
        assert.ok(lineCellRem === cell);
    });

    QUnit.test( "Test Cell.AddChord()", function(assert) {
        var grid = Jazzy.createEntity("grid",DataSample.grid);
        var cell = grid.get(0,0);
        var line = cell.parent("line");

        var gridChordAdded = false;
        grid.bind("chordAdded",function(p){
            gridChordAdded = p.child;
        });
        var gridChordRem = false;
        grid.bind("chordRemoved",function(p){
            gridChordRem = p.child;
        });
        var LineChordAdded = false;
        line.bind("chordAdded",function(p){
            LineChordAdded = p.child;
        });
        var lineChordRem = false;
        line.bind("chordRemoved",function(p){
            lineChordRem = p.child;
        });
        var cellChordAdded = false;
        line.bind("chordAdded",function(p){
            cellChordAdded = p.child;
        });
        var cellChordRem = false;
        line.bind("chordRemoved",function(p){
            cellChordRem = p.child;
        });

        // added
        var chord = Jazzy.createEntity("chord",{"chord":"A"});
        cell.addChord(chord);
        assert.ok(cell.chords.length == 5);
        assert.ok(cell.get(4) === chord);

        // events
        assert.ok(gridChordAdded === chord);
        assert.ok(gridChordRem === false);
        assert.ok(LineChordAdded === chord);
        assert.ok(lineChordRem === false);
        assert.ok(cellChordAdded === chord);
        assert.ok(cellChordRem === false);


        // moved
        cell.addChord(chord,2);
        assert.ok(cell.chords.length == 5);
        assert.ok(cell.get(2) === chord);

        // events
        assert.ok(gridChordRem === chord);
        assert.ok(lineChordRem === chord);
        assert.ok(cellChordRem === chord);
    });

    
    
})(Jazzy,QUnit);




