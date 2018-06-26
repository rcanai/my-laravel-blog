<template>
  <div class="timepicker">
    <select :value="hour" @change="changeHour($event)" :disabled="disabled">
      <option value="">--</option>
      <option v-for="h in hourArray" :key="h" :value="h">
        {{h}}
      </option>
    </select>
    <div class="div-delimiter">{{delimiter}}</div>
    <select :value="minute" @change="changeMinute($event)"  :disabled="disabled">
      <option value="">--</option>
      <option v-for="m in minuteArray" :key="m" :value="m">
        {{m}}
      </option>
    </select>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'TimePicker',
  props: {
    value: {
      default: '',
      type: String
    },
    delimiter: {
      default: ':',
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      hourArray: [],
      minuteArray: []
    };
  },
  computed: {
    hour () {
      return (this.value || '').substr(0, 2);
    },
    minute () {
      return (this.value || '').substr(-2);
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value);
      this.$emit('change', value);
    },
    setTimeString (timeString) {
      if (typeof timeString === 'string' && timeString.length === 4) {
        this.hour = timeString.substr(0, 2);
        this.minute = timeString.substr(-2);
      }
    },
    // 時変更
    changeHour (event) {
      const _value = String(event.target.value);
      let timeValue = this.value;
      if (_value && !timeValue) {
        timeValue = _value + '00';
      } else if (_value) {
        timeValue = _value + timeValue.substr(-2);
      } else {
        timeValue = '';
      }
      this.updateValue(timeValue);
    },
    // 分変更
    changeMinute (event) {
      const _value = String(event.target.value);
      let timeValue = this.value;
      if (_value && !timeValue) {
        timeValue = '00' + _value;
      } else if (_value) {
        timeValue = timeValue.substr(0, 2) + _value;
      } else {
        timeValue = '';
      }
      this.updateValue(timeValue);
    }
  },
  created () {
    [...Array(24).keys()].forEach((i) => {
      this.hourArray.push(('0' + i).substr(-2));
    });
    [...Array(60).keys()].forEach((i) => {
      this.minuteArray.push(('0' + i).substr(-2));
    });
  }
});
</script>

<style scoped>
.timepicker {
  display: inline-block;
}
.timepicker * {
  box-sizing: border-box;
}
.div-delimiter {
  display: inline-block;
  padding-top: .25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
