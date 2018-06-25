webpackJsonp([2],{

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(273);


/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($, __webpack_provided_window_dot_$) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment_timezone__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment_timezone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment_timezone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_i18next__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lang_en_js__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lang_ja_js__ = __webpack_require__(509);











// Vueの初期設定
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.config.productionTip = false;

window.Vue = __WEBPACK_IMPORTED_MODULE_1_vue___default.a;

// i18nextの設定
__WEBPACK_IMPORTED_MODULE_5_i18next__["default"].init({
  lng: document.documentElement.lang || 'ja',
  debug: false,
  resources: {
    en: __WEBPACK_IMPORTED_MODULE_6__lang_en_js__["a" /* default */],
    ja: __WEBPACK_IMPORTED_MODULE_7__lang_ja_js__["a" /* default */]
  }
});
window.i18next = __WEBPACK_IMPORTED_MODULE_5_i18next__["default"];

// axiosの初期設定
var $apiUrl = $('#api-url');
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.baseURL = $apiUrl.val();
$apiUrl.remove();
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.method = 'get';
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.data = {};
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.timeout = 5000;
// アラートを出す
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults._alert = true;
// ローディングスピナーを出す
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults._loading = true;
// ローディングスピナーとアラートを出さない
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults._background = false;
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults._language = document.documentElement.lang || 'ja';

var token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
  __WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

__WEBPACK_IMPORTED_MODULE_2_axios___default.a.interceptors.request.use(function (config) {
  // Laravelに合わせて_methodパラメーターの初期値を設定
  if (config.method !== 'get') {
    config.data._method = config.data._method || config.method;
  }
  if (!config._background && config._loading) {
    // ローディング
    Utility.toggleLoading(true);
  }
  return config;
});

window.axios = __WEBPACK_IMPORTED_MODULE_2_axios___default.a;

// momentjsの設定
var $appTimezone = $('#app-timezone');
var appTimezone = $appTimezone.val();
__WEBPACK_IMPORTED_MODULE_3_moment___default.a.tz.setDefault(appTimezone);
__WEBPACK_IMPORTED_MODULE_3_moment___default.a.locale(document.documentElement.lang || 'ja');
$appTimezone.remove();
window.moment = __WEBPACK_IMPORTED_MODULE_3_moment___default.a;

// URL
var $appUrl = $('#app-url');
window.appUrl = $appUrl.val();
$appUrl.remove();

// Jqueryをwindowに格納
__webpack_provided_window_dot_$ = $;

/**
 * 共通処理
 */
var Utility = {
  dummy: 0,

  /**
   * timezoneの切替
   */
  setDefaultTimezone: function setDefaultTimezone(timezone) {
    __WEBPACK_IMPORTED_MODULE_3_moment___default.a.tz.setDefault(timezone);
  },


  /**
   * 画面推移
   * @param {[]} params 文字列
   * @returns {string} url
   */
  setLocation: function setLocation() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var url = window.appUrl;
    params.forEach(function (param) {
      url += param ? '/' + param : '';
    });
    location.href = url;
  },


  /**
   * APIのURLを生成
   *   axios.default.urlが設定されているため、それ以降を返す
   * @param {[]} params 文字列
   * @param {[]} queries クエリ文字列
   * @returns {string} url
   */
  xhrUrl: function xhrUrl() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var queries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var url = '';
    params.forEach(function (param) {
      url += param ? '/' + param : '';
    });
    var queriesCount = 0;
    for (var key in queries) {
      if (!queries.hasOwnProperty(key)) {
        queriesCount += 1;
        if (queriesCount === 1) {
          url += '?';
        } else {
          url += '&';
        }
        url += key + '=' + queries[key];
      }
    }
    return url;
  },


  /**
   * 要素をドラッグ可能にする（ネイティブJSのみでドラッグ）
   * @param {string} elementSelector querySelectorと同様のセレクター
   * @param {Array} handles ドラッグ可能なターゲットのクラス名配列
   *                         ※ 先頭のピリオドはつけません。
   * @param {boolean} center 要素を画面中央に持ってくる
   * @returns {void}
   */
  draggable: function draggable() {
    var elementSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var handleClasses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var center = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var element = document.querySelector(elementSelector);
    var pos1 = 0;
    var pos2 = 0;
    var pos3 = 0;
    var pos4 = 0;
    element.onmousedown = dragMouseDown;

    if (handleClasses.length > 0) {
      handleClasses.forEach(function (handleClass) {
        var el = element.querySelector('.' + handleClass);
        el.style.cursor = 'move';
      });
    }

    if (center) {
      element.style.position = 'absolute';
      element.style.top = document.documentElement.scrollTop + 80 + 'px';
      element.style.left = '50%';
      element.style.transform = 'translateX(-50%)';
    }

    function dragMouseDown(e) {
      if (handleClasses.length > 0) {
        var classNames = (e.target.className || '').split(' ');
        var handles = classNames.filter(function (className) {
          return handleClasses.includes(className);
        });
        if (handles.length === 0) {
          return;
        }
      }
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = element.offsetTop - pos2 + 'px';
      element.style.left = element.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
};

// イベント設定
$('body')
// ページ上部に移動
.on('click', '#move-page-top', function (event) {
  event.stopPropagation();
  document.body.scrollTop = document.documentElement.scrollTop = 0;
});

var $movePageTop = $('#move-page-top');
$(window).scroll(function (event) {
  if ($(event.target).scrollTop() > 100) {
    $movePageTop.addClass('show');
  } else {
    $movePageTop.removeClass('show');
  }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(70), __webpack_require__(70)))

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  translation: {
    'registered': 'Registered !'
  }
});

