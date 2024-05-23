<template>
  <div class="input-group">
    <label :for="name">{{ title }}:</label>
    <input
      :type="showPass && type === 'password' ? 'text' : type"
      v-mask="mask"
      :id="name"
      v-model="content"
      :placeholder="placeholder"
      :class="{ error: hasError }"
      :autocomplete="autocomplete"
      required
    />
    <img v-if="type === 'password'" :src="`${baseUrl}images/${showPass ? 'opened' : 'closed'}-eye.webp`" alt="Ver a senha" @click="toggleShowPass">
    <small v-if="hasError">{{ error }}</small>
  </div>
</template>

<script>
import { ref, computed, toRefs } from 'vue';

export default {
  name: 'Input',
  props: {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    error: {
      type: String,
    },
    autocomplete: {
      type: String,
    },
    mask: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
    },
    hasError: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue, hasError, autocomplete, title, name, type, placeholder, error } = toRefs(props);

    const showPass = ref(false);
    const baseUrl = ref(import.meta.env.MODE === 'production' ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_BASE_URL_DEV);

    const toggleShowPass = () => { showPass.value = !showPass.value; };

    const content = computed({
      get() {
        return modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      }
    });

    return {
      title,
      name,
      type,
      placeholder,
      error,
      autocomplete,
      content,
      hasError,
      showPass,
      toggleShowPass,
      baseUrl
    };
  },
  computed: {
    content: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.input-group {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  margin-bottom: 32px;

  label {
    color: var(--text-color);
  }

  input {
    width: calc(100% - 46px);
    color: var(--input-text);
    font-size: 14px;
    line-height: 24px;
    background-color: var(--title-color);
    border-radius: 4px;
    border: 2px solid var(--title-color);
    font-weight: 400;
    height: 40px;
    padding: 0px 30px 0px 12px;
    transition: .3s;

    &:focus {
      outline: 0;
    }

    &.error {
      border: 2px solid var(--danger);
    }
  }

  img {
    position: absolute;
    right: 6px;
    top: 40px;
    cursor: pointer;
  }

  small {
    font-weight: 600;
    color: var(--danger);
  }
}
</style>
