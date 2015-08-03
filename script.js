$(document).ready(function(event) {
  parallaxEnabled = true;

	var mouseX = event.pageX,
	 mouseY = event.pageY,
	 windowWidth = $(window).width(),
	 windowHeight = $(window).height(),

	 projects = {
	 	'kafka': [ 'css', 'sqlite', 'ejs', 'nodejs' ],
	 	'diner': ['backbone', 'sqlite', 'github', 'nodejs'],
	 	'party': [ 'sass', 'rubyrails', 'postgre', 'github'],
	 	'ottermate': [ 'angular', 'ajax', 'rails', 'sqlite']
	 }
  
  $("#lax").on("change", function(){
    var checked = $(this).prop("checked");
    if( checked == true ){
      parallaxEnabled = true;
      $(".character").css("margin-top", "350px");
    }else{
      parallaxEnabled = false;
      $(".content, .character").css({
        "-webkit-transform": "translateX(0%) translateY(0%)",
        "-moz-transform": "translateX(0%) translateY(0%)",
        "transform": "translateX(0%) translateY(0%)",
      });
      $(".character").css("margin-top", "0px");
    }
  });

	$(this).on("mousemove", function(event){

		speed = 25;

		mouseX = event.pageX;
		mouseY = event.pageY;

		percentX = ((mouseX/windowWidth) * speed) - (speed/0.75);
		percentY = ((mouseY/windowHeight) * speed) - (speed/0.6);
		stringX = (0-percentX-speed) + "%";
		stringY = (0-percentY-speed) + "%";

		percentCX = ((mouseX/windowWidth) * speed) - (speed/30);
		percentCY = ((mouseY/windowHeight) * speed) - (speed/90);
		stringCX = (0-percentCX-speed) + "%";
		stringCY = (0-percentCY-speed) + "%";

		$(".cursor").css({
			"-webkit-transform": "translateX(" + mouseX + "px) translateY(" + mouseY + "px)",
			"-moz-transform": "translateX(" + mouseX + "px) translateY(" + mouseY + "px)",
			"transform": "translateX(" + mouseX + "px) translateY(" + mouseY + "px)",
		});
    
    if(parallaxEnabled == true){

      $(".content").css({
        "-webkit-transform": "translateX(" + stringX + ") translateY(" + stringY + ")",
        "-moz-transform": "translateX(" + stringX + ") translateY(" + stringY + ")",
        "transform": "translateX(" + stringX + ") translateY(" + stringY + ")",
      });

      $(".character").css({
        "-webkit-transform": "translateX(" + stringCX + ") translateY(" + stringCY + ")",
        "-moz-transform": "translateX(" + stringCX + ") translateY(" + stringCY + ")",
        "transform": "translateX(" + stringCX + ") translateY(" + stringCY + ")",
      });
      
    }

	});

	$(".item-select").each(function(){
		$(this).find(".item").each(function(i){
			$(this).attr("data-item", i);
		});
	});

	$(".items-row, .stat").on("mouseover", function(){

		$(".cursor").addClass("focus");
		//$(".sentence").addClass("focus");

	}).on("mouseout", function(){

		$(".cursor").removeClass("focus");

	});

	$(".item-select .item").click(function(){

		var current = $(this).parent().parent().find(".equipped").html();
		var item = $(this).html();

		$(".item-info").remove();
		$(this).parent().parent().find(".equipped").html(item);
		$(this).html(current);
		console.log(current);
	});

	// on clicking the project
	$(".project").click(function() {
		// combinations for projects:
		projects[$(this).attr('id')].forEach(
			function(v, i) {
				var skill = $('#s-' + v),
				 equipped = skill.parent().parent().parent().find(".equipped").html(),
				 item = skill.parent().html();

				if (!skill.parent().hasClass('equipped')) {
					$(".item-info").remove();
					skill.parent().parent().parent().find(".equipped").html(item);
					skill.parent().html(equipped);
				}
			}
		);

	})

});