<template>
  <form @submit.prevent="handleSubmit">
    <h2>{{ sectionTitle }}</h2>
    <Input
      v-if="step === 1 || step === 4"
      title="E-mail"
      name="email"
      type="e-mail"
      placeholder="Digite o seu e-mail"
      error="Digite um e-mail válido"
      v-model="user.email"
      :hasError="user.email.length > 0 && !isEmailValid"
    />
    <template v-if="step === 1">
      <ul class="radios-group">
        <li :class="{ active: !user.isPJ }" @click="user.isPJ = false">Pessoa física</li>
        <li :class="{ active: user.isPJ }" @click="user.isPJ = true">Pessoa jurídica</li>
      </ul>
    </template>
    <template v-if="step === 2 || step === 4">
      <Input
        :title="user.isPJ ? 'Razão social' : 'Nome completo'"
        name="name"
        type="text"
        :placeholder="user.isPJ ? 'Digite a razão social' : 'Digite seu nome completo'"
        :error="user.isPJ ? 'Digite uma razão social válida' : 'Digite um nome válido'"
        v-model="user.name"
        :hasError="user.name.length > 0 && !isNameValid"
      />
      <Input
        :title="user.isPJ ? 'CNPJ' : 'CPF'"
        name="document"
        type="text"
        :placeholder="user.isPJ ? 'Digite seu CNPJ' : 'Digite seu CPF'"
        :error="user.isPJ ? 'Digite um CNPJ válido' : 'Digite um CPF válido'"
        v-model="user.document"
        :mask="user.isPJ ? '##.###.###/####-##' : '###.###.###-##'"
        :hasError="user.document.length > 0 && !isDocumentValid"
      />
      <Input
        :title="user.isPJ ? 'Data de abertura' : 'Data de nascimento'"
        name="date"
        type="text"
        :placeholder="user.isPJ ? 'Digite a data de abertura' : 'Digite sua data de nascimento'"
        :error="user.isPJ ? 'Digite uma data de abertura válida' : 'Digite uma data válida de um usuário maior de 18 anos'"
        v-model="user.date"
        mask="##/##/####"
        :hasError="user.date.length > 0 && !isDateValid"
      />
      <Input
        title="Telefone"
        name="phone"
        type="text"
        placeholder="Digite o seu telefone"
        error="Digite um telefone válido"
        v-model="user.phone"
        :mask="user.phone.length <= 14 ? '(##) ####-####' : '(##) #####-####'"
        :hasError="user.phone.length > 0 && !isPhoneValid"
      />
    </template>
    <template v-if="step === 3 || step === 4">
      <Input
        title="Senha"
        name="password"
        type="password"
        placeholder="Digite a sua senha"
        error="A senha deve atender a todos os requisitos"
        v-model="user.password"
        :hasError="user.password.length > 0 && !isPasswordValid"
        autocomplete="new-password"
      />
      <PasswordStrength :verifyPass="verifyPass" />
    </template>
    <input type="hidden" name="username" :value="user.email" autocomplete="username">

    <template v-if="step === 5">
      <img class="modal-icon" :src="`${baseUrl}images/${hasError ? 'error' : 'success'}-icon.svg`" alt="Sucesso" />
      <h3>{{ message }}</h3>
      <button @click="hasError ? prevStep() : step = 1">
        {{ hasError ? 'Revisar' : 'Novo cadastro' }}
      </button>
    </template>

    <div class="buttons-container" v-if="step < 5">
      <button type="button" class="outline" v-if="step > 1" @click="prevStep">Voltar</button>
      <button v-if="step === 4" type="submit" :disabled="isDisabled || isRequesting">
        {{ isRequesting ? 'Aguarde...' : 'Cadastrar' }}
      </button>
      <button v-else type="button" @click="nextStep" :disabled="isDisabled">Continuar</button>
    </div>
  </form>
</template>

<script>
import { ref, watch, computed } from 'vue';
import PasswordStrength from './PasswordStrength.vue';
import Input from './Input.vue';
import ValidationHelper from '../helpers/ValidationHelper';

