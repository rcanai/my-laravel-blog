<template>
  <div
    class="div-table-grid"
    @mousemove="columnResizeMove($event)"
    @mouseleave="componentLeave($event)"
    @mouseup="columnResizeEnd($event)"
    v-bind:style="{'width': width, 'min-height': minHeight}">
    <div
      v-if="!!mouseLeft"
      class="table-grid-drag-bar"
      :style="{'left': mouseLeft + 'px'}"></div>
    <div class="table-grid-component-wrapper">
      <div class="table-grid-component-header">
        <div class="table-grid-actions">
          <slot name="actions"></slot>
        </div>
        <div class="table-grid-pagenations">
          <span
            class="table-grid-pagenation"
            @click="setPage(currentPage -1)">&lt;</span>
          <span
            v-if="showFirstIndex"
            class="table-grid-pagenation is-page-index"
            @click="setPage(1)">{{1}}...</span>
          <span
            v-for="p in paginations"
            class="table-grid-pagenation is-page-index"
            :class="{'is-current-page': p === currentPage}"
            @click="setPage(p)"
            :key="p">{{p}}</span>
          <span
            v-if="showLastIndex"
            class="table-grid-pagenation is-page-index"
            @click="setPage(lastPageIndex)">...{{lastPageIndex}}</span>
          <span
            class="table-grid-pagenation"
            @click="setPage(currentPage + 1)">&gt;</span>
        </div>
      </div>
      <table
        class="table-grid">
        <!-- head -->
        <thead class="table-grid-head">
          <tr class="table-grid-head-row">
            <!-- th radio -->
            <th
              style="min-width:30px;padding:0 0.25rem"
              v-if="!!singleSelectable">{{singleSelectable}}</th>
            <!-- th checkbox -->
            <th
              style="min-width:30px;padding:0 0.25rem"
              v-if="!!selectable">{{selectable}}</th>
            <!-- th cell -->
            <th
              v-for="column in columns"
              @click="sortBy(column.key)"
              :title="column.name"
              :style="{
                'min-width': column.width + 'px',
                'max-width': column.width + 'px'
              }"
              :class="{
                'is-sort-key': sortKey === column.key,
                'is-sortable': sortable
              }"
              :key="column.key">{{column.name}}
              <div
                class="arrow"
                :class="sortOrders[column.key] > 0 ? 'asc' : 'dsc'"
                v-if="sortKey === column.key">
              </div>
              <div
                @mousedown="columnResizeStart(column, $event)"
                class="column-resize">&nbsp;</div>
            </th>
          </tr>
        </thead>
        <!-- body -->
        <tbody class="table-grid-body">
          <tr
            v-for="row in gridRows"
            @click.stop="clickRow(row.id)"
            class="table-grid-body-row"
            :class="{'selected': row._selected, 'single-selected': singleSelectedId === row.id}"
            :key="row.id">
            <!-- radio -->
            <td
              class="cell-radio"
              style="min-width:30px; cursor:default !important;"
              @click.stop="changeSingleSelect(row.id)"
              v-if="!!singleSelectable">
              <input
                type="radio"
                :name="gridId +'-radio'"
                v-model="singleSelectedId"
                :value="row.id"
                @click.stop="changeSingleSelect(row.id)">
            </td>
            <!-- checkbox -->
            <td
              class="cell-checkbox"
              style="min-width:30px; cursor:default !important;"
              @click.stop="toggleSelect(row.id)"
              v-if="!!selectable">
              <input
                type="checkbox"
                v-model="row._selected"
                @click.stop="toggleSelect(row.id)">
            </td>
            <!-- cell -->
            <td
              v-for="column in columns"
              :key="column.key"
              @click="clickCell($event, column, row)"
              :title="row[column.key]"
              :class="[
                'align-' + (column.align || ''),
                {
                  'with-input': !!column.input
                }
              ]"
              :style="{
                'min-width': column.width + 'px',
                'max-width': column.width + 'px'
              }">
              <select
                v-if="cellSelect(column, row)"
                @change="changeInput($event, column, row.id)"
                :value="cellInputValue(column.key, row.id)"
                style="padding:0;width:100%;height:auto;">
                <option
                  v-for="inputKey in column.input"
                  :key="inputKey"
                  :value="inputKey">{{column.input[inputKey]}}</option>
              </select>
              <input
                v-else-if="cellInput(column, row)"
                type="text"
                @change="changeInput($event, column, row.id)"
                :value="cellInputValue(column.key, row.id)"
                style="padding:0;width:100%;height:auto;">
              <div v-else v-html="row[column.key]"></div>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// [参考](https://jp.vuejs.org/v2/examples/grid-component.html)
