/*
Author       : Dreamguys
Template Name: Doccure - Bootstrap Template
Version      : 1.3
*/

window.onload = function() {
    "use strict";
	
	// // Sidebar	
	// if($(window).width() <= 991){
	// var Sidemenu = function() {
	// 	this.$menuItem = $('.main-nav a');
	// };
	
	// function init() {
	// 	var $this = Sidemenu;
	// 	$('.main-nav a').on('click', function(e) {
	// 		if($(this).parent().hasClass('has-submenu')) {
	// 			e.preventDefault();
	// 		}
	// 		if(!$(this).hasClass('submenu')) {
	// 			$('ul', $(this).parents('ul:first')).slideUp(350);
	// 			$('a', $(this).parents('ul:first')).removeClass('submenu');
	// 			$(this).next('ul').slideDown(350);
	// 			$(this).addClass('submenu');
	// 		} else if($(this).hasClass('submenu')) {
	// 			$(this).removeClass('submenu');
	// 			$(this).next('ul').slideUp(350);
	// 		}
	// 	});
	// }
	// // Sidebar Initiate
	// init();
	// }
	
	// Textarea Text Count	
	var maxLength = 100;
	$('#review_desc').on('keyup change', function () {
		var length = $(this).val().length;
		 length = maxLength-length;
		$('#chars').text(length);
	});
		
	// Floating Label
	if($('.floating').length > 0 ){
		$('.floating').on('focus blur', function (e) {
		$(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
		}).trigger('blur');
	}
	
	// Mobile menu sidebar overlay	
	$('body').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btn', function() {
		$('main-wrapper').toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').addClass('menu-opened');
		return false;
	});
	
	$(document).on('click', '.sidebar-overlay', function() {
		$('html').removeClass('menu-opened');
		$(this).removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
	});
	
	$(document).on('click', '#menu_close', function() {
		$('html').removeClass('menu-opened');
		$('.sidebar-overlay').removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
	});
	
	// Add More Hours	
    $(".hours-info").on('click','.trash', function () {
		$(this).closest('.hours-cont').remove();
		return false;
    });

    $(".add-hours").on('click', function () {
		
		var hourscontent = '<div class="row form-row hours-cont">' +
			'<div class="col-12 col-md-10">' +
				'<div class="row form-row">' +
					'<div class="col-12 col-md-6">' +
						'<div class="form-group">' +
							'<label>Start Time</label>' +
							'<select class="form-control">' +
								'<option>-</option>' +
								'<option>12.00 am</option>' +
								'<option>12.30 am</option>' + 
								'<option>1.00 am</option>' +
								'<option>1.30 am</option>' +
							'</select>' +
						'</div>' +
					'</div>' +
					'<div class="col-12 col-md-6">' +
						'<div class="form-group">' +
							'<label>End Time</label>' +
							'<select class="form-control">' +
								'<option>-</option>' +
								'<option>12.00 am</option>' +
								'<option>12.30 am</option>' +
								'<option>1.00 am</option>' +
								'<option>1.30 am</option>' +
							'</select>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="col-12 col-md-2"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' +
		'</div>';
		
        $(".hours-info").append(hourscontent);
        return false;
	});
	
	// Chat
	var chatAppTarget = $('.chat-window');
	(function() {
		if ($(window).width() > 991)
			chatAppTarget.removeClass('chat-slide');
		
		$(document).on("click",".chat-window .chat-users-list a.media",function () {
			if ($(window).width() <= 991) {
				chatAppTarget.addClass('chat-slide');
			}
			return false;
		});
		$(document).on("click","#back_user_list",function () {
			if ($(window).width() <= 991) {
				chatAppTarget.removeClass('chat-slide');
			}	
			return false;
		});
	})();
	
	// Circle Progress Bar
	
	function animateElements() {
		$('.circle-bar1').each(function () {
			var elementPos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			var percent = $(this).find('.circle-graph1').attr('data-percent');
			var animate = $(this).data('animate');
			if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
				$(this).data('animate', true);
				$(this).find('.circle-graph1').circleProgress({
					value: percent / 100,
					size : 400,
					thickness: 30,
					fill: {
						color: '#da3f81'
					}
				});
			}
		});
		$('.circle-bar2').each(function () {
			var elementPos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			var percent = $(this).find('.circle-graph2').attr('data-percent');
			var animate = $(this).data('animate');
			if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
				$(this).data('animate', true);
				$(this).find('.circle-graph2').circleProgress({
					value: percent / 100,
					size : 400,
					thickness: 30,
					fill: {
						color: '#68dda9'
					}
				});
			}
		});
		$('.circle-bar3').each(function () {
			var elementPos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			var percent = $(this).find('.circle-graph3').attr('data-percent');
			var animate = $(this).data('animate');
			if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
				$(this).data('animate', true);
				$(this).find('.circle-graph3').circleProgress({
					value: percent / 100,
					size : 400,
					thickness: 30,
					fill: {
						color: '#1b5a90'
					}
				});
			}
		});
	}	
	
	if($('.circle-bar').length > 0) {
		animateElements();
	}
	$(window).scroll(animateElements);
	
	// Preloader
	
	$(window).on('load', function () {
		if($('#loader').length > 0) {
			$('#loader').delay(350).fadeOut('slow');
			$('body').delay(350).css({ 'overflow': 'visible' });
		}
	})
	// Signup Toggle
	$(function () {
        $("#is_registered").click(function () {
            if ($(this).is(":checked")) {
                $("#preg_div").show();
            } else {
                $("#preg_div").hide();
            }
        });
    });
	
	//Increment Decrement value
	$('.inc.button').click(function(){
	    var $this = $(this),
	        $input = $this.prev('input'),
	        $parent = $input.closest('div'),
	        newValue = parseInt($input.val())+1;
	    $parent.find('.inc').addClass('a'+newValue);
	    $input.val(newValue);
	    newValue += newValue;
	});
	$('.dec.button').click(function(){
	    var $this = $(this),
	        $input = $this.next('input'),
	        $parent = $input.closest('div'),
	        newValue = parseInt($input.val())-1;
	    console.log($parent);
	    $parent.find('.inc').addClass('a'+newValue);
	    $input.val(newValue);
	    newValue += newValue;
	});

	// Signup Profile
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$('#prof-avatar').attr('src', e.target.result);
			};

			reader.readAsDataURL(input.files[0]);
		}
	}
	$("#profile_image").change(function() {
		readURL(this);
	});

	// Datepicker
	  var maxDate = $('#maxDate').val();
	  if($('#dob').length > 0) {
	  $('#dob').datepicker({
		  startView: 2,
		  format: 'dd/mm/yyyy',
		  autoclose: true,
		  todayHighlight: true,
		  endDate: maxDate
	  });
	}
	if($('#editdob').length > 0) {
	  $('#editdob').datepicker({
		startView: 2,
		format: 'dd/mm/yyyy',
		autoclose: true,
		todayHighlight: true,
		endDate: maxDate
	});
	}
	if($('#dep-dob').length > 0) {
		$('#dep-dob').datepicker({
			startView: 2,
			format: 'dd/mm/yyyy',
			autoclose: true,
			todayHighlight: true,
			endDate: maxDate
		});
	  }
	  if($('#dep-editdob').length > 0) {
		$('#dep-editdob').datepicker({
		  startView: 2,
		  format: 'dd/mm/yyyy',
		  autoclose: true,
		  todayHighlight: true,
		  endDate: maxDate
	  });
	  }
}

