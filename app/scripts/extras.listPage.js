(function(extras) {

	'use strict';

	var issues = []
	, pageInit = function() {

		$('.jtrac-list tr').not('.sortable').each(function() {
			var $cols = $(this).find('td')
			, $timeStamp = $cols.eq(6)
			, issue = {
				  id: $cols.eq(0).text()
				, summary: $cols.eq(1).text()
				, status: $cols.eq(2).text()
				, loggedBy: $cols.eq(3).text()
				, assignedTo: $cols.eq(4).text()
				, severity: $cols.eq(5).text()
				, timeStamp: {
					  element: $timeStamp.get(0)
					, text: $timeStamp.text()
				}
			};

			issues.push( issue );

			$timeStamp
				.attr( 'title', issue.timeStamp.text )
				.text( moment( issue.timeStamp.text ).fromNow() );
		});

	}

	// expose to extras API
	// --------------------
	extras.listPage = {
		  init: pageInit
		, issues: issues
	};

})( extras = extras || {}) ;
