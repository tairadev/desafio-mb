<template>
  <header>
    <a href="https://www.mercadobitcoin.com.br/" title="Mercado Bitcoin" target="_blank" rel="noopener noreferrer">
      <img src="/images/logo.svg" alt="Mercado Bitcoin" title="Mercado Bitcoin">
    </a>
    <h3>Seja bem-vindo(a)!</h3>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .3rem 2rem;
  border-bottom: 1px solid var(--light-gray);
  img {
    max-width: 60px;
  }
  h3 {
    color: var(--primary);
  }
}
</style>
