$(function() {
    
    $('.form__submit').click(function() {
        var server = $('.form__server').html();
        $.ajax({
            url: 'https://api.checksummoner.ml',
            method: 'POST',
            dataType: 'JSON',
            data: {
                nick: $('.form__nick').val(),
                server: $('.servers__item[data-server="'+server+'"]').data('endpoint')
            },
        
            success: function(res) {
                console.log(res);
            },
        
            error: function(res) {
                console.log(res);
            }
        });
    });
});
//FIXME: Error wykonuje się w złym momencie