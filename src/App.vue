<template>
 <div id="app" class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary" md-elevation="1">
        <span class="md-title">torre search</span>
      </md-app-toolbar>
      <md-app-content>
        <Search />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  import Search from './components/Search.vue'
  export default {
    data: () => ({
      showNavigation: false,
    }),
    components: {
      Search
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
/*
.page-container {
  
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, .12);
}*/

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.md-drawer {
  height: 100vh;
}
</style>
