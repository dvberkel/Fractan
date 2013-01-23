(function(_, Backbone, Fractan, undefined){
    var FractanModel = Backbone.Model.extend({
        defaults : { finished : false },

        N : function(){
            return this.get("N");
        },

        finished : function(){
            return this.get("finished");
        },

        step : function(){
            var N = this.N();
            var result = _.first(
                _.filter(
                    _.map(this.get("fractions") || [], function(f){ return N.multiply(f); }),
                    function(g){ return g.isIntegral(); }
                )
            );
            if (result) { 
                this.set("N", result);
            } else {
                this.set("finished", true);
            }
        }
    });

    Fractan.Model = FractanModel;
})(_, Backbone, Fractan);
