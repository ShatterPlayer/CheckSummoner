function league(ranked, index) {
  $('#js-rimg' + index).attr(
    'src',
    'img/' + ranked.tier.toLowerCase() + '.png'
  );

  $('#js-rtier' + index).html(ranked.tier + ' ' + ranked.rank);
  $('#js-rwins' + index).html('Wins: ' + ranked.wins);
  $('#js-rloses' + index).html('Loses: ' + ranked.losses);
  $('#js-rpoints' + index).html('Points: ' + ranked.points);

  $('#js-rank' + index).addClass('rank--has-hover');
}

function success(res) {
  console.log(res);
  //Start animation
  $('.change').animate(
    {
      left: 0
    },
    300,
    function() {
      $('main').load('stats.html', function() {
        $(window).scrollTop(0);

        //Display player info
        $('.player__icon').attr(
          'src',
          'https://ddragon.leagueoflegends.com/cdn/' +
            res.version +
            '/img/profileicon/' +
            res.summoner.iconId +
            '.png'
        );
        $('.player__nick').html(res.summoner.name);
        $('.player__lvl').html('LVL: ' + res.summoner.lvl);

        //Display league info
        if (res.league) {
          if (res.league.RANKED_FLEX_SR) {
            league(res.league.RANKED_FLEX_SR, 0);
          }

          if (res.league.RANKED_SOLO_5x5) {
            league(res.league.RANKED_SOLO_5x5, 1);
          }

          if (res.league.RANKED_FLEX_TT) {
            league(res.league.RANKED_FLEX_TT, 2);
          }
        }

        //Display mastery info
        var i = 0;
        if (res.mastery) {
          res.mastery.forEach(function(m) {
            $('#js-mimg' + i).attr(
              'src',
              'https://ddragon.leagueoflegends.com/cdn/' +
                res.version +
                '/img/champion/' +
                m.id +
                '.png'
            );

            $('#js-mname' + i).html(m.name);
            $('#js-mlvl' + i).html('Level ' + m.lvl);
            $('#js-mpoints' + i).html('Points ' + m.points);

            i++;
          });
        }

        //Display matches info

        if (res.match) {
          res.match.forEach(function(match) {
            var newMatch =
              '<div class="match"><img class="match__img" src="https://ddragon.leagueoflegends.com/cdn/' +
              res.version +
              '/img/champion/' +
              match.champId +
              '.png" alt="match" /><div class="match__info"><span class="match__text match__text--champ">' +
              match.champName +
              '</span><span class="match__text match__text--lane">Lane: ' +
              match.lane +
              '</span></div><span class="match__text match__text--time">' +
              match.time +
              '</span></div>';

            $('#js-matchwrapper').html($('#js-matchwrapper').html() + newMatch);
          });
        } else {
          $('#js-matchwrapper').html(
            '<span class="match__text match__text--nothing">No matches found</span>'
          );
        }

        //End animation
        $('.change').animate(
          {
            left: '-100%'
          },
          300
        );
      });
    }
  );
}

function error(res) {
  grecaptcha.reset();
  $('.form__submit').removeClass('form__submit--clicked');
  $('.form__submit').html('CHECK!');
  $('.form__overlay').removeAttr('style');
  if (!res) $('.form__error').html('No internet connection');
  else $('.form__error').html(res.responseText);
}

function getStats() {
  var server = $('.form__server').html();
  var gResp = grecaptcha.getResponse();
  if (!gResp) error();

  $.ajax({
    url: 'https://checksummoner.000webhostapp.com/',
    method: 'POST',
    dataType: 'JSON',
    data: {
      name: $('.form__name').val(),
      server: $('.servers__item[data-server="' + server + '"]').data(
        'endpoint'
      ),
      recaptcha: gResp
    },

    success: function(res) {
      success(res);
    },

    error: function(res) {
      error(res);
    }
  });
}

function submit() {
  $('.form__submit').addClass('form__submit--clicked');
  $('.form__submit').html('<i class="fas fa-spinner fa-spin"></i>');
  $('.form__overlay').css('display', 'block');
  grecaptcha.execute();
}
