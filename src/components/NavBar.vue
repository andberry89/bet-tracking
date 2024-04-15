<template>
  <div class="nav-bar">
    <div class="logo">
      <h1>Bet Tracking</h1>
      <!-- if a logo goes here use .logo-wrap -->
    </div>
    <div class="links">
      <router-link
        to="/contributors"
        class="button-link"
      >
        <button>Contributors</button>
      </router-link>
      <router-link
        to="/sheets"
        class="button-link"
      >
        <button>Sheets</button>
      </router-link>
      <router-link
        to="/dashboard"
        class="button-link"
      >
        <button>Dashboard</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>
<style scoped>
.nav-bar {
  border-bottom: 1px solid #ddd;
  height: 75px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-bar h1 {
  border-bottom: none;
  margin: 0;
}
/* .logo-wrap {
  width: 120px;
  height: 120px;
} */
.button-link {
  text-align: center;
  margin: 5px 10px;
  color: black;
  font-size: 22px;
  text-decoration: none;
}
</style>
