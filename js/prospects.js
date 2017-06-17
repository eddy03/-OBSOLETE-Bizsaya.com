// var qs = window.location.href.slice(window.location.href.indexOf('?')).replace('?e=', '')
// var decrypted = CryptoJS.AES.decrypt(qs, "ryxhsdrnfbcnuprynxvhihvfgokvbrbgbflmipioudqioouki").toString(CryptoJS.enc.Utf8)
//
// var token = decrypted.split('aeiou')[ 0 ]
// var pageId = decrypted.split('aeiou')[ 1 ]
// var unixTime = decrypted.split('aeiou')[ 2 ]
//
// if(moment().unix() < parseInt(unixTime)) {
//
//   window.superagent.get(URL)
//     .set('Authorization', token)
//     .set('x-page', pageId)
//     .end(function (err, response) {
//
//       if (!err) {
//         var sheetName = response.body.data.sheetname
//         var prospek = []
//         var datas = response.body.data ? response.body.data.contacts : []
//         _.each(response.body.data.contacts, function (data) {
//           if (data.payload) {
//             prospek.push({
//               nama: data.payload.sender_name,
//               mesej: data.payload.message
//             })
//           }
//         })
//
//         if (datas.length !== 0) {
//           var wb = new Workbook()
//           var ws = XLSX.utils.json_to_sheet(prospek)
//           wb.SheetNames.push(sheetName);
//           wb.Sheets[ sheetName ] = ws;
//           var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' })
//           saveAs(new Blob([ s2ab(wbout) ], { type: "application/octet-stream" }), moment().format('DD_MM_YYYY') + "_" + sheetName + ".xlsx");
//         } else {
//           $('#message')
//             .text('Ooopss. Tiada maklumat prospek bagi FB page ' + sheetName + ' dijumpai. Adakah anda telah aktifkan fungsi carian didalam modul komen dan inbox?')
//             .css('color', 'red')
//         }
//
//       } else {
//         $('#message')
//           .text('Ooppss.. Terdapat ralat sewaktu aplikasi Bizsaya mendapatkan senarai prospek bagi FB page ' + sheetName + '. Sila cuba semula.')
//           .css('color', 'red')
//       }
//
//     })
//
// } else {
//   $('#message')
//     .text('Oppss.. Kod pengesahan adalah tidak sah. Sila mulakan daripada aplikasi Bizsaya')
//     .css('color', 'red')
// }
//
// function Workbook () {
//   if (!(this instanceof Workbook)) return new Workbook();
//   this.SheetNames = [];
//   this.Sheets = {};
// }
//
// function s2ab (s) {
//   var buf = new ArrayBuffer(s.length);
//   var view = new Uint8Array(buf);
//   for (var i = 0; i != s.length; ++i) view[ i ] = s.charCodeAt(i) & 0xFF;
//   return buf;
// }



