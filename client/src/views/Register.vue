<template>
  <section class="register-page">
    <div class="container">
      <h1>
        Invista em criptomoedas, Renda Fixa Digital e Renda Variável Digital em um só lugar <img src="/images/rocket.svg" alt="🚀" title="🚀">
      </h1>
      <UserForm />
    </div>
  </section>
</template>

<script>
import UserForm from '../components/UserForm.vue';

export default {
  components: {
    UserForm
  }
};
</script>

<style lang="scss" scoped>
.register-page {
  min-height: calc(100vh - 148px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  .container {
    max-width: 1600px;
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 250px;
    flex: 1;
    h1 {
      font-size: 48px;
      line-height: 130%;
      letter-spacing: 0;
      color: var(--primary);
      text-align: left;
      width: 100%;
      img {
        display: inline;
        border: none;
        box-shadow: none;
        height: 1em;
        width: 1em;
        margin: 0 0.07em;
        vertical-align: -0.1em;
        background: none;
        padding: 0;
      }
    }
  }
  @media(max-width: 1366px) {
    .container {
      gap: 100px
    }
  }
  @media(max-width: 900px) {
    .container {
      flex-direction: column-reverse;
      justify-content: center;
      gap: 70px;
      h1 {
        font-size: 32px;
      }
    }
  }
}
</style>
