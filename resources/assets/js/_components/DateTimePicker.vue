<template>
  <div class="datetimepicker">
    <input
      type="text"
      @click.stop="showCalendar()"
      @change="textChange($event)"
      :disabled="disabled"
      :value="formattedValue">
    <div class="datetimepicker-popup" v-if="isShow">
      <div class="datetimepicker-header">
        <button
          type="button"
          title="today"
          v-if="false"
          @click="goToday()">▼</button>
        <button
          type="button"
          title="prev"
          class="button-datetimepicker-move"
          @click="goPrev()">&lt;</button>
        <div>
          <select :value="currentYear" @change="changeYear($event.target.value)">
            <option v-for="y in years" :key="y" :value="y">{{y}}</option>
          </select>
          -
          <select :value="currentMonth" @change="changeMonth($event.target.value)">
            <option v-for="m in 12" :key="m" :value="m">{{m}}</option>
          </select>
        </div>
        <button
          type="button"
          class="button-datetimepicker-move"
          title="next"
          @click="goNext()">&gt;</button>
        <button
          type="button"
          title="close"
          @click="hideCalendar()">&times;</button>
      </div>
      <div class="datetimepicker-calendar">
        <div
          v-for="head in headers"
          class="calendar-head"
          :key="head">{{head}}</div>
        <div
          v-for="day in days"
          @click.stop="selectDate(day)"
          :class="[
            'calendar-cell',
            'week-' + day.weekIndex,
            {
              'not-current-month': day.month !== currentMonth,
              'is-selected-date': day.systemFormat === value,
              'is-today': day.systemFormat === todayString
            }
          ]"
          :key="day.date">{{day.day}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// momentjsが必要
import Vue from 'vue';

export default Vue.extend({
  name: 'DateTimePicker',
  props: {
    value: {
      default: '',
      type: String
    },
    format: {
      default: 'YYYY-MM-DD HH:mm',
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data () {
    const systemFormat = 'YYYY-MM-DD HH:mm';
    return {
      days: [],
      headers: [],
      currentMonth: 0,
      currentYear: 0,
      isShow: false,
      systemFormat: systemFormat,
      todayString: moment().format(systemFormat),
      currentDateString: moment().format(systemFormat)
    };
  },
  computed: {
    formattedValue () {
      if (!this.value) {
        return '';
      }
      return moment(this.value, this.systemFormat).format(this.format);
    },
    years () {
      if (!this.currentYear) {
        return [];
      }
      const _year = Number(this.currentYear);
      const _years = [];
      for (let i = -5; i < 5; i++) {
        _years.push(_year + i);
      }
      return _years;
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value);
      this.$emit('change', value);
    },
    textChange (event) {
      const _value = event.target.value;
      const _moment = moment(_value, this.format);
      if (_moment.isValid()) {
        this.updateValue(_moment.format(this.systemFormat));
      } else {
        this.updateValue('');
        event.preventDefault();
        event.stopPropagation();
      }
      this.hideCalendar();
    },
    showCalendar () {
      if (this.isShow) {
        // すでに開いている場合は閉じる
        this.hideCalendar();
        return;
      }
      this.hideCalendar();
      this.createCalendar();
      this.isShow = true;
    },
    hideCalendar (interval = 0) {
      if (interval) {
        setTimeout(() => {
          this.isShow = false;
          this.days = [];
        }, interval);
      } else {
        this.isShow = false;
        this.days = [];
      }
    },
    selectDate (dayObject) {
      if (this.currentDateString) {
        // 時刻を引き継ぐ
        const oldDate = moment(this.currentDateString);
        const newDate = moment(dayObject.systemFormat);
        newDate.set('h', oldDate.get('hours'));
        newDate.set('m', oldDate.get('minutes'));
        const dateString = newDate.format(this.systemFormat);
        this.updateValue(dateString);
      } else {
        // 値を更新
        this.updateValue(dayObject.systemFormat);
      }
      this.hideCalendar();
    },
    createDayObject (momentObject) {
      return {
        year: momentObject.format('YYYY'),
        month: momentObject.format('M'),
        day: momentObject.format('D'),
        week: momentObject.format('ddd'),
        weekIndex: momentObject.format('e'),
        systemFormat: momentObject.format(this.systemFormat)
      };
    },
    goPrev () {
      const _date = moment(this.currentDateString, this.systemFormat);
      this.currentDateString = _date.subtract(1, 'M').format(this.systemFormat);
      this.createCalendar();
    },
    goNext () {
      const _date = moment(this.currentDateString, this.systemFormat);
      this.currentDateString = _date.add(1, 'M').format(this.systemFormat);
      this.createCalendar();
    },
    goToday () {
      this.currentDateString = moment().format(this.systemFormat);
      this.createCalendar();
    },
    changeYear (year) {
      const _date = moment(this.currentDateString, this.systemFormat);
      this.currentDateString = _date.set('year', year).format(this.systemFormat);
      this.createCalendar();
    },
    changeMonth (month) {
      const _date = moment(this.currentDateString, this.systemFormat);
      this.currentDateString = _date.set('month', month - 1).format(this.systemFormat);
      this.createCalendar();
    },
    createCalendar () {
      this.days = [];
      const _date = moment(this.currentDateString, this.systemFormat);
      this.currentYear = _date.format('YYYY');
      this.currentMonth = _date.format('M');
      _date.startOf('month').startOf('week');
      // 最初の1週間
      [...Array(7)].forEach(() => {
        this.days.push(this.createDayObject(_date));
        _date.add(1, 'd');
      });
      // 最終週の最終日まで
      for (let index = 0; index < 5; index++) {
        if (this.currentMonth !== _date.format('M')) {
          break;
        }
        // 1週間ループ
        [...Array(7)].forEach(() => {
          this.days.push(this.createDayObject(_date));
          _date.add(1, 'd');
        });
      }
    }
  },
  mounted () {
    const _moment = moment().startOf('week');
    [...Array(7)].forEach(() => {
      this.headers.push(_moment.format('ddd'));
      _moment.add(1, 'd');
    });
  }
});
</script>

<style scoped>
.datetimepicker {
  display: inline-block;
  position: relative;
}
.datetimepicker * {
  box-sizing: border-box;
}
.datetimepicker > input {
  width: 12rem;
}
.datetimepicker .datetimepicker-popup {
  position: absolute;
  z-index: 999;
  background-color: #FFFFFF;
  padding: 0.5rem;
  border: 1px solid #3a3a3a;
  border-radius: 0.2rem;
  box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
}
.datetimepicker .datetimepicker-header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.datetimepicker .datetimepicker-header > button {
  font-weight: normal;
  background-color: #FFFFFF;
  color: #3a3a3a;
}
.datetimepicker .datetimepicker-header > button:hover {
  background-color: #e5e5e5;
}
.datetimepicker .datetimepicker-calendar {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 15rem;
  width: 20rem;
}
.datetimepicker .datetimepicker-calendar .calendar-head {
  width: calc(20rem / 7.1);
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  background-color: #e5e5e5;
  font-weight: bold;
}
.datetimepicker .datetimepicker-calendar .calendar-head:first-child {
  color: #f74b42;
}
.datetimepicker .datetimepicker-calendar .calendar-head:nth-child(7) {
  color: #415df7;
}
.datetimepicker .datetimepicker-calendar .calendar-cell {
  width: calc(20rem / 7.1);
  height: calc(20rem / 7.1);
  line-height: calc(20rem / 7.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;
}
.calendar-cell.week-0,
.calendar-cell.is-holiday {
  color: #f74b42;
}

.calendar-cell.week-6,
.calendar-cell.is-holiday {
  color: #415df7;
}
.datetimepicker .datetimepicker-calendar .calendar-cell:hover {
  background-color: #BEE599 !important;
}
.datetimepicker .datetimepicker-calendar .calendar-cell.not-current-month {
  opacity: 0.3;
}
.datetimepicker .datetimepicker-calendar .calendar-cell.is-selected-date {
  background-color: rgba(190, 229, 153, 0.4);
}
.datetimepicker .datetimepicker-calendar .calendar-cell.is-today {
  font-weight: bold;
  border: 0.1rem solid rgba(190, 229, 153, 0.6);
}
</style>
