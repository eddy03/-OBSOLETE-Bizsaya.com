// window.extAsyncInit = function () { }
//
// // the Messenger Extensions JS SDK is done loading
//
// var uId = null
// var psId = null
// var pageId = null
// var productId = null
// var timeChecker = null
// var canSkipPayment = false
// var canSelectProduct = false
// var multiProductToBeBuy = []
// var productPriceSingle = 0
// _.each(window.location.search.split('&'), function (param) {
//   var matchKeyword = param.match(/^(.*)=/g)
//
//   if(matchKeyword && matchKeyword.length === 1) {
//     matchKeyword = matchKeyword[0].replace(/\W/g, '')
//     if(matchKeyword === 'uid') {
//       uId = param.replace(/^(.*)=/g, '')
//     } else if(matchKeyword === 'psid') {
//       psId = param.replace(/^(.*)=/g, '')
//     } else if(matchKeyword === 'pg') {
//       pageId = param.replace(/^(.*)=/g, '')
//     } else if(matchKeyword === 'ac') {
//       timeChecker = param.replace(/^(.*)=/g, '')
//     }
//
//   } else {
//     console.warn('Parameters have been tempered. Discontinue processing')
//   }
//
// })
//
// window.superagent
//   .get(APIURL+'buying/publics/'+window.location.search)
//   .end(function (err, response) {
//     if(err) {
//       console.error(err)
//     } else {
//       if(response.body.data && response.body.data.buyer_name && response.body.data.sales !== false) {
//         console.log(response.body.data)
//
//         canSkipPayment = response.body.data.sales.can_skip_payment
//
//         $('#form-fullname').val(response.body.data.buyer_name)
//         $('#confirm-name').text(response.body.data.buyer_name)
//
//         if(response.body.data.email) {
//           $('#form-email').val(response.body.data.email)
//           $('#confirm-email').text(response.body.data.email)
//         }
//         if(response.body.data.phone || response.body.data.address) {
//           $('#form-phone').val(response.body.data.phone)
//           $('#form-address').val(response.body.data.address)
//           $('#confirm-phone').text(response.body.data.phone)
//           $('#confirm-address').text(response.body.data.address)
//         }
//
//
//         $('#page-name').text(response.body.data.page_name)
//
//         // Handle product
//         if(response.body.data.product) {
//
//           $('.product-name').text(response.body.data.product.name)
//           $('.product-description').text(response.body.data.product.description)
//           $('.product-remarks').text(response.body.data.product.remarks)
//           $('.product-price').text('RM'+parseFloat(response.body.data.product.price).toFixed(2))
//           productPriceSingle = response.body.data.product.price
//           if(response.body.data.product.images.length !== 0) {
//             $('.product-img').attr('src', response.body.data.product.images[0])
//           }
//           $('#multi-product').hide()
//
//         } // Handle products
//         else {
//           canSelectProduct = true
//           $('.single-product').hide()
//           $('.multi-product').show()
//           _.each(response.body.data.products, function (product) {
//             $('#multiple-select-product-form').append('<option value="'+product.id+'">RM'+parseFloat(product.price).toFixed(2)+' - '+product.name+'</option>')
//           })
//
//           $('#multiple-select-product-form').on('change', function() {
//             var productData = _.find(response.body.data.products, function(o) { return o.id === $('#multiple-select-product-form').val() })
//             if(productData) {
//               $('#multi-preview-product').show()
//               if(productData.images.length !== 0) {
//                 $('#multi-product-product-img').attr('src', productData.images[0])
//               } else {
//                 $('#multi-product-product-img').attr('src', 'https://storage.googleapis.com/bizsaya_assets/tiada_gambar.jpg')
//               }
//               $('#multi-preview-product-link').attr('href', productData.links_to)
//               $('#multi-preview-product-name').text(productData.name)
//               $('#multi-preview-product-description').text(productData.description)
//               $('#multi-preview-product-remarks').text(productData.remarks)
//               $('#multi-preview-product-price').text('RM'+parseFloat(productData.price).toFixed(2))
//             } else {
//               $('#multi-preview-product').hide()
//             }
//           })
//
//           $('#multi-preview-select-product').on('click', function () {
//             var productData = _.find(response.body.data.products, function(o) { return o.id === $('#multiple-select-product-form').val() })
//             $('#multi-preview-product').hide()
//             $('#error-form-products').hide()
//             multiProductToBeBuy.push({
//               id: productData.id,
//               name: productData.name,
//               price: productData.price,
//               quantity: productData.quantity === '' || productData.quantity === null? 1 : 0
//             })
//             multiProductToBeBuy = _.uniqBy(multiProductToBeBuy, 'id')
//             drawListOfToBeBuyProduct(multiProductToBeBuy)
//
//           })
//         }
//
//         var paymentList = ''
//
//         _.each(response.body.data.sales.banks_accounts, function(account) {
//           paymentList += '<div style="border-bottom: 1px solid #eee; padding-bottom: 10px; padding-top: 5px;">' +
//             '<div style="min-width: 100px; display: inline-block">'+account.bank_name+'</div>' +
//             '<div style="display: inline-block"><strong><code>'+account.account_number+'</code> ['+account.account_owner.toUpperCase()+']</strong></div>' +
//             '</div>'
//         })
//
//         $('#payment_account_list').html(paymentList)
//       }
//     }
//   })
//
// Dropzone.autoDiscover = false;
//
// var myDropzone = new Dropzone("div#payment-detail", {
//   url: "/file/post",
//   paramName: "file", // The name that will be used to transfer the file
//   maxFiles: 1,
//   maxFilesize: 2, // MB
//   acceptedFiles: 'image/*,application/pdf',
//   autoProcessQueue: false,
//   thumbnailWidth: null,
//   addRemoveLinks: true,
//   init: function() {
//     this.on('addedfile', function(file) {
//       $('#error-form-payment').hide()
//       myDropzone.getAcceptedFiles().map(function(oldFile) {
//         myDropzone.removeFile(oldFile);
//       })
//     })
//     this.on('sending', function(file) {
//       console.log('Sending', file)
//     })
//   },
//   previewsContainer: ".dropzone-previews",
//   dictDefaultMessage: 'Muat naik bukti pembayaran anda disini. Klik sini.',
//   dictFallbackMessage: 'Opps, Pelayar yang anda gunakan tidak boleh muat naik fail.',
//   dictFallbackText: 'Sila muat naik bukti pembayaran anda disini.',
//   dictFileTooBig: 'Alamak. Gambar/PDF tersebut besar sangat. Sila pilih gambar/PDF yang lebih kecil',
//   dictInvalidFileType: 'File tersebut tidak dibenarkan',
//   dictResponseError: 'Opps. Terdapat ralat sewaktu muat naik bukti pembayaran',
//   dictCancelUpload: 'Batal muat naik',
//   dictCancelUploadConfirmation: 'Adakah anda pasti untuk membatalkan muat naik bukti pembayaran ini',
//   dictRemoveFile: 'Buang/padam bukti pembayaran'
// });
//
// $('#form-tab a').click(function (e) {
//   e.preventDefault()
// })
//
// $('#form-fullname, #form-phone, #form-address').click(function () {
//   $('#error-form').hide()
// })
//
// $('#form-email, #form-fullname, #form-phone, #form-address').on('change', function () {
//   $('#confirm-email').text($('#form-email').val())
//   $('#confirm-name').text($('#form-fullname').val())
//   $('#confirm-address').text($('#form-address').val())
//   $('#confirm-phone').text($('#form-phone').val())
// })
//
// $('.next-step').click(function () {
//
//   var nextStep = $(this).attr('data-next')
//
//   if($(this).attr('data-validation')) {
//     var form_fullname = $('#form-fullname').val()
//     var form_phone = $('#form-phone').val()
//     var form_address = $('#form-address').val()
//
//     $('#error-form').hide()
//
//     if(
//       form_fullname.replace(/\s/g, '').length === 0 ||
//       form_phone.replace(/\s/g, '').length === 0 ||
//       form_address.replace(/\s/g, '').length === 0) {
//
//       $('#error-form').show()
//
//     } else {
//       $('#form-tab a[href="#'+nextStep+'"]').tab('show')
//     }
//
//
//   } else if($(this).attr('data-upload-payment')) {
//
//     if(myDropzone.getQueuedFiles() && myDropzone.getQueuedFiles().length !== 1 && canSkipPayment === false) {
//       $('#error-form-payment').show()
//     } else {
//       $('#error-form-payment').hide()
//       $('#confirm-payment-img').show()
//       if(myDropzone.getQueuedFiles().length === 1) {
//         $('#confirm-payment-img').attr('src', myDropzone.getQueuedFiles()[0].dataURL)
//       } else {
//         $('#confirm-payment-img').hide()
//       }
//       $('#form-tab a[href="#'+nextStep+'"]').tab('show')
//     }
//
//   } else if($(this).attr('data-products')) {
//     if(canSelectProduct === true) {
//       if(multiProductToBeBuy.length === 0) {
//         $('#error-form-products').show()
//         return
//       } else {
//         $('#form-tab a[href="#'+nextStep+'"]').tab('show')
//         drawListOfToBeBuyProductReview(multiProductToBeBuy)
//       }
//     } else {
//       $('#form-tab a[href="#'+nextStep+'"]').tab('show')
//       $('#confirm-quantity').text($('#single-buying-quantity').val())
//       $('#multi-product-review').hide()
//       $('#total-to-pay').text(parseFloat(parseInt($('#single-buying-quantity').val()) * productPriceSingle).toFixed(2))
//     }
//   } else {
//     $('#form-tab a[href="#'+nextStep+'"]').tab('show')
//   }
// })
//
// $('#confirm-buying-send').click(function () {
//
//   var uploadHttpAgent = window.superagent
//     .post(APIURL+'buying/publics/'+window.location.search)
//     .field('email', $('#form-email').val())
//     .field('fullname', $('#form-fullname').val())
//     .field('phone', $('#form-phone').val())
//     .field('address', $('#form-address').val())
//     .attach('file', myDropzone.getQueuedFiles()[0])
//
//   if(canSelectProduct === true) {
//     uploadHttpAgent.field('products', JSON.stringify(multiProductToBeBuy))
//   } else {
//     uploadHttpAgent.field('quantity', $('#single-buying-quantity').val())
//   }
//
//   uploadHttpAgent.end(function(err, response) {
//
//       if(err) {
//         console.error(err)
//       } else {
//         MessengerExtensions.requestCloseBrowser(function success() { }, function error(err) { });
//         $('#form-tab').html('<p>Maklumat pembelian anda telah diterima. Sila tutup tab ini dan kembali ke messenger anda.</p>')
//       }
//
//     })
//
// })
//
// $('#single-buying-quantity').change(function () {
//   $('#confirm-quantity').text($('#single-buying-quantity').val())
// })
//
// function updateQuantity(id, e) {
//
//   var idx = _.findIndex(multiProductToBeBuy, {id: id})
//   var qty = parseInt($(e).val())
//
//   if(idx !== -1 && qty > 0) {
//     multiProductToBeBuy[idx].quantity = qty
//   }
//
// }
//
// function removeProduct(id) {
//   var idx = _.findIndex(multiProductToBeBuy, {id: id})
//   if(idx !== -1) {
//     multiProductToBeBuy.splice(idx, 1)
//     drawListOfToBeBuyProduct(multiProductToBeBuy)
//   }
// }
//
// function drawListOfToBeBuyProduct (productsToBeBuy) {
//
//   $('#multi-product-selected').html(
//     '<div class="row" style="padding-bottom: 15px">' +
//     '<div class="col-xs-12"><p class="lead" style="padding: 0px; margin: 0px;"><strong>Produk/Perkhidmatan yang akan dibeli</strong></p></div>' +
//     '<div class="col-xs-8 col-sm-8 col-md-10 col-lg-10"><strong>Nama</strong></div>' +
//     '<div class="col-xs-4 col-sm-4 col-md-2 col-lg-2"><strong>Kuantiti</strong></div>' +
//     '</div>'
//   )
//
//   _.each(productsToBeBuy, function (buyProduct) {
//     $('#multi-product-selected').append(
//       '<div class="row" style="margin-bottom: 10px">' +
//       '<div class="col-xs-8 col-sm-8 col-md-10 col-lg-10"><p class="form-control-static">'+buyProduct.name+'</p></div>' +
//       '<div class="col-xs-4 col-sm-4 col-md-2 col-lg-2">' +
//       '<div class="input-group">' +
//       '<input type="number" value="'+buyProduct.quantity+'" class="form-control" onchange="updateQuantity(\''+buyProduct.id+'\', this)" />' +
//       '<span class="input-group-btn">' +
//       '<button class="btn btn-default" type="button" onclick="removeProduct(\''+buyProduct.id+'\')"><i class="fa fa-trash-o fa-fw text-danger"></i></button>' +
//       '</span>' +
//       '</div>' +
//       '</div>' +
//       '</div>'
//     )
//   })
//
//   $('#multiple-select-product-form').val('x')
//
// }
//
// function drawListOfToBeBuyProductReview (productsToBeBuy) {
//
//   $('#multi-product-review').html(
//     '<div class="row" style="padding-bottom: 15px">' +
//     '<div class="col-xs-12"><p class="lead" style="padding: 0px; margin: 0px;"><strong>Produk/Perkhidmatan yang akan dibeli</strong></p></div>' +
//     '<div class="col-xs-8 col-sm-8 col-md-10 col-lg-10"><strong>Nama</strong></div>' +
//     '<div class="col-xs-4 col-sm-4 col-md-2 col-lg-2"><strong>Kuantiti</strong></div>' +
//     '</div>'
//   )
//   _.each(productsToBeBuy, function (buyProduct) {
//     $('#multi-product-review').append(
//       '<div class="row" style="margin-bottom: 10px">' +
//       '<div class="col-xs-8 col-sm-8 col-md-10 col-lg-10"><p class="form-control-static">'+buyProduct.name+'</p></div>' +
//       '<div class="col-xs-4 col-sm-4 col-md-2 col-lg-2"><p class="form-control-static">'+buyProduct.quantity+'</p></div>' +
//       '</div>' +
//       '</div>'
//     )
//   })
//
// }