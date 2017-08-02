var app = function() {
  this.materials = {};
};

jQuery.noConflict();

(function(app, $)
{
  app.fired = false;

  app.materials = {
    //Common functionality in all the app
    animationTrigger : function(triggerClass, cb) {
        $(triggerClass).each( function() {
          var section = $(this).offset().top;
          var topOfWindow = $(window).scrollTop();

          if (section < topOfWindow+400){
            cb(this);
          }
        });
    },

    dropdownOpen : function() {
      $('.dropdown').on('click', 'a', function(event){
        var target = event.target
        $(target).parent().toggleClass('open');
      })
    }
  }

  // functionality page or sections specific
  //Syntax Note: app.sectionName = function(){}
  //Syntax Note: app.sectionName.functionName = function(args)
  app.numbers = {
    calcPerc : function(percent) {
      return [percent, 100-percent];
    },

    drawDonutChart : function(el, percent, width, height, text_y) {
      width = typeof width !== undefined ? width : 290; //width
      height = typeof height !== undefined ? height : 290; //height
      text_y = typeof text_y !== undefined ? text_y : "-.10em";

      var radius = Math.min(width, height) / 2;
      var pie = d3.pie().sort(null);

      var dataset = {
        lower: this.calcPerc(0),
        upper: this.calcPerc(percent)
      }
      //this.percents = percent;

      this.arc = d3.arc()
            .innerRadius(radius - 50)
            .outerRadius(radius);

      var svg = d3.select(el).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var path = svg.selectAll("path")
            .data(pie(dataset.lower))
            .enter().append("path")
            .attr("class", function(d, i) { return "color" + i })
            .attr("d", this.arc)
            .each(function(d) { this._currentArc = d; }); // store the initial values

      // add text in the center of the donut
      this.text = svg.append('text')
                .attr("text-anchor", "middle")
                .attr("dy", text_y)
                .attr("d", percent)

      if (typeof(percent) === "string") {
        this.text.text(percent);
      } else {

        var self = this;
        var timeout = setTimeout( function () {
          clearTimeout(timeout);

          path = path.data(pie(dataset.upper)); // update the data
          path.transition().ease(d3.easeExp).duration('500').attrTween("d", function(a){
            var progress = 0;
            var format = d3.format(".0%");
            // Store the displayed angles in _currentArc.
            // Then, interpolate from _currentArc to the new angles.
            // During the transition, _currentArc is updated in-place by d3.interpolate.
            var i  = d3.interpolate(this._currentArc, a);
            var i2 = d3.interpolate(progress, percent);
            this._currentArc = i(0);

            return function(t) {
              $(self.text).each(function(){
                $(this).text( format(i2(t) / 100) );
              });
              return self.arc(i(t));
            };

          }); // redraw the arcs

        }, 200);
      }
    },

    tweenPie : function(a, path) {
      var progress = 0;
      var format = d3.format(".0%");
      // Store the displayed angles in _current.
      // Then, interpolate from _current to the new angles.
      // During the transition, _current is updated in-place by d3.interpolate.
      var i  = d3.interpolate(this._current, a);
      var i2 = d3.interpolate(progress, app.numbers.percent);
      console.log('tweenPie', app.numbers.percent);
      this._current = i(0);
      return function(t) {
        app.numbers.text.text( format(i2(t) / 100) );
        return app.numbers.arc(i(t));
      };
    },

    init : function(){

      $('.donut').each( function() {
        var percent = $(this).data('donut');

        app.numbers.drawDonutChart(
          this,
          percent,
          190,
          190,
          ".35em"
        );
      })
    }
  },

  app.scroll = function() {
    //Functions for page scroll
    app.materials.animationTrigger('.animate--slideUp', function(classThis){
      $(classThis).addClass("slideUp");
    });

    if (app.fired === false) {
      app.materials.animationTrigger('.numbers', function(){
        app.numbers.init();
        app.fired = true;
      });
    }


  }
  app.resize = function()
  {
    //Functions for window resize
  }
  app.load = function()
  {
    //Functions for page load
  }
  app.init = function()
  {
    //Functions for page ready
    app.materials.dropdownOpen();
  }
  app.scrollOne = function() {

  }

    return app;
})(app, $ || jQuery);


window.onscroll = function() {
  /*
  if (document.body.scrollTop >= 1000 && app.fired === false) {
    console.log('This will happen only once');
    app.fired = true;
  }
  */
  app.scroll();
}
window.onresize = function() {
  app.resize();
}
window.onload = function() {
  app.load();
  app.init();
};

