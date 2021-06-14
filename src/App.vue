<template>
  <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="#">Sushi Coin Wallet</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    <div id="app">
      <Wallet />
    </div>
  </div>
</template>

<script>
import Wallet from "./components/wallet.vue";

export default {
  name: "App",
  components: {
    Wallet,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 10px;
}
</style>
