<template>
  <transition name="fade" appear>
    <div v-show="props.filteredSuggestList?.length && !selectedSuggest.length" class="suggest">
      <div
          class="suggest__item"
          v-for="suggest in props.filteredSuggestList"
          :key="suggest.alias"
          @click="selectSuggest(suggest)">
        <div class="suggest__img-container">
          <img
              class="suggest__img"
              :src="suggest.avatar || placeholderImg"
              alt=""
          />
        </div>
        <div class="suggest__text-container">
          <div>{{ suggest.name || suggest.alias }}</div>
          <div class="suggest__text">
            @{{ suggest.alias }} {{ suggest.type === SuggestType.Company ? 'компания' : '' }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import placeholderImg from "@/assets/vite.svg";
import { SuggestType } from "@/types/input-with-suggest.ts";
import type { ISuggest } from "@/types/input-with-suggest.ts";

interface IProps {
  filteredSuggestList: ISuggest[],
  selectedSuggest: ISuggest[],
}

interface IEmit {
  'click': [suggest: ISuggest]
}

const emit = defineEmits<IEmit>()

const props = withDefaults(defineProps<IProps>(),{
  filteredSuggestList: () => [],
})

function selectSuggest(suggest: ISuggest) {
  emit("click", suggest)
}
</script>
<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.suggest {
  background-color: $background-color;
  max-height: 230px;
  border-radius: 12px;
  max-width: 400px;
  box-shadow: 0 4px 10px $shadow-color;
  overflow-y: auto;

  &__item {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    cursor: pointer;

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
