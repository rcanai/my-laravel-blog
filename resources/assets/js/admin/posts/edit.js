const App = new Vue({
  el: '#app',
  data () {
    return {
      post: {
        id: Number($('#post-id').val()),
        title: '',
        content_html: ''
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
    }
  },
  mounted () {
    if (this.post.id) {
      this.fetch();
    }
  }
});
