$(function() {
	var server = $(".form__server");
	var form = $(".form");
	var servers = $(".servers");
	var servers__item = $(".servers__item");
	server.html("NA");
	server.click(function() {
		form.fadeOut(100, function() {
			servers.fadeIn();
		});
	});

	servers__item.click(function() {
		if ($(this).data("server") != "STOP") server.html($(this).data("server"));

		servers.fadeOut(100, function() {
			form.fadeIn();
		});
	});
});
