<template>
  <footer>
    <a href="https://www.mercadobitcoin.com.br/" title="Mercado Bitcoin" target="_blank" rel="noopener noreferrer">
      <img src="/images/logo.svg" alt="Mercado Bitcoin" title="Mercado Bitcoin">
    </a>
    <div>
      <p>
        <a href="https://www.mercadobitcoin.com.br/termo" title="Mercado Bitcoin - Termos" target="_blank" rel="noopener noreferrer">Termos de uso</a> | <a href="https://www.mercadobitcoin.com.br/privacidade" title="Mercado Bitcoin - Privacidade" target="_blank" rel="noopener noreferrer">Política de privacidade</a><br />
        © Copyright 2024. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .3rem 2rem;
  background-color: var(--light-gray);
  img {
    max-width: 60px;
  }
  p {
    color: var(--text-color);
    font-size: 14px;
    text-align: right;
    a {
      color: var(--text-color);
      text-decoration: none;
    }
  }
  @media(max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 1.4rem 2rem;
  }
}
</style>