var _$_5f25=["\x3F\x65\x3D","","\x72\x65\x70\x6C\x61\x63\x65","\x3F","\x69\x6E\x64\x65\x78\x4F\x66","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x73\x6C\x69\x63\x65","\x55\x74\x66\x38","\x65\x6E\x63","\x74\x6F\x53\x74\x72\x69\x6E\x67","\x72\x79\x78\x68\x73\x64\x72\x6E\x66\x62\x63\x6E\x75\x70\x72\x79\x6E\x78\x76\x68\x69\x68\x76\x66\x67\x6F\x6B\x76\x62\x72\x62\x67\x62\x66\x6C\x6D\x69\x70\x69\x6F\x75\x64\x71\x69\x6F\x6F\x75\x6B\x69","\x64\x65\x63\x72\x79\x70\x74","\x41\x45\x53","\x61\x65\x69\x6F\x75","\x73\x70\x6C\x69\x74","\x75\x6E\x69\x78","\x73\x68\x65\x65\x74\x6E\x61\x6D\x65","\x64\x61\x74\x61","\x62\x6F\x64\x79","\x63\x6F\x6E\x74\x61\x63\x74\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x73\x65\x6E\x64\x65\x72\x5F\x6E\x61\x6D\x65","\x6D\x65\x73\x73\x61\x67\x65","\x70\x75\x73\x68","\x65\x61\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6A\x73\x6F\x6E\x5F\x74\x6F\x5F\x73\x68\x65\x65\x74","\x75\x74\x69\x6C\x73","\x53\x68\x65\x65\x74\x4E\x61\x6D\x65\x73","\x53\x68\x65\x65\x74\x73","\x78\x6C\x73\x78","\x62\x69\x6E\x61\x72\x79","\x77\x72\x69\x74\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6F\x63\x74\x65\x74\x2D\x73\x74\x72\x65\x61\x6D","\x44\x44\x5F\x4D\x4D\x5F\x59\x59\x59\x59","\x66\x6F\x72\x6D\x61\x74","\x5F","\x2E\x78\x6C\x73\x78","\x63\x6F\x6C\x6F\x72","\x72\x65\x64","\x63\x73\x73","\x4F\x6F\x6F\x70\x73\x73\x2E\x20\x54\x69\x61\x64\x61\x20\x6D\x61\x6B\x6C\x75\x6D\x61\x74\x20\x70\x72\x6F\x73\x70\x65\x6B\x20\x62\x61\x67\x69\x20\x46\x42\x20\x70\x61\x67\x65\x20","\x20\x64\x69\x6A\x75\x6D\x70\x61\x69\x2E\x20\x41\x64\x61\x6B\x61\x68\x20\x61\x6E\x64\x61\x20\x74\x65\x6C\x61\x68\x20\x61\x6B\x74\x69\x66\x6B\x61\x6E\x20\x66\x75\x6E\x67\x73\x69\x20\x63\x61\x72\x69\x61\x6E\x20\x64\x69\x64\x61\x6C\x61\x6D\x20\x6D\x6F\x64\x75\x6C\x20\x6B\x6F\x6D\x65\x6E\x20\x64\x61\x6E\x20\x69\x6E\x62\x6F\x78\x3F","\x74\x65\x78\x74","\x23\x6D\x65\x73\x73\x61\x67\x65","\x4F\x6F\x70\x70\x73\x73\x2E\x2E\x20\x54\x65\x72\x64\x61\x70\x61\x74\x20\x72\x61\x6C\x61\x74\x20\x73\x65\x77\x61\x6B\x74\x75\x20\x61\x70\x6C\x69\x6B\x61\x73\x69\x20\x42\x69\x7A\x73\x61\x79\x61\x20\x6D\x65\x6E\x64\x61\x70\x61\x74\x6B\x61\x6E\x20\x73\x65\x6E\x61\x72\x61\x69\x20\x70\x72\x6F\x73\x70\x65\x6B\x20\x62\x61\x67\x69\x20\x46\x42\x20\x70\x61\x67\x65\x20","\x2E\x20\x53\x69\x6C\x61\x20\x63\x75\x62\x61\x20\x73\x65\x6D\x75\x6C\x61\x2E","\x65\x6E\x64","\x78\x2D\x70\x61\x67\x65","\x73\x65\x74","\x41\x75\x74\x68\x6F\x72\x69\x7A\x61\x74\x69\x6F\x6E","\x67\x65\x74","\x73\x75\x70\x65\x72\x61\x67\x65\x6E\x74","\x4F\x70\x70\x73\x73\x2E\x2E\x20\x4B\x6F\x64\x20\x70\x65\x6E\x67\x65\x73\x61\x68\x61\x6E\x20\x61\x64\x61\x6C\x61\x68\x20\x74\x69\x64\x61\x6B\x20\x73\x61\x68\x2E\x20\x53\x69\x6C\x61\x20\x6D\x75\x6C\x61\x6B\x61\x6E\x20\x64\x61\x72\x69\x70\x61\x64\x61\x20\x61\x70\x6C\x69\x6B\x61\x73\x69\x20\x42\x69\x7A\x73\x61\x79\x61","\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74"];var qs=window[_$_5f25[6]][_$_5f25[5]][_$_5f25[7]](window[_$_5f25[6]][_$_5f25[5]][_$_5f25[4]](_$_5f25[3]))[_$_5f25[2]](_$_5f25[0],_$_5f25[1]);var decrypted=CryptoJS[_$_5f25[13]][_$_5f25[12]](qs,_$_5f25[11])[_$_5f25[10]](CryptoJS[_$_5f25[9]][_$_5f25[8]]);var token=decrypted[_$_5f25[15]](_$_5f25[14])[0];var pageId=decrypted[_$_5f25[15]](_$_5f25[14])[1];var unixTime=decrypted[_$_5f25[15]](_$_5f25[14])[2];if(moment()[_$_5f25[16]]()< parseInt(unixTime)){window[_$_5f25[53]][_$_5f25[52]](URL)[_$_5f25[50]](_$_5f25[51],token)[_$_5f25[50]](_$_5f25[49],pageId)[_$_5f25[48]](function(_0x201D6,_0x201F6){if(!_0x201D6){var _0x20206=_0x201F6[_$_5f25[19]][_$_5f25[18]][_$_5f25[17]];var _0x201E6=[];var _0x201C6=_0x201F6[_$_5f25[19]][_$_5f25[18]]?_0x201F6[_$_5f25[19]][_$_5f25[18]][_$_5f25[20]]:[];_[_$_5f25[25]](_0x201F6[_$_5f25[19]][_$_5f25[18]][_$_5f25[20]],function(_0x20246){if(_0x20246[_$_5f25[21]]){_0x201E6[_$_5f25[24]]({nama:_0x20246[_$_5f25[21]][_$_5f25[22]],mesej:_0x20246[_$_5f25[21]][_$_5f25[23]]})}});if(_0x201C6[_$_5f25[26]]!== 0){var _0x20216= new Workbook();var _0x20236=XLSX[_$_5f25[28]][_$_5f25[27]](_0x201E6);_0x20216[_$_5f25[29]][_$_5f25[24]](_0x20206);_0x20216[_$_5f25[30]][_0x20206]= _0x20236;var _0x20226=XLSX[_$_5f25[33]](_0x20216,{bookType:_$_5f25[31],bookSST:true,type:_$_5f25[32]});saveAs( new Blob([s2ab(_0x20226)],{type:_$_5f25[34]}),moment()[_$_5f25[36]](_$_5f25[35])+ _$_5f25[37]+ _0x20206+ _$_5f25[38])}else {$(_$_5f25[45])[_$_5f25[44]](_$_5f25[42]+ _0x20206+ _$_5f25[43])[_$_5f25[41]](_$_5f25[39],_$_5f25[40])}}else {$(_$_5f25[45])[_$_5f25[44]](_$_5f25[46]+ _0x20206+ _$_5f25[47])[_$_5f25[41]](_$_5f25[39],_$_5f25[40])}})}else {$(_$_5f25[45])[_$_5f25[44]](_$_5f25[54])[_$_5f25[41]](_$_5f25[39],_$_5f25[40])};function Workbook(){if(!(this instanceof  Workbook)){return  new Workbook()};this[_$_5f25[29]]= [];this[_$_5f25[30]]= {}}function s2ab(_0x20276){var _0x20256= new ArrayBuffer(_0x20276[_$_5f25[26]]);var _0x20286= new Uint8Array(_0x20256);for(var _0x20266=0;_0x20266!= _0x20276[_$_5f25[26]];++_0x20266){_0x20286[_0x20266]= _0x20276[_$_5f25[55]](_0x20266)& 0xFF};return _0x20256}