addEventListener("DOMContentLoaded", (event) => {
	debugger;
	const password = document.getElementById("password-input");
	const passwordAlert = document.getElementById("password-alert");
	const requirements = document.querySelectorAll(".requirements");
	const leng = document.querySelector(".leng");
	const bigLetter = document.querySelector(".big-letter");
	const num = document.querySelector(".num");
	const specialChar = document.querySelector(".special-char");

	requirements.forEach((element) => element.classList.add("wrong"));
	if (password != null && password != undefined) { 
		password.addEventListener("focus", () => {
			passwordAlert.classList.remove("d-none");
			if (!password.classList.contains("is-valid")) {
				password.classList.add("is-invalid");
			}
		});

		password.addEventListener("input", () => {
			const value = password.value;
			const isLengthValid = value.length >= 8;
			const hasUpperCase = /[A-Z]/.test(value);
			const hasNumber = /\d/.test(value);
			const hasSpecialChar = /[!@#$%^&*()\[\]{}\\|;:'",<.>/?`~]/.test(value);

			leng.classList.toggle("good", isLengthValid);
			leng.classList.toggle("wrong", !isLengthValid);
			bigLetter.classList.toggle("good", hasUpperCase);
			bigLetter.classList.toggle("wrong", !hasUpperCase);
			num.classList.toggle("good", hasNumber);
			num.classList.toggle("wrong", !hasNumber);
			specialChar.classList.toggle("good", hasSpecialChar);
			specialChar.classList.toggle("wrong", !hasSpecialChar);

			const isPasswordValid = isLengthValid && hasUpperCase && hasNumber && hasSpecialChar;

			if (isPasswordValid) {
				password.classList.remove("is-invalid");
				password.classList.add("is-valid");

				requirements.forEach((element) => {
					element.classList.remove("wrong");
					element.classList.add("good");
				});

				passwordAlert.classList.remove("alert-warning");
				passwordAlert.classList.add("alert-success");
			} else {
				password.classList.remove("is-valid");
				password.classList.add("is-invalid");

				passwordAlert.classList.add("alert-warning");
				passwordAlert.classList.remove("alert-success");
			}
		});

		password.addEventListener("blur", () => {
			passwordAlert.classList.add("d-none");
		});
	}
	
});