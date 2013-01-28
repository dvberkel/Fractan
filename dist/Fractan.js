/*! Fractan - v0.0.0 - 2013-01-28
 * https://github.com/dvberkel/Fractan
 * Copyright (c) 2013 Daan van Berkel; Licensed MIT
 */

Fractan = {
    "version" : "0.0.0"
};

(function(Backbone, Fractan){
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
})(Backbone, Fractan);

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
