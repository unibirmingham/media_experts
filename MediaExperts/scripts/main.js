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
		//items.push('<li data-expert-id="' + expert.Id  +'" data-fullname="' + expert.LastName + expert.FirstName + '" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c">' + expert.LastName + ", " + expert.FirstName + '</li>');
			items.push('<li data-expert-id="' + expert.Id  +'" data-fullname="' + expert.LastName.trim() + expert.FirstName.trim() + '" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c">' +
			'<div class="ui-btn-inner ui-li">' +
			'<div class="ui-btn-text">' +
			'<a href="#expert" class="ui-link-inherit" data-transition="slide">' +
			'<h3 class="ui-li-heading">' + expert.LastName + ", " + expert.FirstName + '</h3>' +
			'<p class="ui-li-desc">' + expert.JobTitles + '</p>' +
			'<p class="ui-li-desc">' + expert.Department + '</p>' +
			'</a>' +
			'</div>' +
			'<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>' +
			'</div>' +
			'</li>'); 
	});
	$('.expert-list').html(items.join(''));
    $('.expert-list li').sort(function(a,b){
        return $(a).attr("data-fullname") < $(b).attr("data-fullname");
    }).each(function(){
        $(".expert-list").prepend(this);
    })
    $('.expert-list').listview('refresh');
}


function loadExpert(){
	id = $('#expert').data('expert-id')
	expert = $('body').data('expertList')[id]
	$('#ex-page-title').text(expert.FirstName + " " + expert.LastName);	
	$('#ex-title').html(expert.JobTitles);	
	// check if exists
    $('#ex-image').attr('src', expert.Picture);	
	$('#ex-name').text(expert.FirstName + " " + expert.LastName);	
	$('#ex-department').text(expert.Department);	
	$('#ex-phone1').text(expert.Telephone1);	
	$('#ex-phone2').text(expert.Telephone2);	
	$('#ex-email').text(expert.Email);	
	$('#ex-expertise').html(expert.Expertise);	
	$('#ex-mediaExperience').html(expert.MediaExperience);	
}

