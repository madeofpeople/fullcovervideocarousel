if(!app) var app = {
  uuid: 0
};

jQuery( document ).ready( function ($) {

  app.uniqueId = function(label){
    label = (label)? label + '-' : 'id-';
    app.uuid++;
    return label + app.uuid;
  }

  app.initVideos = function( actuator ) {
    $(".video-bg").each( function(){
      app.initVideoBg( $(this) );
    });
  };

  app.playVideo = function( vid, actuator ){
    vid.play();
    if( !actuator ) return; 
    if( $(actuator).data('actuator-pause-text') ){
      console.log("play A");
      playText = $(actuator).data('actuator-pause-text');
      $(actuator).html( playText );
    }
  },

  app.pauseVideo = function( vid, actuator ){
    console.log('pauseVideo',vid);
    vid.pause();
    if( !actuator ) return; 
    if( $(actuator).data('actuator-play-text') ){
      console.log("pause A");
      playText = $(actuator).data('actuator-play-text');
    }
    console.log(playText);
    $(actuator).html( playText );
  },

  app.resetVideo = function( vid, actuator ){
    app.pauseVideo( vid, actuator );
    vid.currentTime(0);
  },

  app.initVideoBg = function( container ) {
    var vidEl = container.find( '.video-wrapper' ).first();
    vidEl.hide();
    vidEl.hide();
    var vid = new $.BigVideo( { doLoop: false, controls: false, container: vidEl, useFlashForFirefox:false } );
    vid.init();
    vid.show( vidEl.data("webm-source"), { altSource: vidEl.data('ogv-source') } );
    var pl = vid.getPlayer();
    pl.on("ended", function(a){
      console.log("ended",a);
      app.resetVideo( pl, actuator );
    });
    pl.on("loadedmetadata", function(vid){
      console.log("loadedmetadata",vid);
      vidEl.show();
    });
    var actuator = container.find('.playButton');
    if( actuator ) {
      label = $(actuator).html(); 
      playText = $(actuator).data('actuator-play-text', label );
      actuator.click( function(e) {
        e.preventDefault();
        e.stopPropagation();
        var playText;
        if ( pl.paused() ) {
          app.playVideo(pl,this);
        } else {
          app.pauseVideo(pl,this);
        }
      });
    }
  };

  app.initCarousel = function(){
    $("#videos #video-stories").owlCarousel({
      navigation : false,
      singleItem : true,
      lazyLoad : true,
      afterInit : function(elem){
        var that = this;
        that.owlControls.appendTo( $('#header .videoNavContainer') );
      }
    });
  }

  app.initVideos();
  app.initCarousel();

  // $(window).resize(function () {
  //   ...
  // });

});
