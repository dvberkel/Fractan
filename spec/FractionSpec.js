describe("Fraction", function(){
    it("should be reduced to lowest terms", function(){
        var p = Fractan.fraction(4,6);
        
        expect(p).toBeFraction(2,3);
    });

    it("should know if it is integral", function(){
	expect(Fractan.fraction(3,1).isIntegral()).toBeTruthy();
	expect(Fractan.fraction(1,3).isIntegral()).toBeFalsy();
    });

    describe("arithmetic", function(){
	beforeEach(function(){
            this.p = Fractan.fraction(2, 3);
            this.q = Fractan.fraction(7, 5);
	});

        it("should be possible to add two fractions", function(){
            var result = this.p.add(this.q);
            
            expect(result).toBeFraction(31,15);
        });

        it("should be possible to multiply fractions", function(){
            var result = this.p.multiply(this.q);

            expect(result).toBeFraction(14,15);
        });

        it("should be possible to invert fractions", function(){
            var result = this.p.invert();

            expect(result).toBeFraction(3,2);
        });

        it("should be possible to inverse fractions", function(){
            var result = this.p.inverse();

            expect(result).toBeFraction(-2,3);
        });
    });
});
