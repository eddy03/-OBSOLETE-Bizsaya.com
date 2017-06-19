$(document).ready(function () {
  $('#menu-home').addClass('active');

  var firstTime = true
  var starting = {
    pages: 0,
    notification: 0,
    response: 0,
    contacts: 0
  }

  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')

  $.each(hashes, function(key, value) {
    if(value === 'err=403') {
      var text = 'Sesi akaun telah tamat/tidak sah. Sila log masuk semula'
      $('#injectNotification').append('<div class="alert alert-danger"><div class="container">'+text+'</div></div>')
    } else if(value === 'err=401') {
      var text = 'Akaun anda telah tamat tempoh aktif ataupun dibatalkan. Sila buat pembayaran terlebih dahulu atau menghubungi kami di laman FB Bizsaya'
      text += '<br class="hidden-md hidden-lg" /><span class="hidden-xs hidden-sm">&nbsp; &nbsp; &nbsp;</span><div class="fb-messengermessageus" messenger_app_id="175920109485664" page_id="136294510112823" color="blue" size="xlarge" > </div> '
      $('#injectNotification').append('<div class="alert alert-danger"><div class="container">'+text+'</div></div>')
    } else if(value === 'err=400') {
      var text = 'Oopss. Anda tidak membenarkan beberapa akses yang Bizsaya minta. Sila benarkan akses untuk Bizsaya automasikan FB page anda. Sila cuba semula'
      $('#injectNotification').append('<div class="alert alert-info"><div class="container">'+text+'</div></div>')
    }
  })

  FireBaseApp.database().ref('realtime_administrator').on('value', function(values) {

    if(values.val()) {
      var val = values.val()

      $('#stats-pages').countTo({
        from: starting.pages,
        to: val.totalPages,
        speed: 2000,
        onComplete: function(value) {
          starting.pages = val.totalPages
        }
      })
      $('#stats-notification').countTo({
        from: starting.notification,
        to: val.totalRx,
        speed: 2000,
        onComplete: function(value) {
          starting.notification = val.totalRx
        }
      })
      $('#stats-response').countTo({
        from: starting.response,
        to: val.totalTx,
        speed: 2000,
        onComplete: function(value) {
          starting.response = val.totalTx
        }
      })
      $('#stats-contacts').countTo({
        from: starting.contacts,
        to: val.totalContactProcess,
        speed: 2000,
        onComplete: function(value) {
          starting.contacts = val.totalContactProcess
        }
      })

    }

  })
});