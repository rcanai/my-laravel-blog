<template>
  <div class="monthpicker">
    <input
      type="text"
      @click.stop="showCalendar()"
      @change="textChange($event)"
      :disabled="disabled"
      :value="formattedValue"
      maxlength="7">
    <div class="monthpicker-popup" v-if="isShow">
      <div class="monthpicker-header">
        <button
          type="button"
          title="today"
          @click="goToday()">▼</button>
        <button
          type="button"
          title="prev"
          class="button-datepicker-move"
          @click="goPrev()">&lt;</button>
        <div>
          <select :value="currentYear" @change="changeYear($event.target.value)">
            <option v-for="y in years" :key="y" :value="y">{{y}}</option>
          </select>
        </div>
        <button
          type="button"
          class="button-datepicker-move"
          title="next"
          @click="goNext()">&gt;</button>
        <button
          type="button"
          title="close"
          @click="hideCalendar()">&times;</button>
      </div>
      <div class="monthpicker-calendar">
        <div
          v-for="month in months"
          @click.stop="selectDate(month)"
          class="calendar-cell"
          :class="{
            'is-selected-date': month.yearMonth === value,
            'is-today': month.yearMonth === todayString
          }"
          :key="month.month">{{month.month}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'DatePicker',
  props: {
    value: {
      default: '',
      type: String
    },
    format: {
      default: 'YYYY-MM',
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data () {
    const yyyy = moment().format('YYYY');
    const mm = moment().format('MM');
    return {
      dateString: '',
      months: [],
      currentYear: 0,
      isShow: false,
      todayString: yyyy + mm,
      currentDateString: yyyy + mm
    };
  },
  computed: {
    formattedValue () {
      if (!this.value) {
        return '';
      }
      const momentObject = moment(this.value + '01', 'YYYYMMDD');
      return momentObject.format(this.format);
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
      const _moment = moment(_value + '-01', this.format);
      if (_moment.isValid()) {
        this.updateValue(_moment.format('YYYY') + _moment.format('MM'));
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
      this.updateValue(dayObject.yearMonth);
      this.hideCalendar();
    },
    createDayObject (momentObject) {
      const yyyy = momentObject.format('YYYY');
      const mm = momentObject.format('MM');
      return {
        year: yyyy,
        month: mm,
        yearMonth: yyyy + mm
      };
    },
    goPrev () {
      const _date = moment(this.currentDateString + '01', 'YYYYMMDD');
      this.currentDateString = _date.subtract(1, 'Y').format('YYYYMM');
      this.createCalendar();
    },
    goNext () {
      const _date = moment(this.currentDateString + '01', 'YYYYMMDD');
      this.currentDateString = _date.add(1, 'Y').format('YYYYMM');
      this.createCalendar();
    },
    goToday () {
      this.currentDateString = moment().format('YYYYMM');
      this.createCalendar();
    },
    changeYear (year) {
      const _date = moment(this.currentDateString + '01', 'YYYYMMDD');
      this.currentDateString = _date.set('year', year).format('YYYYMM');
      this.createCalendar();
    },
    createCalendar () {
      const _months = [];
      const _date = moment(this.currentDateString + '01', 'YYYYMMDD');
      _date.startOf('year');
      this.currentYear = _date.format('YYYY');
      [...Array(12)].forEach(() => {
        _months.push(this.createDayObject(_date));
        _date.add(1, 'M');
      });
      this.months = _months;
    }
  }
});
</script>

<style scoped>
.monthpicker {
  display: inline-block;
}
.monthpicker * {
  box-sizing: border-box;
}
.monthpicker .monthpicker-popup {
  position: absolute;
  z-index: 999;
  background-color: #FFFFFF;
  padding: 0.5rem;
  border: 1px solid #3a3a3a;
  border-radius: 0.2rem;
  box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
}
.monthpicker .monthpicker-header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.monthpicker .monthpicker-header > button {
  font-weight: normal;
  background-color: #FFFFFF;
  color: #3a3a3a;
}
.monthpicker .monthpicker-header > button:hover {
  background-color: #e5e5e5;
}
.monthpicker .monthpicker-calendar {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 4rem;
  width: 18.1rem;
}
.monthpicker .monthpicker-calendar .calendar-cell {
  width: calc(18rem / 6);
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;
}
.monthpicker .monthpicker-calendar .calendar-cell:hover {
  background-color: #BEE599 !important;
}
.monthpicker .monthpicker-calendar .calendar-cell.is-selected-date {
  background-color: rgba(190, 229, 153, 0.4);
}
.monthpicker .monthpicker-calendar .calendar-cell.is-today {
  font-weight: bold;
  border: 1px solid rgba(190, 229, 153, 0.6);
}
</style>
