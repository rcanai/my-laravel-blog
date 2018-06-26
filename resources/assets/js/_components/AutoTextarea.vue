<template>
  <div class="autotextarea">
    <textarea
      :value="value"
      @input="updateValue($event.target.value)"
      @change="updateValue($event.target.value)"
      :rows="rows"
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
    }
  },
  computed: {
    rows () {
      const num = this.value.split('\n').length;
      return (num > 4) ? num : 4;
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
  display: inline-block;
  .autotextarea-input {
    overflow-y: scroll;
    width: 100%;
  }
}
</style>
