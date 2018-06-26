import TableGrid from '../_components/TableGrid.vue';

const App = new Vue({
  el: '#app',
  components: {
    'table-grid': TableGrid
  },
  methods: {
    fetch () {
      axios.get(Utility.xhrUrl(['accounts']))
        .then((response) => {
          this.$refs['table-grid'].setRows(response.data);
        });
    },
    removes (idArray = []) {
      if (!confirm('Are you sure ?')) {
        return;
      }
      axios({
        method: 'delete',
        url: Utility.xhrUrl(['accounts']),
        data: {
          idArray: idArray
        }
      })
        .then(() => {
          this.fetch();
        });
    },
    openDialog () {
      return false;
    },
    selectedRemoves () {
      return false;
    }
  },
  created () {
    this.fetch();
  }
});
