<template>
  <div class="autotextarea">
    <textarea
      :value="value"
      @input="updateValue($event.target.value)"
      @change="updateValue($event.target.value)"
      :rows="textAreaRows"
      columns="0"
      class="autotextarea-input"
      ></textarea>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'AutoTextarea',
  props: {
    value: {
      default: '',
      type: String
    },
    rows: {
      default: 4,
      type: Number
    }
  },
  computed: {
    textAreaRows () {
      const rows = Number(this.rows);
      const num = this.value.split('\n').length;
      return (num > rows) ? num : rows;
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value);
      this.$emit('change', value);
    }
  }
});
</script>

<style lang="scss" scoped>
.autotextarea {
  display: block;
  .autotextarea-input {
    resize: none;
    overflow-y: hidden;
    width: 100%;
  }
}
</style>
