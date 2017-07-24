var qs = window.location.href.slice(window.location.href.indexOf('?')).replace('?e=', '')
var decrypted = CryptoJS.AES.decrypt(qs, "ryxhsdrnfbcnuprynxvhihvfgokvbrbgbflmipioudqioouki").toString(CryptoJS.enc.Utf8)

var fbId = decrypted.split('aeiou')[ 0 ]

if (fbId && moment().unix() < parseInt(decrypted.split('aeiou')[ 1 ])) {

  window.superagent.get(apiurl)
    .set('Authorization', fbId)
    .end(function (err, response) {

      if (!err) {

        var sheetName = response.body.data.sheetname
        var sales = []
        var datas = response.body.data ? response.body.data.sales : []
        _.each(response.body.data.sales, function (data) {
          var listOfProductName = _.map(data.products, function (o) { return _.get(o, 'detail.name') })
          var listOfProductQty = _.map(data.products, function (o) { return _.get(o, 'quantity') })
          var listOfProductRemarks = _.map(data.products, function (o) { return _.get(o, 'remarks') })
          var products = _.map(listOfProductName, function (name, index) {
            return name + "\n - Kuantiti : " + listOfProductQty[ index ].toString() + "\n - Nota : " + listOfProductRemarks[ index ]
          })
          sales.push({
            'fb page': data.page_name,
            nama: data.fullname,
            emel: data.email || '',
            'nombor telefon': data.phone,
            alamat: data.address,
            pembayaran: data.payment_proof_url,
            tarikh: data.created_at_string,
            'tracking number': data.tracking_number,
            status: data.accepted === true ? 'Selesai' : 'Belum selesai',
            products: products.join("\n\n")
          })
        })

        if (sales.length !== 0) {
          var wb = new Workbook()
          var ws = XLSX.utils.json_to_sheet(sales)
          wb.SheetNames.push(sheetName);
          wb.Sheets[ sheetName ] = ws;
          _.each(ws, function(cell, key) {
            if(key.charAt(0) === 'J' && key.charAt(1) !== '1') {
              cell.s =  { wrapText: true }
            }
            if(key.charAt(0) === 'F' && key.charAt(1) !== '1') {
              cell.l =  { Target : cell.v }
              cell.v =  'Muat turun bukti pembayaran'
            }
          })
          var writeOption = {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary',
            Props: {
              Title: 'Senarai jualan anda',
              Subject: moment().format('DD_MM_YYYY'),
              Author: 'Bizsaya.com',
              CreatedDate: moment().toString()
            }
          }
          var wbout = XLSX.write(wb, writeOption)
          saveAs(new Blob([ s2ab(wbout) ], { type: "application/octet-stream" }), 'Maklumat Jualan ' + moment().format('DD_MM_YYYY') + " " + sheetName + ".xlsx");
          $('#message')
            .text('File telah dimuat turun. Sila semak folder download anda')
            .css('color', 'green')
          setTimeout(function() { window.close() }, 2000)
        } else {
          $('#message')
            .text('Ooopss. Tiada maklumat prospek bagi FB page ' + sheetName + ' dijumpai. Adakah anda telah aktifkan fungsi carian didalam modul komen dan inbox?')
            .css('color', 'red')
        }

      } else {
        $('#message')
          .text('Ooppss.. Terdapat ralat sewaktu Bizsaya mendapatkan maklumat jualan anda. Sila cuba semula.')
          .css('color', 'red')
      }

    })

} else {
  $('#message')
    .text('Oppss.. Kod pengesahan adalah tidak sah. Sila mulakan daripada aplikasi Bizsaya')
    .css('color', 'red')
}

function Workbook () {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab (s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[ i ] = s.charCodeAt(i) & 0xFF;
  return buf;
}