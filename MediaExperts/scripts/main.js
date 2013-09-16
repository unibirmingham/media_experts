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
		items.push('<li data-expert-id="' + expert.Id  +'" data-fullname="' + expert.LastName + expert.FirstName + '" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c">' + expert.LastName + ", " + expert.FirstName + '</li>');
			 
	});
	$('.expert-list').html(items.join(''));
    $('.expert-list li').sort(function(a,b){
        return new String($(a).attr("data-fullname")) < new String($(b).attr("data-fullname"));
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

