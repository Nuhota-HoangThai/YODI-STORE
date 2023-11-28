<template>
  <div class="">
    <Header />
    <hr width="60%" align="center" />
    <nav-bar />
    <slot />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import NavBar from "../components/common/NavBar.vue";
export default { components: { Header, Footer, NavBar } };
</script>

<style></style>
