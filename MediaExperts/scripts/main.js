$(function() {
	fetchExpertList();
	populateExpertList();

	$("#expert" ).on("pagebeforeshow", function(event){loadExpert();})

	$('.expert-list li').click(function() {
		$('#expert').data('expert-id', $(this).data('expert-id'));
	});	

});

function fetchExpertList() {
	$.ajax({
		dataType: "json",
		url: 'expert_list.json',
		async:false,
		success: function(data){
			$('body').data('expertList', data)
		}
	})
};

function populateExpertList(){
	var items = []
	var expertList = $('body').data('expertList')
	$.each(expertList, function(key, expert) {
		items.push(
			'<li data-expert-id="' + expert.id  +'" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c">' +
			'<div class="ui-btn-inner ui-li">' +
			'<div class="ui-btn-text">' +
			'<a href="#expert" class="ui-link-inherit" data-transition="slide">' +
			'<h3 class="ui-li-heading">' + expert.name + '</h3>' +
			'<p class="ui-li-desc">' + expert.title + '</p>' +
			'<p class="ui-li-desc">' + expert.department + '</p>' +
			'</a>' +
			'</div>' +
			'<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>' +
			'</div>' +
			'</li>'); 
	});
	$('.expert-list').html(items.join(''));
}

function loadExpert(){
	id = $('#expert').data('expert-id')
	expert = $('body').data('expertList')[id]
	$('#ex-page-title').text(expert.title + " " + expert.name);	
	$('#ex-title').text(expert.title);	
	$('#ex-image').attr('src', expert.picture);	
	$('#ex-name').text(expert.name);	
	$('#ex-department').text(expert.department);	
	$('#ex-phone1').text(expert.phone1);	
	$('#ex-phone2').text(expert.phone2);	
	$('#ex-email').text(expert.email);	
	$('#ex-expertise').text(expert.expertise);	
	$('#ex-media-experience').text(expert.mediaExperience);	
}
