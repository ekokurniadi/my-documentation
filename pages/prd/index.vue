<template>
  <div>
    <h2 class="mb-4">List of Documentations</h2>
    <div class="card mb-4">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <v-select
                v-model="pageSize"
                :items="pageSizes"
                label="Items per Page"
                @change="handlePageSizeChange"
              ></v-select>
            </div>
            <div class="col-md-4 ml-auto">
              <div class="d-flex">
                <input
                  type="text"
                  class="form-control"
                  name="search"
                  id="search"
                  v-model="searchParams"
                  @keyup="retrieveData()"
                  placeholder="search"
                />
                <button class="btn btn-sm btn-primary" @click="retrieveData()">
                  <span class="fa fa-search"></span> Search
                </button>
              </div>
            </div>

            <div class="col-md-12">
              <v-data-table
                :headers="headers"
                :items="documentations"
                :loading="loading"
                class="elevation-1 spacing-playground pa-6"
                :hide-default-footer="true"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <a
                    :href="item.link"
                    class="btn btn-danger btn-sm"
                    target="_blank"
                  >
                    Preview</a
                  >
                </template>
              </v-data-table>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <v-pagination
                v-model="page"
                :length="total_pages"
                total-visible="7"
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
                @input="handlePageChange"
              ></v-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-overlay :value="this.loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'documentations-list',
  data() {
    return {
      documentations: [],
      searchParams: '',
      headers: [
        {
          text: 'Document Name',
          align: 'start',
          sortable: false,
          value: 'documentName',
        },
        {
          text: 'Document Relation',
          align: 'start',
          sortable: false,
          value: 'documentRelation',
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ],
      page: 1,
      total_pages: 0,
      pageSize: 10,
      pageSizes: [5, 10, 25, 50, 100],
      loading: true,
    }
  },
  watch: {
    options: {
      handler() {
        this.retrieveData()
      },
      deep: true,
    },
  },
  methods: {
    getRequestParams(searchParams, page, pageSize) {
      let params = {}
      if (searchParams) {
        params['document_name'] = searchParams
      }
      if (page) {
        params['page'] = page - 1
      }
      if (pageSize) {
        params['size'] = pageSize
      }
      return params
    },

    async getAll(params) {
      return await this.$axios.get(`${process.env.API_BASE_URL}/prd_ssr`, {
        params,
      })
    },
    retrieveData() {
      const params = this.getRequestParams(
        this.searchParams,
        this.page,
        this.pageSize
      )
      this.getAll(params)
        .then((response) => {
          this.loading = true
          const { data, total_pages } = response.data
          this.documentations = data.map(this.getDisplayData)
          this.total_pages = total_pages
          this.loading = false
        })
        .catch((e) => {
          this.showErr(e)
        })
    },
    handlePageChange(value) {
      this.page = value
      this.retrieveData()
    },
    handlePageSizeChange(size) {
      this.pageSize = size
      this.page = 1
      this.retrieveData()
    },
    refreshList() {
      this.retrieveData()
    },

    getDisplayData(data) {
      return {
        id: data.id,
        documentName: data.document_name,
        documentRelation: data.description,
        link: data.link,
      }
    },
    showErr(err) {
      this.$toast.error(err, {
        duration: 1000,
        theme: 'toasted-primary',
        closeOnSwipe: true,
        position: 'top-right',
        keepOnHover: true,
      })
    },
    showAlert(data) {
      this.$swal(
        data.data.status.toUpperCase(),
        data.data.message,
        data.data.code
      )
    },
  },
  mounted() {
    this.retrieveData()
  },
}
</script>
<style>
.theme--light.v-pagination .v-pagination__item--active {
  color: red;
}
</style>
