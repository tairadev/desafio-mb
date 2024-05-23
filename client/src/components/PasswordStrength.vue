<template>
  <div class="password-strength">
    <p>Sua senha precisa:</p>
    <ul>
      <li :class="verifyPass.isMin ? 'check' : 'not-check'">
        <img :src="`${baseUrl}images/${switchImg(verifyPass.isMin)}`" alt="Mínimo 8 caracteres">
        Ter no mínimo 8 caracteres
      </li>
      <li :class="verifyPass.isNumber ? 'check' : 'not-check'">
        <img :src="`${baseUrl}images/${switchImg(verifyPass.isNumber)}`" alt="Mínimo 1 número">
        Ter no mínimo 1 número
      </li>
      <li :class="verifyPass.isUpper ? 'check' : 'not-check'">
        <img :src="`${baseUrl}images/${switchImg(verifyPass.isUpper)}`" alt="Mínimo 1 letra maiúscula">
        Ter no mínimo 1 letra maiúscula
      </li>
      <li :class="verifyPass.isLower ? 'check' : 'not-check'">
        <img :src="`${baseUrl}images/${switchImg(verifyPass.isLower)}`" alt="Mínimo 1 letra minúscula">
        Ter no mínimo 1 letra minúscula
      </li>
      <li :class="verifyPass.isSpecial ? 'check' : 'not-check'">
        <img :src="`${baseUrl}images/${switchImg(verifyPass.isSpecial)}`" alt="Mínimo 1 caractere especial">
        Ter no mínimo 1 caractere especial
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PasswordStrength',
  props: {
    verifyPass: {
      type: Object,
    },
  },
  setup(props) {
    const baseUrl = ref(import.meta.env.VITE_BASE_URL);

    const switchImg = (value) => {
      return value ? 'password-requirement-status.svg' : 'password-requirement-wrong.svg';
    };

    return {
      baseUrl,
      verifyPass: props.verifyPass,
      switchImg
    };
  },
};
</script>

<style lang="scss" scoped>
.password-strength {
  text-align: start;
  margin: 0 0 32px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  p {
    color: var(--text-color);
    font-weight: 700;
    font-size: 14px;
    line-height: 15px;
    margin-bottom: 10px;
    strong {
      font-weight: 700;
    }
  }
}
.check {
  color: var(--success);
}
.not-check {
  color: var(--danger);
}
</style>
