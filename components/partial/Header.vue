<template>
  <nav class="navbar navbar-expand navbar-dark bg-primary">
    <a class="sidebar-toggle mr-3" href="#"><i class="fa fa-bars"></i></a>
    <a class="navbar-brand" href="#">Dashboard</a>
    <div class="navbar-collapse collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a
            href="#"
            id="dd_user"
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            ><i class="fa fa-user"></i> {{ namaUser }}
          </a>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dd_user"
          >
            <a href="javascript:void(0)" @click="logout()" class="dropdown-item"
              >Logout</a
            >
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      namaUser: '',
    }
  },
  mounted() {
    if (this.$auth.user == undefined) {
      this.namaUser = 'User'
    } else {
      this.namaUser = this.$auth.user.name
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
