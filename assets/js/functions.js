(function($) { 
  $(function() { 
    $('nav ul li a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      $('.dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    $('html').click(function() {
      $('.nav-dropdown').hide();
    });
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
  }); 
})(jQuery);

// efek text writer
var TXtType = function(e1,toRotate,period){
  this.toRotate = toRotate;
  this.e1 = e1;
  this.loopNum = 0;
  this.period = parseInt(period,10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};
TXtType.prototype.tick = function(){
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if( this.isDeleting){
    this.txt=fullTxt.substring(0,this.txt.length - 1);

  }else{
    this.txt = fullTxt.substring(0,this.txt.length + 1);
  }
  this.e1.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that =this;
  var delta = 200 - Math.random()* 100;
   if(this.isDeleting){delta /= 2;}
   if(!this.isDeleting && this.txt===fullTxt){
    delta===this.period;
    this.isDeleting= true;
   }else if(this.isDeleting&&this.txt=== ''){
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
   }
   setTimeout(function(){
    that.tick();
   },delta);

   window.onload = function(){
    var elements = document.getElementsByClassName('typewrite');
    for(var i=0; i<elements.length; i++){
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if(toRotate){
        new TXtType(elements[i],JSON.parse(toRotate),period);
      }
    }
    // inject css
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap {border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
   };
};


