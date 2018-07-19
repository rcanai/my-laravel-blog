<template>
  <div class="fileinput">
    <input
      type="file"
      ref="fileinput-input"
      @click="click($event)"
      @change="change($event)"
      class="fileinput-input"
      style="display:none;">
    <div class="action-area" @click="clickAction($event)">
      <p class="action-label">{{label}}</p>
    </div>
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
    },
    // 'image' | 'video' | 'text'
    types: {
      default () { return []; },
      type: Array
    },
    label: {
      default: 'Please select the file',
      type: String
    }
  },
  methods: {
    clickAction (event) {
      event.stopPropagation();
      event.preventDefault();
      this.$refs['fileinput-input'].click();
    },
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
        if (!files.hasOwnProperty(key)) continue;
        const file = files[key];
        if (!this.validType(file)) {
          this.$refs['fileinput-input'].value = '';
          window.alert('Type error');
          return;
        }
        formData.append('file[]', file, file.name);
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
    },
    validType (file) {
      if (!file || this.types.length === 0) {
        return true;
      }
      const arr = this.types.filter((type) => {
        return (file.type || '').indexOf(type) !== -1;
      });
      return arr.length > 0;
    }
  }
});
</script>

<style lang="scss" scoped>
.fileinput {
  display: inline-block;
  padding: .5rem 1rem;
  .action-area {
    cursor: pointer;
    padding: 1rem;
    background-color: #ffffff;
    border: 1px dashed rgba(#333333, .7);
    border-radius: .25rem;
    &:hover {
      background-color: rgba(#333333, .3);
    }
    p {
      white-space: nowrap;
      font-weight: bold;
    }
  }
}
</style>
