var app = function()
{
    this.materials = {};
};

jQuery.noConflict();

(function(app, $)
{

  app.materials = {
    //Common functionality in all the app
    animationTrigger : function() {
      //$(window).scroll(function() {
        $('.animate--slideUp').each(function(){
          var imagePos = $(this).offset().top;
          var topOfWindow = $(window).scrollTop();

          if (imagePos < topOfWindow+400) {
            $(this).addClass("slideUp");
          }
        });
      //});
    },
  }

  // functionality page or sections specific
  //Syntax Note: app.sectionName = function(){}
  //Syntax Note: app.sectionName.functionName = function(args)
  app.locator = { //examples

    init : function(){
        // init app.locator.methods()
    }
  }

  app.scroll = function()
  {
    //Functions for page scroll
    app.materials.animationTrigger();
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
  }

    return app;
})(app, $ || jQuery);
window.onscroll = function()
{
  app.scroll();
}
window.onresize = function()
{
  app.resize();
}
window.onload = function()
{
  app.load();
  // TODO: remove app.init() from here and make it work properly into document.onload
  app.init();
};
document.onload = function()
{
  app.init();
};

