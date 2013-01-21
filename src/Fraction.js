(function(Fractan){
    var Fraction = function(numerator, denominator) {
        this.numerator = function(){ return numerator; };
        this.denominator = function(){ return denominator; };
    };

    Fraction.prototype.isIntegral = function(){
	return this.denominator() === 1;
    };

    var operationFactory = function(numeratorFactory, denominatorFactory){
        return function(q){
            var numerator = numeratorFactory(this, q);
            var denominator = denominatorFactory(this, q);
            return fractionFactory(numerator, denominator);
        };
    };

    Fraction.prototype.add = operationFactory(
	function(p, q){ return q.denominator() * p.numerator() + p.denominator() * q.numerator();     },
	function(p, q){ return p.denominator() * q.denominator(); }
    );

    Fraction.prototype.multiply = operationFactory(
	function(p, q){ return p.numerator() * q.numerator(); }, 
	function(p, q){ return p.denominator() * q.denominator(); }
    );
    
    Fraction.prototype.invert = operationFactory(
	function(p, q){ return p.denominator(); }, 
	function(p, q){ return p.numerator(); }
    );
    
    Fraction.prototype.inverse = operationFactory(
	function(p, q){ return -p.numerator(); }, 
	function(p, q){ return p.denominator(); }
    );
    
    var gcd = function greatestCommonDivisor(a, b){
        if (b === 0) { return a; }
        return greatestCommonDivisor(b, a % b);
    };

    var div = function(n,q){
        return Math.floor(n/q);
    };
    
    var fractionFactory = function(numerator, denominator) {
        var k = gcd(numerator, denominator);
        return new Fraction(div(numerator,k) , div(denominator,k));
    };

    Fractan.fraction = fractionFactory;
})(Fractan);
