(function(_, Backbone, Fractan, undefined){
    var FractanModel = Backbone.Model.extend({
        N : function(){
            return this.get("N");
        },

        step : function(){
            var N = this.N();
	    var result = _.first(
		_.filter(
		    _.map(this.get("fractions") || [], function(f){ return N.multiply(f); }),
		    function(g){ return g.isIntegral() }
		)
	    );
	    if (result) { this.set("N", result); }
        }
    });

    Fractan.Model = FractanModel;
})(_, Backbone, Fractan);