/*
Publicメソッド
  - [set]    setRows(): void
  - [get]    getRows(): Array<Object>
  - [get]    getRow( rowId: number): Array
  - [get]    getRowByIndex(index: number): Object
  - [get]    getSelectedRows(): Array<Object>
  - [get]    getSelectedIdArray(): Array<number>
  - [get]    getSingleSelectedRow(): Object
  - [get]    getSingleSelectedRowIndex(): number
  - [add]    insertRow(data: Object): void
  - [update] updateRow(rowId: number, data: Object): void
  - [delete] deleteRow(rowId: number): void
  - [delete] deleteRows(rowId: Array<number>): void
Emitメソッド
  - [click-row] clickRow(): row
カラム
columns: {
  name:      [必須] {string} 列名
  key:       [必須] {number} キー
  width:     [必須] {number} 列幅
  align:     {string} text-align (left | center | right)
  input:     {*} セルの入力イベント
             trueを指定...input[type=text]が登場
             オブジェクトを指定...selectboxが登場
  callback   {function} セルリック時にコールバックを返す
             function (value: string, row: Object): void
  formatter: {function} 表示文字の整形
             function (value: string, row: Object): string
}
※ その他はpropsを参照
*/
import Vue from 'vue';

export default Vue.extend({
  name: 'TableGrid',
  props: {
    // 固有ID
    gridId: {
      default: 'table-grid',
      type: String
    },
    // 左列のラジオボタンの有無（空文字の場合はラジオボタン列が非表示）
    singleSelectable: {
      default: '',
      type: String
    },
    // 左列のチェックボックスの有無（空文字の場合はチェックボックス列が非表示）
    selectable: {
      default: '',
      type: String
    },
    // 列 (必須)
    columns: {
      default: [],
      type: Array,
      required: true
    },
    // 列のソート有無
    sortable: {
      default: true,
      type: Boolean
    },
    // 初期状態のソートキー
    defaultSortKey: {
      default: '',
      type: String
    },
    // グリッド全体の幅
    width: {
      default: '100%',
      type: String
    },
    // グリッド全体の最小の高さ
    minHeight: {
      default: '300px',
      type: String
    },
    // 1ページの行数
    pageRowCount: {
      default: 20,
      type: Number
    },
    // ページネーションの最大値
    maxPagination: {
      default: 4,
      type: Number
    }
  },
  data () {
    const sortOrders = {};
    this.columns.forEach((column) => {
      sortOrders[column.key] = 1;
    });
    return {
      // 全体の行
      rows: [],
      // ラジオボタンで選択している行
      singleSelectedId: 0,
      currentPage: 1,
      pages: [],
      lastPageIndex: 0,
      sortKey: '',
      sortOrders: sortOrders,
      paginations: [],
      mouseLeft: 0,
      columnResizingObject: {},
      columnResizingStartLeft: 0,
      clickCellColumnKey: null,
      clickCellRowId: null
    };
  },
  computed: {
    // グリッドに実際に出力するデータを生成
    // このデータは表示用のため直接取得してもリアクティブではない点に注意
    gridRows () {
      // ソート
      const _sortKey = this.sortKey;
      const _order = this.sortOrders[_sortKey] || 1;
      let _rows = this.rows;
      if (_sortKey) {
        _rows = _rows.sort((a, b) => {
          a = a[_sortKey];
          b = b[_sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * _order;
        });
      }
      // ページを求める
      this.lastPageIndex = Math.ceil(_rows.length / this.pageRowCount);
      const _page = (this.currentPage - 1) * this.pageRowCount;
      let _pageRows = _rows.slice(_page, _page + this.pageRowCount);
      // フォーマット
      const formatedRows = [];
      _pageRows.forEach((row) => {
        // オブジェクトを展開して参照を移してからPUSH
        formatedRows.push(this.formatRow({...row}));
      });
      _pageRows = null;
      _rows = null;
      // ページネーション
      const _paginations = [];
      const _start = this.currentPage;
      for (let i = 0; i < this.maxPagination; i++) {
        const _index = i + _start;
        if (_index > this.lastPageIndex) break;
        _paginations.push(_index);
      }
      if (_paginations.length < this.maxPagination) {
        for (let i = (_paginations[0] - 1); i >= 1; i--) {
          if (_paginations.length >= this.maxPagination) break;
          _paginations.unshift(i);
        }
      }
      this.paginations = _paginations;
      // グリッドの行配列を返す
      return formatedRows;
    },
    // ページネーションの一番最初に移動するボタン
    showFirstIndex () {
      if (this.rows.length === 0) {
        return false;
      }
      if (this.paginations[0] !== 1) {
        return true;
      }
      return false;
    },
    // ページネーションの一番最後に移動するボタン
    showLastIndex () {
      if (this.rows.length === 0) {
        return false;
      }
      const _length = this.paginations.length;
      if (this.paginations[_length - 1] < this.lastPageIndex) {
        return true;
      }
      return false;
    }
  },
  methods: {
    // public: 行を再設定
    setRows (rows) {
      rows.forEach((row) => {
        this.$set(row, '_selected', false);
      });
      this.rows = rows;
    },
    // public: すべての行を取得
    getRows () {
      return this.rows;
    },
    // public: a
    getRow (rowId) {
      const row = this.rows.find((row) => {
        return row.id === rowId;
      });
      return row;
    },
    // public: 配列の添字をもとに1行を取得
    getRowByIndex (index) {
      const row = this.rows[index];
      return row;
    },
    // public: チェックボックスで選択している行を取得
    getSelectedRows () {
      const selectedRows = this.rows.filter((row) => {
        return row._selected;
      });
      return selectedRows;
    },
    // public: チェックボックスで選択している行のID配列を取得
    getSelectedIdArray () {
      const idArray = [];
      this.rows.forEach((row) => {
        if (row._selected) idArray.push(row.id);
      });
      return idArray;
    },
    // public: ラジオボタンで選択している行を取得
    getSingleSelectedRow () {
      const singleSelectedRow = this.rows.find((row) => {
        return row.id === this.singleSelectedId;
      });
      return singleSelectedRow;
    },
    // public: ラジオボタンで選択している行の添字を取得
    getSingleSelectedRowIndex () {
      const index = this.rows.findIndex((row) => {
        return row.id === this.singleSelectedId;
      });
      return index;
    },
    // public: 行を追加
    insertRow (data = {}) {
      this.$set(data, '_selected', false);
      this.rows.push(data);
    },
    // public: 行を更新
    updateRow (rowId, data = {}) {
      this.$set(data, '_selected', false);
      const rowIndex = this.rows.findIndex((row) => {
        return row.id === rowId;
      });
      if (rowIndex !== null && rowIndex !== undefined) {
        this.rows.splice(rowIndex, 1, data);
      }
    },
    // public: 行を削除
    deleteRow (rowId) {
      const rowIndex = this.rows.findIndex((row) => {
        return row.id === rowId;
      });
      if (rowIndex !== null && rowIndex === undefined) {
        this.rows.splice(rowIndex, 1);
      }
    },
    // public: 複数行を削除
    deleteRows (rowIdArray = []) {
      if (rowIdArray.length === 0) {
        return;
      }
      rowIdArray.forEach((id) => {
        this.deleteRow(id);
      });
    },
    // emit: 行をクリックしたときの動作
    clickRow (rowId) {
      const row = this.getRow(rowId);
      this.$emit('click-row', row);
    },
    // セルクリックイベント
    clickCell (event, column, row) {
      // セルの入力切替
      if (typeof column.input === 'object' || column.input === true) {
        event.stopPropagation();
        event.preventDefault();
        this.clickCellColumnKey = column.key;
        this.clickCellRowId = row.id;
      }
      // セルのオンクリックイベント
      if (typeof column.callback === 'function') {
        event.stopPropagation();
        event.preventDefault();
        const _row = this.getRow(row.id);
        // セルの値と行を返す
        column.callback(_row[column.key], _row);
      }
    },
    // セルの値をINPUT/SELECTに出力
    cellInputValue (columnKey, rowId) {
      const row = this.getRow(rowId);
      return row[columnKey];
    },
    // セルにSELECTを表示
    cellSelect (column, row) {
      if (typeof column.input === 'object') {
        if (column.key === this.clickCellColumnKey && row.id === this.clickCellRowId) {
          return true;
        }
      }
      return false;
    },
    // セルにINPUTを表示
    cellInput (column, row) {
      if (typeof column.input === 'boolean' && column.input) {
        if (column.key === this.clickCellColumnKey && row.id === this.clickCellRowId) {
          return true;
        }
      }
      return false;
    },
    // セルのINPUT/SELECTの変更イベント
    changeInput (event, column, rowId) {
      event.stopPropagation();
      event.preventDefault();
      const row = this.getRow(rowId);
      row[column.key] = event.target.value;
      this.clickCellColumnKey = null;
      this.clickCellRowId = null;
      if (typeof column.callback === 'function') {
        column.callback(event.target.value, row);
      }
    },
    // 行のフォーマッター
    formatRow (row) {
      for (const index in this.columns) {
        if (!this.columns.hasOwnProperty(index)) return;
        const column = this.columns[index];
        if (typeof column.formatter === 'function') {
          row[column.key] = column.formatter(row[column.key], row);
        }
      }
      return row;
    },
    // チェックボックスの行選択を切り替え
    toggleSelect (rowId) {
      const row = this.getRow(rowId);
      row._selected = !row._selected;
    },
    // ラジオボタンの行選択を切り替え
    changeSingleSelect (rowId) {
      this.singleSelectedId = rowId;
    },
    // ページを設定
    setPage (page) {
      if (page < 1 || page > this.lastPageIndex) return;
      this.currentPage = page;
    },
    // ソートイベント
    sortBy: function (key) {
      if (!this.sortable) return;
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
      this.currentPage = 1;
    },
    // コンポーネントのそのにマウスが出た
    componentLeave (event) {
      event.stopPropagation();
      event.preventDefault();
      if (this.mouseLeft > 0) {
        this.mouseLeft = 0;
      }
    },
    // 列幅変更イベントの開始
    columnResizeStart (column, event) {
      event.stopPropagation();
      event.preventDefault();
      this.columnResizingObject = column;
      this.columnResizingStartLeft = event.clientX;
      this.mouseLeft = event.clientX;
    },
    // 列幅変更の現在線を表示
    columnResizeMove (event) {
      event.stopPropagation();
      event.preventDefault();
      if (this.mouseLeft > 0) {
        this.mouseLeft = event.clientX;
      }
    },
    // 列幅変更イベントの終了
    columnResizeEnd (event) {
      event.stopPropagation();
      event.preventDefault();
      if (this.mouseLeft > 0) {
        const diff = event.clientX - this.columnResizingStartLeft;
        let _width = (this.columnResizingObject.width || 0) + diff;
        if (_width < 30) {
          // 最小値を30に設定
          _width = 30;
        }
        this.columnResizingObject.width = _width;
        this.mouseLeft = 0;
        this.$forceUpdate();
      }
    }
  },
  created () {
    this.sortKey = this.defaultSortKey;
  }
});
</script>

<style scoped>
/* root */
.div-table-grid {
  overflow-x: auto;
  overflow-y: auto;
}
.div-table-grid * {
  box-sizing: border-box;
}
.table-grid-component-wrapper {
  display: inline-block;
}
/* drag bar */
.div-table-grid .table-grid-drag-bar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #aaa6a7;
  height: 100vh;
  width: 1px;
  z-index: 999;
}
/* header */
.table-grid-component-header {
  padding: 0.5rem 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  user-select: none;
  clear: both;
}
/* actions */
.div-table-grid .table-grid-actions {
  flex-basis: 50%;
  text-align: left;
}
/* pagenations */
.div-table-grid .table-grid-pagenations {
  flex-basis: 50%;
  text-align: right;
}
.div-table-grid .table-grid-pagenation {
  cursor: pointer;
  display: inline-block;
  text-align: center;
  border: 1px solid #aaa6a7;
  min-width: 2rem;
  background-color: #eaedef;
  margin-left: 0.5rem;
}
.div-table-grid .table-grid-pagenation:hover {
  font-weight: bold;
}
.div-table-grid .table-grid-pagenation.is-page-index {
  background-color: #f5f8fa;
}
.div-table-grid .table-grid-pagenation.is-current-page {
  background-color: #eaedef;
}
/* table */
.div-table-grid .table-grid {
  color: #3a3a3a;
  background-color:#aaa6a7;
  border-collapse: separate;
  border-spacing: 1px;
}
.div-table-grid .table-grid-head {
  width: auto;
}
/* head */
.div-table-grid .table-grid-head-row {
  line-height: 2rem;
}
.div-table-grid .table-grid-head-row th {
  position: relative;
  line-height: 2rem;
  background-color: #eaedef;
  user-select: none;
  cursor: not-allowed;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.div-table-grid .table-grid-head-row th.is-sortable {
  cursor: default;
}
.div-table-grid .table-grid-head-row th.is-sort-key {
  text-decoration: underline;
}
.div-table-grid .table-grid-head-row .column-resize {
  cursor: col-resize;
  display: inline-block;
  position: absolute;
  height: 100%;
  right: 0;
  user-select: none;
  background-color: transparent;
  border: none;
  width: .2rem;
  /* set draggble */
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -khtml-user-drag: element;
  -webkit-user-drag: element;
}
/* rows */
.div-table-grid .table-grid-body-row {
  background-color: #FFFFFF;
  cursor: pointer;
  transition: all .2s;
}
.div-table-grid .table-grid-body-row:nth-child(even) {
  background-color: #FCFCFC;
}
.div-table-grid .table-grid-body-row:hover {
  background-color: #eaedef;
}
.div-table-grid .table-grid-body-row.selected {
  background-color: #e6f7d7;
}
.div-table-grid .table-grid-body-row.selected:hover {
  background-color: #d5e5c7;
}
.div-table-grid .table-grid-body-row.single-selected td:first-child {
  background-color: #e6f7d7;
}
/* cell */
.div-table-grid .table-grid-body-row td {
  padding: .25rem .5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.div-table-grid .table-grid-body-row td.with-click:hover {
  cursor: default;
  box-shadow: 0 0 0 1px #aaa6a7;
}
.div-table-grid .table-grid-body-row td.align-left {
  text-align: left;
}
.div-table-grid .table-grid-body-row td.align-center {
  text-align: center;
}
.div-table-grid .table-grid-body-row td.align-right {
  text-align: right;
}
.div-table-grid .cell-checkbox {
  vertical-align: middle;
  text-align: center;
}
.div-table-grid .cell-radio {
  vertical-align: middle;
  text-align: center;
}
.div-table-grid .table-grid .arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
}

.div-table-grid .table-grid .arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #857f80;
}

.div-table-grid .table-grid .arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #857f80;
}
</style>
