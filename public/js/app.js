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
__WEBPACK_IMPORTED_MODULE_3_moment___default.a.tz.setDefault('Asia/Tokyo');
__WEBPACK_IMPORTED_MODULE_3_moment___default.a.locale(document.documentElement.lang || 'ja');
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
   * @returns {void}
   */
  draggable: function draggable() {
    var elementSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var handleClasses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

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

    element.style.position = 'absolute';
    element.style.top = document.documentElement.scrollTop + 80 + 'px';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL19sYW5nL2VuLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvX2xhbmcvamEuanMiXSwibmFtZXMiOlsiVnVlIiwiY29uZmlnIiwicHJvZHVjdGlvblRpcCIsIndpbmRvdyIsImkxOG5leHQiLCJpbml0IiwibG5nIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJsYW5nIiwiZGVidWciLCJyZXNvdXJjZXMiLCJlbiIsImphIiwibGFuZ0pBIiwiJGFwaVVybCIsIiQiLCJheGlvcyIsImRlZmF1bHRzIiwiYmFzZVVSTCIsInZhbCIsInJlbW92ZSIsImhlYWRlcnMiLCJjb21tb24iLCJtZXRob2QiLCJkYXRhIiwidGltZW91dCIsIl9hbGVydCIsIl9sb2FkaW5nIiwiX2JhY2tncm91bmQiLCJfbGFuZ3VhZ2UiLCJ0b2tlbiIsImhlYWQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJ1c2UiLCJfbWV0aG9kIiwiVXRpbGl0eSIsInRvZ2dsZUxvYWRpbmciLCJtb21lbnQiLCJ0eiIsInNldERlZmF1bHQiLCJsb2NhbGUiLCIkYXBwVXJsIiwiYXBwVXJsIiwiZHVtbXkiLCJzZXREZWZhdWx0VGltZXpvbmUiLCJ0aW1lem9uZSIsInNldExvY2F0aW9uIiwicGFyYW1zIiwidXJsIiwiZm9yRWFjaCIsInBhcmFtIiwibG9jYXRpb24iLCJocmVmIiwieGhyVXJsIiwicXVlcmllcyIsInF1ZXJpZXNDb3VudCIsImtleSIsImhhc093blByb3BlcnR5IiwiZHJhZ2dhYmxlIiwiZWxlbWVudFNlbGVjdG9yIiwiaGFuZGxlQ2xhc3NlcyIsImVsZW1lbnQiLCJwb3MxIiwicG9zMiIsInBvczMiLCJwb3M0Iiwib25tb3VzZWRvd24iLCJkcmFnTW91c2VEb3duIiwibGVuZ3RoIiwiaGFuZGxlQ2xhc3MiLCJlbCIsInN0eWxlIiwiY3Vyc29yIiwicG9zaXRpb24iLCJ0b3AiLCJzY3JvbGxUb3AiLCJlIiwiY2xhc3NOYW1lcyIsInRhcmdldCIsImNsYXNzTmFtZSIsInNwbGl0IiwiaGFuZGxlcyIsImZpbHRlciIsImluY2x1ZGVzIiwiZXZlbnQiLCJjbGllbnRYIiwiY2xpZW50WSIsIm9ubW91c2V1cCIsImNsb3NlRHJhZ0VsZW1lbnQiLCJvbm1vdXNlbW92ZSIsImVsZW1lbnREcmFnIiwib2Zmc2V0VG9wIiwibGVmdCIsIm9mZnNldExlZnQiLCJvbiIsInN0b3BQcm9wYWdhdGlvbiIsImJvZHkiLCIkbW92ZVBhZ2VUb3AiLCJzY3JvbGwiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwidHJhbnNsYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBQUEsQ0FBSUMsTUFBSixDQUFXQyxhQUFYLEdBQTJCLEtBQTNCOztBQUVBQyxPQUFPSCxHQUFQLEdBQWEsMkNBQWI7O0FBRUE7QUFDQSxnREFBQUksQ0FBUUMsSUFBUixDQUFhO0FBQ1hDLE9BQUtDLFNBQVNDLGVBQVQsQ0FBeUJDLElBQXpCLElBQWlDLElBRDNCO0FBRVhDLFNBQU8sS0FGSTtBQUdYQyxhQUFXO0FBQ1RDLFFBQUksNERBREs7QUFFVEMsUUFBSSw0REFBQUM7QUFGSztBQUhBLENBQWI7QUFRQVgsT0FBT0MsT0FBUCxHQUFpQixnREFBakI7O0FBRUE7QUFDQSxJQUFNVyxVQUFVQyxFQUFFLFVBQUYsQ0FBaEI7QUFDQSw2Q0FBQUMsQ0FBTUMsUUFBTixDQUFlQyxPQUFmLEdBQXlCSixRQUFRSyxHQUFSLEVBQXpCO0FBQ0FMLFFBQVFNLE1BQVI7QUFDQSw2Q0FBQUosQ0FBTUMsUUFBTixDQUFlSSxPQUFmLENBQXVCQyxNQUF2QixDQUE4QixrQkFBOUIsSUFBb0QsZ0JBQXBEO0FB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QUZOLEVBRWUsZ0JBRmYsRUFFaUMsVUFBQ1YsS0FBRCxFQUFXO0FBQ3hDQSxRQUFNVyxlQUFOO0FBQ0E1RixXQUFTNkYsSUFBVCxDQUFjckIsU0FBZCxHQUEwQnhFLFNBQVNDLGVBQVQsQ0FBeUJ1RSxTQUF6QixHQUFxQyxDQUEvRDtBQUNELENBTEg7O0FBUUEsSUFBTXNCLGVBQWVyRixFQUFFLGdCQUFGLENBQXJCO0FBQ0FBLEVBQUViLE1BQUYsRUFBVW1HLE1BQVYsQ0FBaUIsVUFBQ2QsS0FBRCxFQUFXO0FBQzFCLE1BQUl4RSxFQUFFd0UsTUFBTU4sTUFBUixFQUFnQkgsU0FBaEIsS0FBOEIsR0FBbEMsRUFBdUM7QUFDckNzQixpQkFBYUUsUUFBYixDQUFzQixNQUF0QjtBQUNELEdBRkQsTUFFTztBQUNMRixpQkFBYUcsV0FBYixDQUF5QixNQUF6QjtBQUNEO0FBQ0YsQ0FORCxFOzs7Ozs7Ozs7QUNyTUEseURBQWU7QUFDYkMsZUFBYTtBQUNYLGtCQUFjO0FBREg7QUFEQSxDQUFmLEU7Ozs7Ozs7O0FDQUEseURBQWU7QUFDYkEsZUFBYTtBQUNYLGtCQUFjO0FBREg7QUFEQSxDQUFmLEUiLCJmaWxlIjoiL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICdtb21lbnQtdGltZXpvbmUnO1xuXG5pbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcbmltcG9ydCBsYW5nRU4gZnJvbSAnLi9fbGFuZy9lbi5qcyc7XG5pbXBvcnQgbGFuZ0pBIGZyb20gJy4vX2xhbmcvamEuanMnO1xuXG4vLyBWdWXjga7liJ3mnJ/oqK3lrppcblZ1ZS5jb25maWcucHJvZHVjdGlvblRpcCA9IGZhbHNlO1xuXG53aW5kb3cuVnVlID0gVnVlO1xuXG4vLyBpMThuZXh044Gu6Kit5a6aXG5pMThuZXh0LmluaXQoe1xuICBsbmc6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nIHx8ICdqYScsXG4gIGRlYnVnOiBmYWxzZSxcbiAgcmVzb3VyY2VzOiB7XG4gICAgZW46IGxhbmdFTixcbiAgICBqYTogbGFuZ0pBXG4gIH1cbn0pO1xud2luZG93LmkxOG5leHQgPSBpMThuZXh0O1xuXG4vLyBheGlvc+OBruWIneacn+ioreWumlxuY29uc3QgJGFwaVVybCA9ICQoJyNhcGktdXJsJyk7XG5heGlvcy5kZWZhdWx0cy5iYXNlVVJMID0gJGFwaVVybC52YWwoKTtcbiRhcGlVcmwucmVtb3ZlKCk7XG5heGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcbmF4aW9zLmRlZmF1bHRzLm1ldGhvZCA9ICdnZXQnO1xuYXhpb3MuZGVmYXVsdHMuZGF0YSA9IHt9O1xuYXhpb3MuZGVmYXVsdHMudGltZW91dCA9IDUwMDA7XG4vLyDjgqLjg6njg7zjg4jjgpLlh7rjgZlcbmF4aW9zLmRlZmF1bHRzLl9hbGVydCA9IHRydWU7XG4vLyDjg63jg7zjg4fjgqPjg7PjgrDjgrnjg5Tjg4rjg7zjgpLlh7rjgZlcbmF4aW9zLmRlZmF1bHRzLl9sb2FkaW5nID0gdHJ1ZTtcbi8vIOODreODvOODh+OCo+ODs+OCsOOCueODlOODiuODvOOBqOOCouODqeODvOODiOOCkuWHuuOBleOBquOBhFxuYXhpb3MuZGVmYXVsdHMuX2JhY2tncm91bmQgPSBmYWxzZTtcbmF4aW9zLmRlZmF1bHRzLl9sYW5ndWFnZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nIHx8ICdqYSc7XG5cbmNvbnN0IHRva2VuID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJyk7XG5pZiAodG9rZW4pIHtcbiAgYXhpb3MuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtQ1NSRi1UT0tFTiddID0gdG9rZW4uY29udGVudDtcbn1cblxuYXhpb3MuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKChjb25maWcpID0+IHtcbiAgLy8gTGFyYXZlbOOBq+WQiOOCj+OBm+OBpl9tZXRob2Tjg5Hjg6njg6Hjg7zjgr/jg7zjga7liJ3mnJ/lgKTjgpLoqK3lrppcbiAgaWYgKGNvbmZpZy5tZXRob2QgIT09ICdnZXQnKSB7XG4gICAgY29uZmlnLmRhdGEuX21ldGhvZCA9IGNvbmZpZy5kYXRhLl9tZXRob2QgfHwgY29uZmlnLm1ldGhvZDtcbiAgfVxuICBpZiAoIWNvbmZpZy5fYmFja2dyb3VuZCAmJiBjb25maWcuX2xvYWRpbmcpIHtcbiAgICAvLyDjg63jg7zjg4fjgqPjg7PjgrBcbiAgICBVdGlsaXR5LnRvZ2dsZUxvYWRpbmcodHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIGNvbmZpZztcbn0pO1xuXG53aW5kb3cuYXhpb3MgPSBheGlvcztcblxuLy8gbW9tZW50anPjga7oqK3lrppcbm1vbWVudC50ei5zZXREZWZhdWx0KCdBc2lhL1Rva3lvJyk7XG5tb21lbnQubG9jYWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nIHx8ICdqYScpO1xud2luZG93Lm1vbWVudCA9IG1vbWVudDtcblxuLy8gVVJMXG5jb25zdCAkYXBwVXJsID0gJCgnI2FwcC11cmwnKTtcbndpbmRvdy5hcHBVcmwgPSAkYXBwVXJsLnZhbCgpO1xuJGFwcFVybC5yZW1vdmUoKTtcblxuLy8gSnF1ZXJ544KSd2luZG9344Gr5qC857SNXG53aW5kb3cuJCA9ICQ7XG5cbi8qKlxuICog5YWx6YCa5Yem55CGXG4gKi9cbmNvbnN0IFV0aWxpdHkgPSB7XG4gIGR1bW15OiAwLFxuXG4gIC8qKlxuICAgKiB0aW1lem9uZeOBruWIh+abv1xuICAgKi9cbiAgc2V0RGVmYXVsdFRpbWV6b25lICh0aW1lem9uZSkge1xuICAgIG1vbWVudC50ei5zZXREZWZhdWx0KHRpbWV6b25lKTtcbiAgfSxcblxuICAvKipcbiAgICog55S76Z2i5o6o56e7XG4gICAqIEBwYXJhbSB7W119IHBhcmFtcyDmloflrZfliJdcbiAgICogQHJldHVybnMge3N0cmluZ30gdXJsXG4gICAqL1xuICBzZXRMb2NhdGlvbiAocGFyYW1zID0gW10pIHtcbiAgICBsZXQgdXJsID0gd2luZG93LmFwcFVybDtcbiAgICBwYXJhbXMuZm9yRWFjaCgocGFyYW0pID0+IHtcbiAgICAgIHVybCArPSAocGFyYW0pID8gJy8nICsgcGFyYW0gOiAnJztcbiAgICB9KTtcbiAgICBsb2NhdGlvbi5ocmVmID0gdXJsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBBUEnjga5VUkzjgpLnlJ/miJBcbiAgICogICBheGlvcy5kZWZhdWx0LnVybOOBjOioreWumuOBleOCjOOBpuOBhOOCi+OBn+OCgeOAgeOBneOCjOS7pemZjeOCkui/lOOBmVxuICAgKiBAcGFyYW0ge1tdfSBwYXJhbXMg5paH5a2X5YiXXG4gICAqIEBwYXJhbSB7W119IHF1ZXJpZXMg44Kv44Ko44Oq5paH5a2X5YiXXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgeGhyVXJsIChwYXJhbXMgPSBbXSwgcXVlcmllcyA9IHt9KSB7XG4gICAgbGV0IHVybCA9ICcnO1xuICAgIHBhcmFtcy5mb3JFYWNoKChwYXJhbSkgPT4ge1xuICAgICAgdXJsICs9IChwYXJhbSkgPyAnLycgKyBwYXJhbSA6ICcnO1xuICAgIH0pO1xuICAgIGxldCBxdWVyaWVzQ291bnQgPSAwO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHF1ZXJpZXMpIHtcbiAgICAgIGlmICghcXVlcmllcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHF1ZXJpZXNDb3VudCArPSAxO1xuICAgICAgICBpZiAocXVlcmllc0NvdW50ID09PSAxKSB7XG4gICAgICAgICAgdXJsICs9ICc/JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmwgKz0gJyYnO1xuICAgICAgICB9XG4gICAgICAgIHVybCArPSBgJHtrZXl9PSR7cXVlcmllc1trZXldfWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOimgee0oOOCkuODieODqeODg+OCsOWPr+iDveOBq+OBmeOCi++8iOODjeOCpOODhuOCo+ODlkpT44Gu44G/44Gn44OJ44Op44OD44Kw77yJXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50U2VsZWN0b3IgcXVlcnlTZWxlY3RvcuOBqOWQjOanmOOBruOCu+ODrOOCr+OCv+ODvFxuICAgKiBAcGFyYW0ge0FycmF5fSBoYW5kbGVzIOODieODqeODg+OCsOWPr+iDveOBquOCv+ODvOOCsuODg+ODiOOBruOCr+ODqeOCueWQjemFjeWIl1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICDigLsg5YWI6aCt44Gu44OU44Oq44Kq44OJ44Gv44Gk44GR44G+44Gb44KT44CCXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZHJhZ2dhYmxlIChlbGVtZW50U2VsZWN0b3IgPSAnJywgaGFuZGxlQ2xhc3NlcyA9IFtdKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudFNlbGVjdG9yKTtcbiAgICBsZXQgcG9zMSA9IDA7XG4gICAgbGV0IHBvczIgPSAwO1xuICAgIGxldCBwb3MzID0gMDtcbiAgICBsZXQgcG9zNCA9IDA7XG4gICAgZWxlbWVudC5vbm1vdXNlZG93biA9IGRyYWdNb3VzZURvd247XG5cbiAgICBpZiAoaGFuZGxlQ2xhc3Nlcy5sZW5ndGggPiAwKSB7XG4gICAgICBoYW5kbGVDbGFzc2VzLmZvckVhY2goKGhhbmRsZUNsYXNzKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuJHtoYW5kbGVDbGFzc31gKTtcbiAgICAgICAgZWwuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZWxlbWVudC5zdHlsZS50b3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wICsgODAgKyAncHgnO1xuXG4gICAgZnVuY3Rpb24gZHJhZ01vdXNlRG93biAoZSkge1xuICAgICAgaWYgKGhhbmRsZUNsYXNzZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBjbGFzc05hbWVzID0gKGUudGFyZ2V0LmNsYXNzTmFtZSB8fCAnJykuc3BsaXQoJyAnKTtcbiAgICAgICAgY29uc3QgaGFuZGxlcyA9IGNsYXNzTmFtZXMuZmlsdGVyKChjbGFzc05hbWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gaGFuZGxlQ2xhc3Nlcy5pbmNsdWRlcyhjbGFzc05hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGhhbmRsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICBwb3MzID0gZS5jbGllbnRYO1xuICAgICAgcG9zNCA9IGUuY2xpZW50WTtcbiAgICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9IGNsb3NlRHJhZ0VsZW1lbnQ7XG4gICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGVsZW1lbnREcmFnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVsZW1lbnREcmFnIChlKSB7XG4gICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICBwb3MxID0gcG9zMyAtIGUuY2xpZW50WDtcbiAgICAgIHBvczIgPSBwb3M0IC0gZS5jbGllbnRZO1xuICAgICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICAgIHBvczQgPSBlLmNsaWVudFk7XG4gICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IChlbGVtZW50Lm9mZnNldFRvcCAtIHBvczIpICsgJ3B4JztcbiAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IChlbGVtZW50Lm9mZnNldExlZnQgLSBwb3MxKSArICdweCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VEcmFnRWxlbWVudCAoKSB7XG4gICAgICBkb2N1bWVudC5vbm1vdXNldXAgPSBudWxsO1xuICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBudWxsO1xuICAgIH1cbiAgfVxufTtcblxuLy8g44Kk44OZ44Oz44OI6Kit5a6aXG4kKCdib2R5JylcbiAgLy8g44Oa44O844K45LiK6YOo44Gr56e75YuVXG4gIC5vbignY2xpY2snLCAnI21vdmUtcGFnZS10b3AnLCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICB9KVxuO1xuXG5jb25zdCAkbW92ZVBhZ2VUb3AgPSAkKCcjbW92ZS1wYWdlLXRvcCcpO1xuJCh3aW5kb3cpLnNjcm9sbCgoZXZlbnQpID0+IHtcbiAgaWYgKCQoZXZlbnQudGFyZ2V0KS5zY3JvbGxUb3AoKSA+IDEwMCkge1xuICAgICRtb3ZlUGFnZVRvcC5hZGRDbGFzcygnc2hvdycpO1xuICB9IGVsc2Uge1xuICAgICRtb3ZlUGFnZVRvcC5yZW1vdmVDbGFzcygnc2hvdycpO1xuICB9XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvYXBwLmpzIiwiZXhwb3J0IGRlZmF1bHQge1xuICB0cmFuc2xhdGlvbjoge1xuICAgICdyZWdpc3RlcmVkJzogJ1JlZ2lzdGVyZWQgISdcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvX2xhbmcvZW4uanMiLCJleHBvcnQgZGVmYXVsdCB7XG4gIHRyYW5zbGF0aW9uOiB7XG4gICAgJ3JlZ2lzdGVyZWQnOiAn55m76Yyy44GX44G+44GX44GfJ1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9fbGFuZy9qYS5qcyJdLCJzb3VyY2VSb290IjoiIn0=