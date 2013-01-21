beforeEach(function() {
    this.addMatchers({
        toBeFraction : function(expectedNumerator, expectedDenominator) {
            var q = this.actual;
            return q.numerator() === expectedNumerator && q.denominator() === expectedDenominator;
        }
    });
});
