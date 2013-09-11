$(function() {
	$.getJSON('expert_list.json', function(data) {
		var items = [];

		$.each(data, function(key, val) {
			items.push(
					'<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c">' +
					'<div class="ui-btn-inner ui-li">' +
						'<div class="ui-btn-text">' +
							'<a href="expert.html?id='+ val.id +'" class="ui-link-inherit" data-transition="slide">' +
								'<h3 class="ui-li-heading">' + val.name + '</h3>' +
								'<p class="ui-li-desc">' + val.title + '</p>' +
								'<p class="ui-li-desc">' + val.department + '</p>' +
							'</a>' +
						'</div>' +
						'<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>' +
					'</div>' +
					'</li>'); 
		});

		$('.expert-list').html(items.join(''));
	});
});
