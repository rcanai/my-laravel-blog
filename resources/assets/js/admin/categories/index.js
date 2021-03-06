import TableGrid from '@js/_components/TableGrid.vue';

const App = new Vue({
  el: '#app',
  components: {
    'table-grid': TableGrid
  },
  methods: {
    fetch () {
      axios.get(Utility.xhrUrl(['categories']))
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
        url: Utility.xhrUrl(['categories']),
        data: {
          idArray: idArray
        }
      })
        .then(() => {
          this.fetch();
        });
    },
    goEdit (object) {
      Utility.setLocation(['categories', 'edit', object.id]);
    },
    selectedRemoves () {
      const idArray = this.$refs['table-grid'].getSelectedIdArray();
      this.removes(idArray);
    }
  },
  created () {
    this.fetch();
  }
});
