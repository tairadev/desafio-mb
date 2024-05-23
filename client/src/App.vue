<template>
  <div id="app">
    <Header />
    <Register />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Register from './views/Register.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Header,
    Register,
    Footer
  }
};
</script>

<style lang="scss">
@import "./global/scss/variables.scss";

html, body {
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}

#app {
  font-family: "IBM Plex Sans", sans-serif;
  text-align: center;
}

button {
  position: relative;
  cursor: pointer;
  transition: all 0.5s ease 0s;
  padding: 15px;
  width: 100%;
  height: 56px;
  border-radius: 4px;
  border: 0;
  background-color: var(--primary);
  color: var(--title-color);
  font-size: 16px;
  font-weight: 600;

  &:hover {
    opacity: .8;
  }

  &:disabled {
    background-color: var(--disabled-color);
    cursor: not-allowed;

    &:hover {
      opacity: 1;
    }
  }
  &.outline {
    background: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
  }
}
</style>
