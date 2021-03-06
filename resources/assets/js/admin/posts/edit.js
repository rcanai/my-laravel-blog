const App = new Vue({
  el: '#app',
  data () {
    return {
      post: {
        id: Number($('#post-id').val()),
        title: '',
        content_html: '',
        published_at: moment().format('YYYY-MM-DD HH:mm'),
        category_id: 0
      }
    };
  },
  methods: {
    fetch () {
      axios.get(Utility.xhrUrl(['posts', this.post.id]))
        .then((response) => {
          this.post = response.data;
        });
    },
    register () {
      axios({
        method: this.post.id ? 'put' : 'post',
        url: Utility.xhrUrl(['posts']),
        data: {
          ...this.post
        }
      })
        .then((response) => {
          this.post = response.data;
        });
    },
    back () {
      history.back();
    },
    fileUploaded (files) {
      files.forEach((file) => {
        const cursorLocation = this.$refs['post-editor'].quill.cursorLocation;
        this.$refs['post-editor'].quill.insertEmbed(cursorLocation, 'image', file.url);
      });
    }
  },
  mounted () {
    if (this.post.id) {
      this.fetch();
    }
  }
});
