window.extAsyncInit = function () { }

// the Messenger Extensions JS SDK is done loading

var uId = null
var psId = null
var pageId = null
var productId = null
var timeChecker = null
_.each(window.location.search.split('&'), function (param) {
  var matchKeyword = param.match(/^(.*)=/g)

  if(matchKeyword && matchKeyword.length === 1) {
    matchKeyword = matchKeyword[0].replace(/\W/g, '')
    if(matchKeyword === 'uid') {
      uId = param.replace(/^(.*)=/g, '')
    } else if(matchKeyword === 'psid') {
      psId = param.replace(/^(.*)=/g, '')
    } else if(matchKeyword === 'pg') {
      pageId = param.replace(/^(.*)=/g, '')
    } else if(matchKeyword === 'ac') {
      timeChecker = param.replace(/^(.*)=/g, '')
    }

  } else {
    console.warn('Parameters have been tempered. Discontinue processing')
  }

})

window.superagent
  .get(APIURL+'buying/publics/'+window.location.search)
  .end(function (err, response) {
    if(err) {
      console.error(err)
    } else {
      if(response.body.data && response.body.data.buyer_name && response.body.data.sales !== false) {
        console.log(response.body.data)
        $('#form-fullname').val(response.body.data.buyer_name)
        $('#confirm-name').text(response.body.data.buyer_name)

        if(response.body.data.email) {
          $('#form-email').val(response.body.data.email)
          $('#confirm-email').text(response.body.data.email)
        }
        if(response.body.data.phone || response.body.data.address) {
          $('#form-phone').val(response.body.data.phone)
          $('#form-address').val(response.body.data.address)
          $('#confirm-phone').text(response.body.data.phone)
          $('#confirm-address').text(response.body.data.address)
        }


        $('#page-name').text(response.body.data.page_name)

        // Handle product
        if(response.body.data.product) {

          $('.product-name').text(response.body.data.product.name)
          $('.product-description').text(response.body.data.product.description)
          $('.product-price').text('RM'+parseFloat(response.body.data.product.price).toFixed(2))
          if(response.body.data.product.images.length !== 0) {
            $('.product-img').attr('src', response.body.data.product.images[0])
          }

        } // Handle products
        else {

        }

        var paymentList = ''

        _.each(response.body.data.sales.banks_accounts, function(account) {
          paymentList += '<div style="border-bottom: 1px solid #eee; padding-bottom: 10px; padding-top: 5px;">' +
            '<div style="min-width: 100px; display: inline-block">'+account.bank_name+'</div>' +
            '<div style="display: inline-block"><strong><code>'+account.account_number+'</code> ['+account.account_owner+']</strong></div>' +
            '</div>'
        })

        $('#payment_account_list').html(paymentList)
      }
    }
  })

Dropzone.autoDiscover = false;

var myDropzone = new Dropzone("div#payment-detail", {
  url: "/file/post",
  paramName: "file", // The name that will be used to transfer the file
  maxFiles: 1,
  maxFilesize: 2, // MB
  acceptedFiles: 'image/*,application/pdf',
  autoProcessQueue: false,
  thumbnailWidth: null,
  addRemoveLinks: true,
  init: function() {
    this.on('addedfile', function(file) {
      $('#error-form-payment').hide()
      myDropzone.getAcceptedFiles().map(function(oldFile) {
        myDropzone.removeFile(oldFile);
      })
    })
    this.on('sending', function(file) {
      console.log('Sending', file)
    })
  },
  previewsContainer: ".dropzone-previews",
  dictDefaultMessage: 'Muat naik bukti pembayaran anda disini. Klik sini.',
  dictFallbackMessage: 'Opps, Pelayar yang anda gunakan tidak boleh muat naik fail.',
  dictFallbackText: 'Sila muat naik bukti pembayaran anda disini.',
  dictFileTooBig: 'Alamak. Gambar/PDF tersebut besar sangat. Sila pilih gambar/PDF yang lebih kecil',
  dictInvalidFileType: 'File tersebut tidak dibenarkan',
  dictResponseError: 'Opps. Terdapat ralat sewaktu muat naik bukti pembayaran',
  dictCancelUpload: 'Batal muat naik',
  dictCancelUploadConfirmation: 'Adakah anda pasti untuk membatalkan muat naik bukti pembayaran ini',
  dictRemoveFile: 'Buang/padam bukti pembayaran'
});

$('#form-tab a').click(function (e) {
  e.preventDefault()
})

$('#form-fullname, #form-phone, #form-address').click(function () {
  $('#error-form').hide()
})

$('#form-email, #form-fullname, #form-phone, #form-address').on('change', function () {
  $('#confirm-email').text($('#form-email').val())
  $('#confirm-name').text($('#form-fullname').val())
  $('#confirm-address').text($('#form-address').val())
  $('#confirm-phone').text($('#form-phone').val())
})

$('.next-step').click(function () {

  var nextStep = $(this).attr('data-next')

  if($(this).attr('data-validation')) {
    var form_fullname = $('#form-fullname').val()
    var form_phone = $('#form-phone').val()
    var form_address = $('#form-address').val()

    $('#error-form').hide()

    if(
      form_fullname.replace(/\s/g, '').length === 0 ||
      form_phone.replace(/\s/g, '').length === 0 ||
      form_address.replace(/\s/g, '').length === 0) {

      $('#error-form').show()

    } else {
      $('#form-tab a[href="#'+nextStep+'"]').tab('show')
    }


  } else if($(this).attr('data-upload-payment')) {

    if(myDropzone.getQueuedFiles() && myDropzone.getQueuedFiles().length !== 1) {
      $('#error-form-payment').show()
    } else {
      $('#error-form-payment').hide()
      $('#confirm-payment-img').attr('src', myDropzone.getQueuedFiles()[0].dataURL)
      $('#form-tab a[href="#'+nextStep+'"]').tab('show')
    }

  } else {
    $('#form-tab a[href="#'+nextStep+'"]').tab('show')
  }
})

$('#confirm-buying-send').click(function () {

  window.superagent
    .post(APIURL+'buying/publics/'+window.location.search)
    .field('email', $('#form-email').val())
    .field('fullname', $('#form-fullname').val())
    .field('phone', $('#form-phone').val())
    .field('address', $('#form-address').val())
    .attach('file', myDropzone.getQueuedFiles()[0])
    .end(function(err, response) {

      if(err) {
        console.error(err)
      } else {
        MessengerExtensions.requestCloseBrowser(function success() { }, function error(err) { });
        $('#form-tab').html('<p>Maklumat pembelian anda telah diterima. Sila tutup tab ini dan kembali ke messenger anda.</p>')
      }

    })

})