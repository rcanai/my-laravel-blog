<template>
  <div class="fileinput">
    <input
      type="file"
      @click="click($event)"
      @change="change($event)"
      class="fileinput-input"
      >
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'FileInput',
  props: {
    upload: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    click (event) {
      event.target.value = '';
      this.$emit('click', event);
    },
    change (event) {
      if (this.upload) {
        this.uploadFiles(event.target.files);
      }
      this.$emit('change', event);
    },
    uploadFiles (files) {
      const formData = new FormData();
      for (const key in files) {
        if (files.hasOwnProperty(key)) {
          const file = files[key];
          formData.append('file[]', file, file.name);
        }
      }
      const options = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      axios.post(Utility.xhrUrl(['files']), formData, options)
        .then((response) => {
          this.$emit('uploaded', response.data);
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.fileinput {
  display: inline-block;
}
</style>
