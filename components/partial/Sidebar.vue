<template>
  <div class="sidebar sidebar-dark bg-dark">
    <ul class="list-unstyled">
      <li>
        <a href="#Project" data-toggle="collapse" aria-expanded="false">
          <i class="fa fa-fw fa-book"></i> Documentations</a
        >
        <ul class="collapse list-unstyled" id="Project">
          <li>
            <Nuxt-link to="/documentations">All Documentations</Nuxt-link>
            <Nuxt-link to="/prd">PRD</Nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
