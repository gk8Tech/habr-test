<template>
  <div class="input-tag">
    <label class="input-tag__label">Пользователь или компани</label>
    <input
        v-if="!state.selectedSuggest.length"
        type="text"
        v-model="state.search"
        placeholder="Введите логин"
    />
    <div class="input-tag__shadow-input" v-else>
      <div>@{{ state.selectedSuggest[0].alias }}</div>
      <button @click="removeTag">×</button>
    </div>
  </div>
  <suggest
      v-if="state.search.length >= 3 && state.filteredSuggestList.length"
      :filtered-suggest-list="state.filteredSuggestList"
      :selected-suggest="state.selectedSuggest"
      @click="selectUser"
  />
</template>
<script setup lang="ts">
import { reactive, watch } from "vue";
import suggest from "@/components/input-with-suggest/components/suggest.vue";
import type { ISuggest } from "@/types/input-with-suggest.ts";

interface IState {
  search: string,
  selectedSuggest: ISuggest[],
  filteredSuggestList: ISuggest[]
}

interface IProps {
  suggestList: ISuggest[]
}

interface IEmit {
  'fetchData': [search: string]
}

const emit = defineEmits<IEmit>()

const props = withDefaults(defineProps<IProps>(), {
  suggestList: () => []
})

const state = reactive<IState>({
  search: '',
  selectedSuggest: [],
  filteredSuggestList: [],
})

function removeTag() {
  state.selectedSuggest = [];
  emit("fetchData", state.search);
}

function selectUser(suggest:ISuggest) {
  state.selectedSuggest = [...state.selectedSuggest, suggest];
  state.search = '';
}


// Импортировать из lodash не будем, найдем готовую
function debounce(fn: (...args: any[]) => void, delay = 300) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}


const updateSuggestList = debounce(() => {
  if (state.search.length >= 3) {
    emit("fetchData", state.search);
  } else {
    state.filteredSuggestList = [];
  }
}, 300);

watch(() => state.search, updateSuggestList);

watch(
    () => props.suggestList,
    (newList) => {
      state.filteredSuggestList = newList;
    },
    { immediate: true }
);
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.input-tag {
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin-bottom: 12px;

  &__label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
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

    div {
      font-weight: bold;
      display: flex;
      align-items: center;
    }

    button {
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
}
</style>
