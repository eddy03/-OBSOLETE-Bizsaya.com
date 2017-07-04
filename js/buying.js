window.extAsyncInit = function() {
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

  console.log('uId ', uId)
  console.log('psId ', psId)
  console.log('pageId ', pageId)

  var app = new Vue({
    el: '#app',
    data: {
      uId: uId,
      psId: psId,
      pageId: pageId,
      productId: productId,
      timeChecker: timeChecker
    },
    methods: {

    }
  })

};