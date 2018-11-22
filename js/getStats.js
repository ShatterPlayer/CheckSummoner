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
                alert(res.responseText);
            },
        
            error: function(res) {
                alert(res.responseText);
            }
        });
    });
});
//FIXME: Error wykonuje się w złym momencie