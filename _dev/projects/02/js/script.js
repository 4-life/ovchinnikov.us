"use strict";

var func = {
		opt: {
			score : 0,
			stage : 0,
			itemsCount : $("li").length
		},
		init: function(){
			var self = this;
			
			$("ul").width(self.opt.itemsCount*100+"%");	
			$("li").each( function(item) {				
				$(this).width(100 / self.opt.itemsCount + '%');
			});
			
			$(".start").swipe({
				excludedElements: "",
				tap:function(e){
					self.next();
				}
			});	
			
			$(".btn_reg").swipe({
				excludedElements: "",
				tap:function(e){
					if($(".name").val()!=""&&$(".sirname").val()!=""){
						self.next();
					}else{
						if($(".name").val()==""){
							$(".name").focus();
						}else if($(".sirname").val()==""){
							$(".sirname").focus();
						}else{
							$(".name").blur();
							$(".sirname").blur();
						}
					}
				}
			});	
			
			$(".question").find("label").swipe({
				excludedElements: "",
				tap:function(e){
					var value = $(this).find("input").val();
					
					self.opt.score+=parseInt(value)||0;
					
					
					self.opt.stage++;
					
					if($(".question").length==self.opt.stage){						
						if(self.opt.score<12){
							$("#result1").addClass("show");
						}else if(self.opt.score>11&&self.opt.score<15){
							$("#result2").addClass("show");
						}else if(self.opt.score>14&&self.opt.score<19){
							$("#result3").addClass("show");
						}else if(self.opt.score>18){
							$("#result4").addClass("show");
						}
						
						
						
					}
					
						self.next();
				}
			});	
			$(document).swipe({
				swipe:function(e){
					e.preventDefault();
					return false;
				}
			});		
				
		},
		next:function(){
			var self = this;
					$(".active").removeClass("active").next().addClass("active");
					var translateVal = -1 * ($(".active").index()) * 100 / self.opt.itemsCount;
					
					$("ul").css({
						"-webkit-transform":'translate3d(' + translateVal + '%,0,0)',
						"-moz-transform":'translate3d(' + translateVal + '%,0,0)',
						"-ms-transform":'translate3d(' + translateVal + '%,0,0)',
						"-o-transform":'translate3d(' + translateVal + '%,0,0)',
						"transform":'translate3d(' + translateVal + '%,0,0)',
					});
		}
	};

	

$(document).ready(function(){
	func.init();	
});	
	
	
	
	
	
	
	
	
	