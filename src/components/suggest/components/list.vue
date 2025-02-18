<template>
  <transition name="fade" appear>
    <ul v-show="isListVisible" class="list">
      <li
          class="list__item"
          v-for="suggest in props.suggestList"
          :key="suggest.alias"
          @click="selectSuggest(suggest)">
        <div class="list__img-container">
          <img
              class="list__img"
              :src="suggest.avatar || placeholderImg"
              alt=""
          />
        </div>
        <div class="list__text-container">
          <div>{{ suggest.name || suggest.alias }}</div>
          <div class="list__text">
            @{{ suggest.alias }} {{ suggest.type === SuggestEnum.Company ? 'компания' : '' }}
          </div>
        </div>
      </li>
    </ul>
  </transition>
</template>
<script setup lang="ts">
import { computed } from "vue"
import placeholderImg from "@/assets/vite.svg";
import { SuggestEnum } from "@/types/suggest.ts";
import type { ISuggest } from "@/types/suggest.ts";

interface IProps {
  suggestList: ISuggest[],
  selectedSuggest: ISuggest | null,
}

interface IEmit {
  "update:selected-suggest": [value: ISuggest | null];
}

const emit = defineEmits<IEmit>()

const props = withDefaults(defineProps<IProps>(),{
  suggestList: () => [],
})

function selectSuggest(suggest: ISuggest) {
  emit("update:selected-suggest", suggest)
}

const isListVisible = computed(() => props.suggestList.length > 0 && !props.selectedSuggest);
</script>
<style lang="scss">
.list {
  background-color: $background-color;
  max-height: 230px;
  border-radius: 12px;
  max-width: 400px;
  box-shadow: 0 4px 10px $shadow-color;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;

    &__item {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    cursor: pointer;
    margin: 0;

    &:hover {
      background-color: $hover-color;
    }
  }

  &__img {
    display: flex;
    height: 35px;
    width: 35px;
  }

  &__img-container {
    margin-right: 12px
  }

  &__text-container {
    display: flex;
    flex-direction: column
  }

  &__text {
    color: $text-light;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
