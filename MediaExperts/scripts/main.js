$(function() {
	fetchExpertList();
    //fetchExpertListLive();
	populateExpertList();

	$("#expert" ).on("pagebeforeshow", function(event){

        loadExpert();
    });
    


	$('.expert-list li').click(function() {
		$('#expert').data('expert-id', $(this).data('expert-id'));

	});	
    
   $(document).on('pagebeforecreate', '[data-role="page"]', function(){     
    setTimeout(function(){
        $.mobile.loading('show');
    },1);    
});

$(document).on('pageshow', '[data-role="page"]', function(){  
    setTimeout(function(){
        $.mobile.loading('hide');
    },300);      
});
    

});

function refreshList() {

    
}


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
	var expertList = $('body').data('expertList');
    $.each(expertList, function(key, expert) {
    
		//items.push('<li data-expert-id="' + expert.Id  +'" data-fullname="' + expert.LastName + expert.FirstName + '" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c">' + expert.LastName + ", " + expert.FirstName + '</li>');
			items.push('<li data-expert-id="' + expert.Id  +'" data-fullname="' + expert.LastName.trim() + expert.FirstName.trim() +'" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c">' +
			'<div class="ui-btn-inner ui-li">' +
			'<div class="ui-btn-text">' +
			'<a href="#expert" class="ui-link-inherit" data-transition="slide">' +
			'<h3 class="ui-li-heading">' + expert.LastName + ", " + expert.FirstName + '</h3>' +
			'<p class="ui-li-desc">' + expert.JobTitles + '</p>' +
			'<p class="ui-li-desc">' + expert.Department + '</p>' +
            '<p class="ui-li-desc tags_list">' + expert.Tags + '</p>' +
			'</a>' +
			'</div>' +
			'<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>' +
			'</div>' +
			'</li>'); 
	});

	$('.expert-list').html(items.join(''));
    $('.expert-list li').sort(function(a,b){
        return $(b).attr("data-fullname").toUpperCase().localeCompare($(a).attr("data-fullname").toUpperCase());
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
	
    // check if exists and if network connection
    if (!(navigator.connection.type === Connection.NONE) && expert.Picture.length>28 && UrlExists(expert.Picture)) {
            $('#ex-image').attr('src', expert.Picture);
    }
    else {
        $('#ex-image').attr('src', 'images/prof.png');
    }
	$('#ex-name').text(expert.FirstName + " " + expert.LastName);	
	$('#ex-department').text(expert.Department);	
	
    //$('#ex-phone2').text(expert.Telephone2);	
	$('#ex-mail .ui-btn-text').text(expert.Email)
    $('#ex-mail').attr("href","mailto:" + expert.Email);	
    if (expert.Telephone.length>4) {
        $('#ex-phone1 .ui-btn-text').text(expert.Telephone);
        $('#ex-phone1').attr("href","tel:" + expert.Telephone);
	}
    else {
        $('#ex-phone1 .ui-btn-text').html("<span class='message-small'>Please contact the Press office</span>");
        $('#ex-phone1').attr("href","#press-page").buttonMarkup({icon: "link"});
    }
    $('#ex-expertise').html(expert.Expertise);
    
    var experience = expert.MediaExperience;
    experience.trim();

	if (experience.length>16) { // && !experience=="<br>") {
        $('#ex-mediaExperience').html(expert.MediaExperience);
        $('#mediaExperience').show()
    }	
    else
    {
        $('#mediaExperience').hide();
    }

}


function UrlExists(url) {
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status!=404;
}

