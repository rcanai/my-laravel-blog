const App = new Vue({
  el: '#app',
  data () {
    return {
      category: {
        id: Number($('#category-id').val()),
        name: ''
      }
    };
  },
  methods: {
    fetch () {
      axios.get(Utility.xhrUrl(['categories', this.category.id]))
        .then((response) => {
          this.category = response.data;
        });
    },
    register () {
      axios({
        method: this.category.id ? 'put' : 'post',
        url: Utility.xhrUrl(['categories']),
        data: {
          ...this.category
        }
      })
        .then((response) => {
          this.category = response.data;
        });
    },
    back () {
      history.back();
    }
  },
  mounted () {
    if (this.category.id) {
      this.fetch();
    }
  }
});
