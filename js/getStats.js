function getStats(){
    var server = $('.form__server').html();
    $.ajax({
        url: 'https://api.checksummoner.ml',
        method: 'POST',
        dataType: 'JSON',
        data: {
            name: $('.form__name').val(),
            server: $(`.servers__item[data-server="${server}"]`).data(`endpoint`),
            recaptcha: grecaptcha.getResponse()
        },
    
        success: function(res) {
            console.log(res);
        },
    
        error: function(res) {
            console.log(res);
        }
    });
}