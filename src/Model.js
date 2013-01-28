(function($, _, Backbone, Fractan, undefined){
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

    var BaseView = Backbone.View.extend({
        template : _.template("<<%= type %>'/>"),

        initialize : function(){
            this.render();
        },

        render : function(){
            this.container();
        },

        container : function(){
            if (!this._container) {
                var container = $(this.template({ type : this.containerType() }));
                _.each(this.classes(), function(aClass){
                    container.addClass(aClass);
                });
                container.appendTo(this.$el);
                this._container = container;
            }
            return this._container;
        },
        
        containerType : function(){
            return "div";
        },
        
        classes : function(){
            return [];
        }
    });

    var FractanView = BaseView.extend({
        render : function(){
            var container = this.container();
            new NView({ el : container, model : this.model });
            new FractionsView({ el : container, model : this.model });
        },

        classes : function(){
            return [ "container" ];
        }
    });

    var NView = BaseView.extend({
        render : function(){
            var container = this.container();
            new FractionView({ el : container, model : this.model });
        },
        
        classes : function(){
            return [ "N" ];
        }
    });
    
    var FractionView = BaseView.extend({
        render : function(){
            var container = this.container();
            new NumeratorView({ el : container, model : this.model });
            new DenominatorView({ el : container, model : this.model });
        },

        classes : function(){
            return [ "fraction" ];
        }
    });

    var NumeratorView = BaseView.extend({
        classes : function(){
            return [ "numerator" ];
        }
    });

    var DenominatorView = BaseView.extend({
        classes : function(){
            return [ "denominator" ];
        }
    });

    var FractionsView = BaseView.extend({
        classes : function(){
            return [ "fractions" ];
        }
    });
    
    Fractan.Model = FractanModel;
    Fractan.View = FractanView;
})(jQuery, _, Backbone, Fractan);
