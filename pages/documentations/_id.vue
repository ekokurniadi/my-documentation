<template>
  <div>
    <h2 class="mb-4">{{ header.featureName }}</h2>
    <div class="card mb-4">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h6 style="font-weight: bold">Deskripsi</h6>
              <h6>{{ header.featureDescription }}</h6>
            </div>

            <div class="col-md-12" v-for="(data, index) in detail">
              <p style="font-weight: bold; font-size: 18px">
                {{ index + 1 }}. {{ data.title }}
              </p>
              <span style="font-weight: normal; font-size: 16px"
                >Author Name : </span
              ><span>{{ data.author_name }}</span>
              <div>
                <em style="font-weight: normal; font-size: 16px"
                  >Created At : </em
                ><span>{{ data.created_at }}</span>
              </div>
              <div>
                <em style="font-weight: normal; font-size: 16px"
                  >Updated At : </em
                ><span>{{ data.updated_at }}</span>
              </div>

              <p></p>
              <span style="font-weight: bold; font-size: 16px"
                >Path of File :</span
              >
              <span>{{ data.path }}</span>
              <p></p>
              <textarea
                name=""
                :id="data.id"
                rows="10"
                class="form-control"
                v-model="data.code"
              ></textarea>
              <p style="font-weight: bold; margin-top: 10px">Notes</p>
              <textarea
                class="form-control"
                v-model="data.description"
              ></textarea>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head: {
    link: [
      { rel: 'stylesheet', href: '/codemirror/lib/codemirror.css' },
      { rel: 'stylesheet', href: '/codemirror/theme/monokai.css' },
    ],
    script: [
      { src: '/codemirror/lib/codemirror.js' },
      { src: '/codemirror/mode/clike/clike.js' },
      { src: '/codemirror/mode/dart/dart.js' },
    ],
  },
  data() {
    return {
      detail: [],
      header: {
        featureName: '',
        featureDescription: '',
      },
    }
  },
  methods: {
    async getHeader() {
      return await this.$axios
        .get(`${process.env.API_BASE_URL}/features/` + this.$route.params.id)
        .then((res) => {
          this.header.featureName = res.data.feature_name
          this.header.featureDescription = res.data.feature_description
        })
    },
    async getAllDetail() {
      return await this.$axios
        .get(
          `${process.env.API_BASE_URL}/feature_details/` + this.$route.params.id
        )
        .then((response) => {
          this.detail = response.data.data

          this.detail.forEach((data) => {
            var editor = CodeMirror.fromTextArea(
              document.getElementById(data.id),
              {
                lineNumbers: true,
                mode: 'application/dart',
                theme: 'monokai',
                lineNumbers: true,
                lineWrapping: true,
                indentUnit: 4,
                height: 400,
                readOnly: true,
              }
            )
            editor.setSize(null, 400)
          })
        })
    },
  },
  mounted() {
    this.getHeader()
    this.getAllDetail()
  },
}
</script>
