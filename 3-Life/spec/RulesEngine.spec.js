describe("Executes the rules of Conway's game of life", function()
{
    var engine;

    beforeEach(function() {
        engine = new RulesEngine;
    });

    //Specs for dead cells
    describe("properly determines what a cell's state should be next period based on num surrounding live cells", function() {

        it("ressurects a dead cells if surrounded by 3 live cells", function() {
            expect(engine._isDeadCellAliveNextPeriod(3)).toEqual(true);
        });

        it("keeps a dead cell dead if it's surrounded by 4 live cells", function() {
            expect(engine._isDeadCellAliveNextPeriod(4)).toEqual(false);
        });

        it("keeps a dead cell dead if it's surrounded by 2 live cells", function() {
            expect(engine._isDeadCellAliveNextPeriod(2)).toEqual(false);
        });

        it("keeps a dead cell dead if it's surrounded by 0 live cells", function() {
            expect(engine._isDeadCellAliveNextPeriod(0)).toEqual(false);
        });


        //specs for live cells

        it("Keeps a live cell live if it's surrounded by 2 live cells", function() {
            expect(engine._isLivingCellAliveNextPeriod(2)).toEqual(true);
        });
        it("Keeps a live cell live if it's surrounded by 3 live cells", function() {
            expect(engine._isLivingCellAliveNextPeriod(3)).toEqual(true);
        });
        it("Kills a live cell if it's surrounded by 1 live cells", function() {
            expect(engine._isLivingCellAliveNextPeriod(1)).toEqual(false);
        });
        it("Kills a live cell if it's surrounded by 0 live cells", function() {
            expect(engine._isLivingCellAliveNextPeriod(0)).toEqual(false);
        });
        it("Kills a live cell if it's surrounded by 4 live cells", function() {
            expect(engine._isLivingCellAliveNextPeriod(4)).toEqual(false);
        });
        it("Kills a live cell if it's surrounded by 8 live cells", function() {
            expect(engine._isLivingCellAliveNextPeriod(8)).toEqual(false);
        });
    });


    describe("Correctly counts the number of live cells surrounding a given cell", function() {
        it("counts correctly for cells surrounded by 0 live cells", function() {
            expect(engine._getNumSurroundingCellsAlive([[0,0,0], [0,0,0], [0,0,0]], 1, 1 )).toBe(0);
        });

        it("counts correctly for cells surrounded by 1 live cells", function() {
            expect(engine._getNumSurroundingCellsAlive([[1,0,0], [0,0,0], [0,0,0]], 1, 1 )).toBe(1);
        });

        it("counts correctly for cells surrounded by 1 live cells", function() {
            expect(engine._getNumSurroundingCellsAlive([[1,0,0], [0,0,0], [0,0,0]], 1, 1 )).toBe(1);
        });

        it("counts correctly for cells surrounded by 2 live cells", function() {
            expect(engine._getNumSurroundingCellsAlive([[0,1,0], [0,0,0], [0,1,0]], 1, 1 )).toBe(2);
        });

        it("counts correctly for cells surrounded by 3 live cells", function() {
            expect(engine._getNumSurroundingCellsAlive([[0,0,1], [1,0,0], [0,0,1]], 1, 1 )).toBe(3);
        });

        it("counts correctly for cells surrounded by 4 live cells", function() {
            expect(engine._getNumSurroundingCellsAlive([[0,0,1], [1,0,0], [1,0,1]], 1, 1 )).toBe(4);
        });

        it("counts correctly for cells surrounded by 5 live cells", function() {
            expect(engine._getNumSurroundingCellsAlive([[0,1,1], [1,0,0], [1,0,1]], 1, 1 )).toBe(5);
        });

        it("counts correctly for cells surrounded by 6 live cells", function() {
            expect(engine._getNumSurroundingCellsAlive([[1,1,1], [1,0,0], [1,0,1]], 1, 1 )).toBe(6);
        });

        it("counts correctly for cells surrounded by 7 live cells", function() {
            expect(engine._getNumSurroundingCellsAlive([[1,1,1], [1,0,1], [1,0,1]], 1, 1 )).toBe(7);
        });

        it("counts correctly for cells surrounded by 8 live cells", function() {
            expect(engine._getNumSurroundingCellsAlive([[1,1,1], [1,0,1], [1,1,1]], 1, 1 )).toBe(8);
        });

        //test cells on edge and corner to see if count wraps

        it("wraps count correctly for cells on bottom edge", function() {
            expect(engine._getNumSurroundingCellsAlive([[0,1,0], [0,0,0], [0,0,0]], 2, 1 )).toBe(1);
        });

        it("wraps count correctly for cells on top edge", function() {
            expect(engine._getNumSurroundingCellsAlive([[0,0,0], [0,0,0], [0,1,1]], 0, 1 )).toBe(2);
        });

        it("wraps count correctly for cells on left edge", function() {
            expect(engine._getNumSurroundingCellsAlive([[0,0,0], [0,0,1], [0,0,0]], 1, 0)).toBe(1);
        });

        it("wraps count correctly for cells on right edge", function() {
            expect(engine._getNumSurroundingCellsAlive([[1,0,0], [1,0,0], [1,0,0]], 1, 2)).toBe(3);
        });

        it("wraps count correctly for cells on top left corner", function() {
            expect(engine._getNumSurroundingCellsAlive([[1,1,1], [1,1,1], [1,1,1]], 0, 0)).toBe(8);
        });
        it("wraps count correctly for cells on bottom right corner", function() {
            expect(engine._getNumSurroundingCellsAlive([[0,1,0], [1,1,1], [1,1,1]], 2, 2)).toBe(6);
        });
        it("wraps count correctly for cells on top right corner", function() {
            expect(engine._getNumSurroundingCellsAlive([[0,1,0], [1,1,1], [1,1,1]], 0, 2)).toBe(7);
        });
        it("wraps count correctly for cells on bottom left corner", function() {
            expect(engine._getNumSurroundingCellsAlive([[1,1,1], [0,0,1], [0,0,1]], 2, 0)).toBe(5);
        });
    });

    describe("Correctly determines if an alive cell should be alive next period based on num surrounding live cells", function()
    {
        beforeEach(function(){
            spyOn(engine, "_isLivingCellAliveNextPeriod");
            spyOn(engine, "_isDeadCellAliveNextPeriod");
            spyOn(engine, "_getNumSurroundingCellsAlive");
        });

        it('It determines correctly if cell is alive', function() {
            var result = engine.isCellAliveNextPeriod([[1,1,1],[1,1,1],[1,1,1]], 1, 1);
            expect(engine._getNumSurroundingCellsAlive).toHaveBeenCalled();
            expect(engine._isLivingCellAliveNextPeriod).toHaveBeenCalled();
            expect(engine._isDeadCellAliveNextPeriod).not.toHaveBeenCalled();
        });

        it('It determines correctly if cell is dead', function() {
            var result = engine.isCellAliveNextPeriod([[1,1,1],[1,0,1],[1,1,1]], 1, 1);
            expect(engine._getNumSurroundingCellsAlive).toHaveBeenCalled();
            expect(engine._isDeadCellAliveNextPeriod).toHaveBeenCalled();
            expect(engine._isLivingCellAliveNextPeriod).not.toHaveBeenCalled();
        });
    });

})



