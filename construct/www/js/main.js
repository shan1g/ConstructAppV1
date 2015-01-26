// jquery and device loads
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}
// device APIs are available
function onDeviceReady() {
	// Now safe to use device APIs
	$(document).foundation({
		offcanvas : {
			// Sets method in which offcanvas opens.
			// [ move | overlap_single | overlap ]
			open_method: 'overlap',
			// Should the menu close when a menu link is clicked?
			// [ true | false ]
			close_on_click : true
		}
	});
	if (navigator.notification) { // Override default HTML alert with native dialog
		window.alert = function (message) {
			navigator.notification.alert(
				message,    // message
				null,       // callback
				"Workshop", // title
				'OK'        // buttonName
			);
		};
	};
	FastClick.attach(document.body);
}

// check if app put in background
document.addEventListener("pause", onPause, false);

function onPause() {
	// Handle the pause event
}

// check if app retrieved from background
document.addEventListener("resume", onResume, false);

function onResume() {
	// Handle the resume event
}

// local test
$(document).foundation();