/***/ }),

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  translation: {
    'registered': '登録しました'
  }
});

/***/ })

},[272]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL19sYW5nL2VuLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvX2xhbmcvamEuanMiXSwibmFtZXMiOlsiVnVlIiwiY29uZmlnIiwicHJvZHVjdGlvblRpcCIsIndpbmRvdyIsImkxOG5leHQiLCJpbml0IiwibG5nIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJsYW5nIiwiZGVidWciLCJyZXNvdXJjZXMiLCJlbiIsImphIiwibGFuZ0pBIiwiJGFwaVVybCIsIiQiLCJheGlvcyIsImRlZmF1bHRzIiwiYmFzZVVSTCIsInZhbCIsInJlbW92ZSIsImhlYWRlcnMiLCJjb21tb24iLCJtZXRob2QiLCJkYXRhIiwidGltZW91dCIsIl9hbGVydCIsIl9sb2FkaW5nIiwiX2JhY2tncm91bmQiLCJfbGFuZ3VhZ2UiLCJ0b2tlbiIsImhlYWQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJ1c2UiLCJfbWV0aG9kIiwiVXRpbGl0eSIsInRvZ2dsZUxvYWRpbmciLCIkYXBwVGltZXpvbmUiLCJhcHBUaW1lem9uZSIsIm1vbWVudCIsInR6Iiwic2V0RGVmYXVsdCIsImxvY2FsZSIsIiRhcHBVcmwiLCJhcHBVcmwiLCJkdW1teSIsInNldERlZmF1bHRUaW1lem9uZSIsInRpbWV6b25lIiwic2V0TG9jYXRpb24iLCJwYXJhbXMiLCJ1cmwiLCJmb3JFYWNoIiwicGFyYW0iLCJsb2NhdGlvbiIsImhyZWYiLCJ4aHJVcmwiLCJxdWVyaWVzIiwicXVlcmllc0NvdW50Iiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJkcmFnZ2FibGUiLCJlbGVtZW50U2VsZWN0b3IiLCJoYW5kbGVDbGFzc2VzIiwiY2VudGVyIiwiZWxlbWVudCIsInBvczEiLCJwb3MyIiwicG9zMyIsInBvczQiLCJvbm1vdXNlZG93biIsImRyYWdNb3VzZURvd24iLCJsZW5ndGgiLCJoYW5kbGVDbGFzcyIsImVsIiwic3R5bGUiLCJjdXJzb3IiLCJwb3NpdGlvbiIsInRvcCIsInNjcm9sbFRvcCIsImxlZnQiLCJ0cmFuc2Zvcm0iLCJlIiwiY2xhc3NOYW1lcyIsInRhcmdldCIsImNsYXNzTmFtZSIsInNwbGl0IiwiaGFuZGxlcyIsImZpbHRlciIsImluY2x1ZGVzIiwiZXZlbnQiLCJjbGllbnRYIiwiY2xpZW50WSIsIm9ubW91c2V1cCIsImNsb3NlRHJhZ0VsZW1lbnQiLCJvbm1vdXNlbW92ZSIsImVsZW1lbnREcmFnIiwib2Zmc2V0VG9wIiwib2Zmc2V0TGVmdCIsIm9uIiwic3RvcFByb3BhZ2F0aW9uIiwiYm9keSIsIiRtb3ZlUGFnZVRvcCIsInNjcm9sbCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0cmFuc2xhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUFBQSxDQUFJQyxNQUFKLENBQVdDLGFBQVgsR0FBMkIsS0FBM0I7O0FBRUFDLE9BQU9ILEdBQVAsR0FBYSwyQ0FBYjs7QUFFQTtBQUNBLGdEQUFBSSxDQUFRQyxJQUFSLENBQWE7QUFDWEMsT0FBS0MsU0FBU0MsZUFBVCxDQUF5QkMsSUFBekIsSUFBaUMsSUFEM0I7QUFFWEMsU0FBTyxLQUZJO0FBR1hDLGFBQVc7QUFDVEMsUUFBSSw0REFESztBQUVUQyxRQUFJLDREQUFBQztBQUZLO0FBSEEsQ0FBYjtBQVFBWCxPQUFPQyxPQUFQLEdBQWlCLGdEQUFqQjs7QUFFQTtBQUNBLElBQU1XLFVBQVVDLEVBQUUsVUFBRixDQUFoQjtBQUNBLDZDQUFBQyxDQUFNQyxRQUFOLENBQWVDLE9BQWYsR0FBeUJKLFFBQVFLLEdBQVIsRUFBekI7QUFDQUwsUUFBUU0sTUFBUjtBQUNBLDZDQUFBSixDQUFNQyxRQUFOLENB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LFFBQVFnQyxTQUFSLEdBQW9COUIsSUFBckIsR0FBNkIsSUFBakQ7QUFDQUYsY0FBUVUsS0FBUixDQUFjSyxJQUFkLEdBQXNCZixRQUFRaUMsVUFBUixHQUFxQmhDLElBQXRCLEdBQThCLElBQW5EO0FBQ0Q7O0FBRUQsYUFBUzRCLGdCQUFULEdBQTZCO0FBQzNCMUYsZUFBU3lGLFNBQVQsR0FBcUIsSUFBckI7QUFDQXpGLGVBQVMyRixXQUFULEdBQXVCLElBQXZCO0FBQ0Q7QUFDRjtBQS9HYSxDQUFoQjs7QUFrSEE7QUFDQWxGLEVBQUUsTUFBRjtBQUNFO0FBREYsQ0FFR3NGLEVBRkgsQ0FFTSxPQUZOLEVBRWUsZ0JBRmYsRUFFaUMsVUFBQ1QsS0FBRCxFQUFXO0FBQ3hDQSxRQUFNVSxlQUFOO0FBQ0FoRyxXQUFTaUcsSUFBVCxDQUFjdEIsU0FBZCxHQUEwQjNFLFNBQVNDLGVBQVQsQ0FBeUIwRSxTQUF6QixHQUFxQyxDQUEvRDtBQUNELENBTEg7O0FBUUEsSUFBTXVCLGVBQWV6RixFQUFFLGdCQUFGLENBQXJCO0FBQ0FBLEVBQUViLE1BQUYsRUFBVXVHLE1BQVYsQ0FBaUIsVUFBQ2IsS0FBRCxFQUFXO0FBQzFCLE1BQUk3RSxFQUFFNkUsTUFBTU4sTUFBUixFQUFnQkwsU0FBaEIsS0FBOEIsR0FBbEMsRUFBdUM7QUFDckN1QixpQkFBYUUsUUFBYixDQUFzQixNQUF0QjtBQUNELEdBRkQsTUFFTztBQUNMRixpQkFBYUcsV0FBYixDQUF5QixNQUF6QjtBQUNEO0FBQ0YsQ0FORCxFOzs7Ozs7Ozs7QUM3TUEseURBQWU7QUFDYkMsZUFBYTtBQUNYLGtCQUFjO0FBREg7QUFEQSxDQUFmLEU7Ozs7Ozs7O0FDQUEseURBQWU7QUFDYkEsZUFBYTtBQUNYLGtCQUFjO0FBREg7QUFEQSxDQUFmLEUiLCJmaWxlIjoiL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICdtb21lbnQtdGltZXpvbmUnO1xuXG5pbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcbmltcG9ydCBsYW5nRU4gZnJvbSAnLi9fbGFuZy9lbi5qcyc7XG5pbXBvcnQgbGFuZ0pBIGZyb20gJy4vX2xhbmcvamEuanMnO1xuXG4vLyBWdWXjga7liJ3mnJ/oqK3lrppcblZ1ZS5jb25maWcucHJvZHVjdGlvblRpcCA9IGZhbHNlO1xuXG53aW5kb3cuVnVlID0gVnVlO1xuXG4vLyBpMThuZXh044Gu6Kit5a6aXG5pMThuZXh0LmluaXQoe1xuICBsbmc6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nIHx8ICdqYScsXG4gIGRlYnVnOiBmYWxzZSxcbiAgcmVzb3VyY2VzOiB7XG4gICAgZW46IGxhbmdFTixcbiAgICBqYTogbGFuZ0pBXG4gIH1cbn0pO1xud2luZG93LmkxOG5leHQgPSBpMThuZXh0O1xuXG4vLyBheGlvc+OBruWIneacn+ioreWumlxuY29uc3QgJGFwaVVybCA9ICQoJyNhcGktdXJsJyk7XG5heGlvcy5kZWZhdWx0cy5iYXNlVVJMID0gJGFwaVVybC52YWwoKTtcbiRhcGlVcmwucmVtb3ZlKCk7XG5heGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcbmF4aW9zLmRlZmF1bHRzLm1ldGhvZCA9ICdnZXQnO1xuYXhpb3MuZGVmYXVsdHMuZGF0YSA9IHt9O1xuYXhpb3MuZGVmYXVsdHMudGltZW91dCA9IDUwMDA7XG4vLyDjgqLjg6njg7zjg4jjgpLlh7rjgZlcbmF4aW9zLmRlZmF1bHRzLl9hbGVydCA9IHRydWU7XG4vLyDjg63jg7zjg4fjgqPjg7PjgrDjgrnjg5Tjg4rjg7zjgpLlh7rjgZlcbmF4aW9zLmRlZmF1bHRzLl9sb2FkaW5nID0gdHJ1ZTtcbi8vIOODreODvOODh+OCo+ODs+OCsOOCueODlOODiuODvOOBqOOCouODqeODvOODiOOCkuWHuuOBleOBquOBhFxuYXhpb3MuZGVmYXVsdHMuX2JhY2tncm91bmQgPSBmYWxzZTtcbmF4aW9zLmRlZmF1bHRzLl9sYW5ndWFnZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nIHx8ICdqYSc7XG5cbmNvbnN0IHRva2VuID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJyk7XG5pZiAodG9rZW4pIHtcbiAgYXhpb3MuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtQ1NSRi1UT0tFTiddID0gdG9rZW4uY29udGVudDtcbn1cblxuYXhpb3MuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKChjb25maWcpID0+IHtcbiAgLy8gTGFyYXZlbOOBq+WQiOOCj+OBm+OBpl9tZXRob2Tjg5Hjg6njg6Hjg7zjgr/jg7zjga7liJ3mnJ/lgKTjgpLoqK3lrppcbiAgaWYgKGNvbmZpZy5tZXRob2QgIT09ICdnZXQnKSB7XG4gICAgY29uZmlnLmRhdGEuX21ldGhvZCA9IGNvbmZpZy5kYXRhLl9tZXRob2QgfHwgY29uZmlnLm1ldGhvZDtcbiAgfVxuICBpZiAoIWNvbmZpZy5fYmFja2dyb3VuZCAmJiBjb25maWcuX2xvYWRpbmcpIHtcbiAgICAvLyDjg63jg7zjg4fjgqPjg7PjgrBcbiAgICBVdGlsaXR5LnRvZ2dsZUxvYWRpbmcodHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIGNvbmZpZztcbn0pO1xuXG53aW5kb3cuYXhpb3MgPSBheGlvcztcblxuLy8gbW9tZW50anPjga7oqK3lrppcbmNvbnN0ICRhcHBUaW1lem9uZSA9ICQoJyNhcHAtdGltZXpvbmUnKTtcbmNvbnN0IGFwcFRpbWV6b25lID0gJGFwcFRpbWV6b25lLnZhbCgpO1xubW9tZW50LnR6LnNldERlZmF1bHQoYXBwVGltZXpvbmUpO1xubW9tZW50LmxvY2FsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyB8fCAnamEnKTtcbiRhcHBUaW1lem9uZS5yZW1vdmUoKTtcbndpbmRvdy5tb21lbnQgPSBtb21lbnQ7XG5cbi8vIFVSTFxuY29uc3QgJGFwcFVybCA9ICQoJyNhcHAtdXJsJyk7XG53aW5kb3cuYXBwVXJsID0gJGFwcFVybC52YWwoKTtcbiRhcHBVcmwucmVtb3ZlKCk7XG5cbi8vIEpxdWVyeeOCkndpbmRvd+OBq+agvOe0jVxud2luZG93LiQgPSAkO1xuXG4vKipcbiAqIOWFsemAmuWHpueQhlxuICovXG5jb25zdCBVdGlsaXR5ID0ge1xuICBkdW1teTogMCxcblxuICAvKipcbiAgICogdGltZXpvbmXjga7liIfmm79cbiAgICovXG4gIHNldERlZmF1bHRUaW1lem9uZSAodGltZXpvbmUpIHtcbiAgICBtb21lbnQudHouc2V0RGVmYXVsdCh0aW1lem9uZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUu+mdouaOqOenu1xuICAgKiBAcGFyYW0ge1tdfSBwYXJhbXMg5paH5a2X5YiXXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgc2V0TG9jYXRpb24gKHBhcmFtcyA9IFtdKSB7XG4gICAgbGV0IHVybCA9IHdpbmRvdy5hcHBVcmw7XG4gICAgcGFyYW1zLmZvckVhY2goKHBhcmFtKSA9PiB7XG4gICAgICB1cmwgKz0gKHBhcmFtKSA/ICcvJyArIHBhcmFtIDogJyc7XG4gICAgfSk7XG4gICAgbG9jYXRpb24uaHJlZiA9IHVybDtcbiAgfSxcblxuICAvKipcbiAgICogQVBJ44GuVVJM44KS55Sf5oiQXG4gICAqICAgYXhpb3MuZGVmYXVsdC51cmzjgYzoqK3lrprjgZXjgozjgabjgYTjgovjgZ/jgoHjgIHjgZ3jgozku6XpmY3jgpLov5TjgZlcbiAgICogQHBhcmFtIHtbXX0gcGFyYW1zIOaWh+Wtl+WIl1xuICAgKiBAcGFyYW0ge1tdfSBxdWVyaWVzIOOCr+OCqOODquaWh+Wtl+WIl1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB1cmxcbiAgICovXG4gIHhoclVybCAocGFyYW1zID0gW10sIHF1ZXJpZXMgPSB7fSkge1xuICAgIGxldCB1cmwgPSAnJztcbiAgICBwYXJhbXMuZm9yRWFjaCgocGFyYW0pID0+IHtcbiAgICAgIHVybCArPSAocGFyYW0pID8gJy8nICsgcGFyYW0gOiAnJztcbiAgICB9KTtcbiAgICBsZXQgcXVlcmllc0NvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBxdWVyaWVzKSB7XG4gICAgICBpZiAoIXF1ZXJpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBxdWVyaWVzQ291bnQgKz0gMTtcbiAgICAgICAgaWYgKHF1ZXJpZXNDb3VudCA9PT0gMSkge1xuICAgICAgICAgIHVybCArPSAnPyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsICs9ICcmJztcbiAgICAgICAgfVxuICAgICAgICB1cmwgKz0gYCR7a2V5fT0ke3F1ZXJpZXNba2V5XX1gO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdXJsO1xuICB9LFxuXG4gIC8qKlxuICAgKiDopoHntKDjgpLjg4njg6njg4PjgrDlj6/og73jgavjgZnjgovvvIjjg43jgqTjg4bjgqPjg5ZKU+OBruOBv+OBp+ODieODqeODg+OCsO+8iVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudFNlbGVjdG9yIHF1ZXJ5U2VsZWN0b3LjgajlkIzmp5jjga7jgrvjg6zjgq/jgr/jg7xcbiAgICogQHBhcmFtIHtBcnJheX0gaGFuZGxlcyDjg4njg6njg4PjgrDlj6/og73jgarjgr/jg7zjgrLjg4Pjg4jjga7jgq/jg6njgrnlkI3phY3liJdcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAg4oC7IOWFiOmgreOBruODlOODquOCquODieOBr+OBpOOBkeOBvuOBm+OCk+OAglxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNlbnRlciDopoHntKDjgpLnlLvpnaLkuK3lpK7jgavmjIHjgaPjgabjgY/jgotcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBkcmFnZ2FibGUgKGVsZW1lbnRTZWxlY3RvciA9ICcnLCBoYW5kbGVDbGFzc2VzID0gW10sIGNlbnRlciA9IGZhbHNlKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudFNlbGVjdG9yKTtcbiAgICBsZXQgcG9zMSA9IDA7XG4gICAgbGV0IHBvczIgPSAwO1xuICAgIGxldCBwb3MzID0gMDtcbiAgICBsZXQgcG9zNCA9IDA7XG4gICAgZWxlbWVudC5vbm1vdXNlZG93biA9IGRyYWdNb3VzZURvd247XG5cbiAgICBpZiAoaGFuZGxlQ2xhc3Nlcy5sZW5ndGggPiAwKSB7XG4gICAgICBoYW5kbGVDbGFzc2VzLmZvckVhY2goKGhhbmRsZUNsYXNzKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuJHtoYW5kbGVDbGFzc31gKTtcbiAgICAgICAgZWwuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNlbnRlcikge1xuICAgICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgKyA4MCArICdweCc7XG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAnNTAlJztcbiAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLTUwJSknO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdNb3VzZURvd24gKGUpIHtcbiAgICAgIGlmIChoYW5kbGVDbGFzc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lcyA9IChlLnRhcmdldC5jbGFzc05hbWUgfHwgJycpLnNwbGl0KCcgJyk7XG4gICAgICAgIGNvbnN0IGhhbmRsZXMgPSBjbGFzc05hbWVzLmZpbHRlcigoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGhhbmRsZUNsYXNzZXMuaW5jbHVkZXMoY2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYW5kbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICAgIHBvczQgPSBlLmNsaWVudFk7XG4gICAgICBkb2N1bWVudC5vbm1vdXNldXAgPSBjbG9zZURyYWdFbGVtZW50O1xuICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBlbGVtZW50RHJhZztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbGVtZW50RHJhZyAoZSkge1xuICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgcG9zMSA9IHBvczMgLSBlLmNsaWVudFg7XG4gICAgICBwb3MyID0gcG9zNCAtIGUuY2xpZW50WTtcbiAgICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSAoZWxlbWVudC5vZmZzZXRUb3AgLSBwb3MyKSArICdweCc7XG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAoZWxlbWVudC5vZmZzZXRMZWZ0IC0gcG9zMSkgKyAncHgnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlRHJhZ0VsZW1lbnQgKCkge1xuICAgICAgZG9jdW1lbnQub25tb3VzZXVwID0gbnVsbDtcbiAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gbnVsbDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIOOCpOODmeODs+ODiOioreWumlxuJCgnYm9keScpXG4gIC8vIOODmuODvOOCuOS4iumDqOOBq+enu+WLlVxuICAub24oJ2NsaWNrJywgJyNtb3ZlLXBhZ2UtdG9wJywgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgfSlcbjtcblxuY29uc3QgJG1vdmVQYWdlVG9wID0gJCgnI21vdmUtcGFnZS10b3AnKTtcbiQod2luZG93KS5zY3JvbGwoKGV2ZW50KSA9PiB7XG4gIGlmICgkKGV2ZW50LnRhcmdldCkuc2Nyb2xsVG9wKCkgPiAxMDApIHtcbiAgICAkbW92ZVBhZ2VUb3AuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgfSBlbHNlIHtcbiAgICAkbW92ZVBhZ2VUb3AucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgdHJhbnNsYXRpb246IHtcbiAgICAncmVnaXN0ZXJlZCc6ICdSZWdpc3RlcmVkICEnXG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL19sYW5nL2VuLmpzIiwiZXhwb3J0IGRlZmF1bHQge1xuICB0cmFuc2xhdGlvbjoge1xuICAgICdyZWdpc3RlcmVkJzogJ+eZu+mMsuOBl+OBvuOBl+OBnydcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvX2xhbmcvamEuanMiXSwic291cmNlUm9vdCI6IiJ9