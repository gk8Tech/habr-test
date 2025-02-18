<template>
  <div class="input">
    <label class="input__label">{{ props.label }}</label>
    <input
        class="input__input"
        v-if="!selectedSuggest"
        type="text"
        v-model="state.value"
        placeholder="Введите логин"
    />
    <div class="input__shadow-input" v-else>
      <div class="input__text">@{{ selectedSuggest?.alias }}</div>
      <button class="input__button" @click="clear">×</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch, computed } from "vue";
import type { ISuggest } from "@/types/input-with-suggest.ts";

interface IProps {
  label: string,
  selectedSuggest?: ISuggest | null,
}

interface IEmit {
  "update:modelValue": [value: string];
  "clear:selectedSuggest": [value: null];
}

interface IState {
  value: string,
}

const props = withDefaults(defineProps<IProps>(), {
  selectedSuggest: null
})

const state = reactive<IState>({
  value: '',
})

const emit = defineEmits<IEmit>();

function clear() {
  state.value = '';
  emit("clear:selectedSuggest", null);
}

function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const updateValue = debounce((newValue: string) => {
  emit("update:modelValue", newValue);
}, 300);


const selectedSuggest = computed(() => props.selectedSuggest);

watch(() => state.value, (newValue) => {
  updateValue(newValue || "");
});
</script>
<style lang="scss">
@use "@/styles/variables" as *;

.input {
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin-bottom: 12px;

  &__label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  &__input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid $border-color;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
  }

  &__shadow-input {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    border: 1px solid $border-color;
    border-radius: 6px;
    font-size: 16px;
    cursor: default;
    min-width: 100%;
  }

  &__text {
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  &__button {
    background: $button-bg;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: $button-hover;
      transform: scale(1.1);
    }
  }
}
</style>
