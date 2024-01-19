<template>
  <div id="app">
    <Nav />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Nav from './components/Nav.vue';
export default {
  name:'App',
  components: {
    Footer,
    Nav

  }
}
</script>
