const App = new Vue({
  el: '#app',
  data () {
    return {
      account: {
        id: Number($('#account-id').val()),
        login_id: '',
        name: '',
        phonetic: '',
        email: '',
        password: '',
        deleted: false
      }
    };
  },
  methods: {
    fetch () {
      axios.get(Utility.xhrUrl(['accounts', this.account.id]))
        .then((response) => {
          this.account = response.data;
        });
    },
    register () {
      axios({
        method: this.account.id ? 'put' : 'post',
        url: Utility.xhrUrl(['accounts']),
        data: {
          ...this.account
        }
      })
        .then((response) => {
          this.account = response.data;
        });
    },
    back () {
      history.back();
    }
  },
  mounted () {
    if (this.account.id) {
      this.fetch();
    }
  }
});