export default {
  components: {
    PasswordStrength,
    Input,
  },
  setup() {
    const baseUrl = ref(import.meta.env.VITE_BASE_URL);

    const user = ref({
      isPJ: false,
      name: '',
      email: '',
      password: '',
      document: '',
      date: '',
      phone: ''
    });

    const step = ref(1);
    const message = ref('');
    const hasError = ref(false);
    const isRequesting = ref(false);
    
    const verifyPass = ref({
      isMin: false,
      isUpper: false,
      isLower: false,
      isNumber: false,
      isSpecial: false,
    });

    const nextStep = () => { step.value < 5 && step.value++; };
    const prevStep = () => { step.value > 1 && step.value--; };

    const handleSubmit = async () => {
      if (step.value === 4) {
        hasError.value = false;
        try {
          isRequesting.value = true;
          const response = await fetch('http://localhost:3000/registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user.value)
          });

          const res = await response.json();
          message.value = res.message;

          if (!response.ok) throw new Error(message);
          clearUser();
        } catch (error) {
          hasError.value = true;
        }
        nextStep();
      } else if (!isDisabled.value) {
        nextStep();
      }
      isRequesting.value = false;
    };

    const isEmailValid = computed(() => ValidationHelper.isEmailValid(user.value.email));
    const isNameValid = computed(() => ValidationHelper.isNameValid(user.value.name));
    const isDocumentValid = computed(() => ValidationHelper.isDocumentValid(user.value.document, user.value.isPJ));
    const isDateValid = computed(() => ValidationHelper.isDateValid(user.value.date, user.value.isPJ));
    const isPhoneValid = computed(() => ValidationHelper.isPhoneValid(user.value.phone));

    const isPasswordValid = computed(() => {
      const password = user.value.password;
      verifyPass.value.isNumber = /\d/.test(password);
      verifyPass.value.isMin = password.length >= 8;
      verifyPass.value.isUpper = /[A-Z]/.test(password);
      verifyPass.value.isLower = /[a-z]/.test(password);
      verifyPass.value.isSpecial = /[^A-Za-z0-9]/.test(password);
      return Object.values(verifyPass.value).every(value => value === true);
    });

    const sectionTitle = computed(() => {
      switch(step.value) {
        case 1:
          return 'Seja bem-vindo(a)!'
        case 2:
          return user.value.isPJ ? 'Pessoa Jurídica' : 'Pessoa Física';
        case 3:
          return 'Senha de acesso';
        case 4:
          return 'Revise suas informações';
      }
    });

    const clearUser = () => {
      user.value = {
        isPJ: user.value.isPJ,
        name: '',
        email: '',
        password: '',
        document: '',
        date: '',
        phone: ''
      };
    };

    watch(() => user.value.isPJ, clearUser);

    const isDisabled = computed(() => {
      switch (step.value) {
        case 1:
          return !isEmailValid.value;
        case 2:
          return !isNameValid.value || !isDocumentValid.value || !isDateValid.value || !isPhoneValid.value;
        case 3:
          return !isPasswordValid.value;
        default:
          return !isEmailValid.value || !isNameValid.value || !isDocumentValid.value || !isDateValid.value || !isPhoneValid.value || !isPasswordValid.value;
      }
    });

    return {
      baseUrl,
      user,
      step,
      message,
      hasError,
      isRequesting,
      verifyPass,
      handleSubmit,
      nextStep,
      prevStep,
      isDisabled,
      isEmailValid,
      isNameValid,
      isDocumentValid,
      isDateValid,
      isPhoneValid,
      isPasswordValid,
      sectionTitle
    };
  }
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  background-color: var(--form-background);
  border-radius: 8px;
  padding: 40px 48px;
  width: 100%;
  max-width: 516px;

  h2 {
    color: var(--text-color);
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    margin-bottom: 28px;
    letter-spacing: 0em;
    text-align: left;
  }

  .radios-group {
    list-style: none;
    padding: 0;
    margin: 0 0 32px;
    display: flex;
    justify-content: space-evenly;
    li {
      position: relative;
      padding-left: 15px;
      color: var(--text-color);
      cursor: pointer;
      &:before, &:after {
        content: '';
        position: absolute;
        border-radius: 50%;
      }
      &:before {
        width: 12px;
        height: 12px;
        left: 0;
        top: 4px;
        background-color: #FFFFFF;
      }
      &.active {
        &:after {
          width: 6px;
          height: 6px;
          left: 3px;
          top: 7px;
          background-color: #c70b0b;
        }
      }
    }
  }

  .buttons-container {
    display: flex;
    gap: 20px;
    margin-bottom: 0;
  }

  .modal-icon {
    margin: 0 auto;
    max-width: 125px;
  }

  h3 {
    color: a9a9a9;
    margin: 30px auto 40px;
  }

  @media (max-width: 768px) {
    padding: 20px 28px;
    width: calc(100% - 56px);
  }

  @media (max-width: 360px) {
    .buttons-container {
      flex-direction: column-reverse;
    }
  }
}
</style>
