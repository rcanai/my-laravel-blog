import 'babel-polyfill';
import Vue from 'vue';
import axios from 'axios';

import moment from 'moment';
import 'moment-timezone';

import i18next from 'i18next';
import langEN from './_lang/en.js';
import langJA from './_lang/ja.js';

// Vueの初期設定
Vue.config.productionTip = false;

window.Vue = Vue;

// i18nextの設定
i18next.init({
  lng: document.documentElement.lang || 'ja',
  debug: false,
  resources: {
    en: langEN,
    ja: langJA
  }
});
window.i18next = i18next;

// axiosの初期設定
const $apiUrl = $('#api-url');
axios.defaults.baseURL = $apiUrl.val();
$apiUrl.remove();
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.method = 'get';
axios.defaults.data = {};
axios.defaults.timeout = 5000;
// アラートを出す
axios.defaults._alert = true;
// ローディングスピナーを出す
axios.defaults._loading = true;
// ローディングスピナーとアラートを出さない
axios.defaults._background = false;
axios.defaults._language = document.documentElement.lang || 'ja';

const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

axios.interceptors.request.use((config) => {
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

window.axios = axios;

// momentjsの設定
const $appTimezone = $('#app-timezone');
const appTimezone = $appTimezone.val();
moment.tz.setDefault(appTimezone);
moment.locale(document.documentElement.lang || 'ja');
$appTimezone.remove();
window.moment = moment;

// URL
const $appUrl = $('#app-url');
window.appUrl = $appUrl.val();
$appUrl.remove();

// Jqueryをwindowに格納
window.$ = $;

/**
 * 共通処理
 */
const Utility = {
  dummy: 0,

  /**
   * timezoneの切替
   */
  setDefaultTimezone (timezone) {
    moment.tz.setDefault(timezone);
  },

  /**
   * 画面推移
   * @param {[]} params 文字列
   * @returns {string} url
   */
  setLocation (params = []) {
    let url = window.appUrl;
    params.forEach((param) => {
      url += (param) ? '/' + param : '';
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
  xhrUrl (params = [], queries = {}) {
    let url = '';
    params.forEach((param) => {
      url += (param) ? '/' + param : '';
    });
    let queriesCount = 0;
    for (const key in queries) {
      if (!queries.hasOwnProperty(key)) {
        queriesCount += 1;
        if (queriesCount === 1) {
          url += '?';
        } else {
          url += '&';
        }
        url += `${key}=${queries[key]}`;
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
  draggable (elementSelector = '', handleClasses = [], center = false) {
    const element = document.querySelector(elementSelector);
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;
    element.onmousedown = dragMouseDown;

    if (handleClasses.length > 0) {
      handleClasses.forEach((handleClass) => {
        const el = element.querySelector(`.${handleClass}`);
        el.style.cursor = 'move';
      });
    }

    if (center) {
      element.style.position = 'absolute';
      element.style.top = document.documentElement.scrollTop + 80 + 'px';
      element.style.left = '50%';
      element.style.transform = 'translateX(-50%)';
    }

    function dragMouseDown (e) {
      if (handleClasses.length > 0) {
        const classNames = (e.target.className || '').split(' ');
        const handles = classNames.filter((className) => {
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

    function elementDrag (e) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = (element.offsetTop - pos2) + 'px';
      element.style.left = (element.offsetLeft - pos1) + 'px';
    }

    function closeDragElement () {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
};

// イベント設定
$('body')
  // ページ上部に移動
  .on('click', '#move-page-top', (event) => {
    event.stopPropagation();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  })
;

const $movePageTop = $('#move-page-top');
$(window).scroll((event) => {
  if ($(event.target).scrollTop() > 100) {
    $movePageTop.addClass('show');
  } else {
    $movePageTop.removeClass('show');
  }
});
