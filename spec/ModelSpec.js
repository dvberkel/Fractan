describe("Fractan Model", function(){
    it("should have a Number N with an array of fractions", function(){
        var model = new Fractan.Model({
            N : Fractan.fraction(14, 3),
            fractions: [Fractan.fraction(1,2), Fractan.fraction(3,7)]
        });

        expect(model.N()).toBeFraction(14,3);
    });

    it("should update N with the first integral N times f_i", function(){
        var model = new Fractan.Model({
            N : Fractan.fraction(14, 3),
            fractions: [Fractan.fraction(1,2), Fractan.fraction(3,7)]
        });

	model.step();
	
        expect(model.N()).toBeFraction(2,1);
    });
});
