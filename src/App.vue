<template>
 <div id="app" class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title">torre</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="clipped">
        <md-list>
          <md-list-item to="/">
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>

          <md-list-item to="/people">
            <md-icon>people</md-icon>
            <span class="md-list-item-text">People</span>
          </md-list-item>

          <md-list-item to="/jobs">
            <md-icon>work</md-icon>
            <span class="md-list-item-text">Jobs</span>
          </md-list-item>

          <md-list-item to="/organisations">
            <md-icon>apartment</md-icon>
            <span class="md-list-item-text">Organisations</span>
          </md-list-item>

          <md-list-item to="/dataanalysis">
            <md-icon>table_chart</md-icon>
            <span class="md-list-item-text">Data analysis</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view :key="$route.path" />
      </md-app-content>
    </md-app>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
</style>
