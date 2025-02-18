<template>
  <div class="suggest">
    <Input
        label="Пользователь или компани"
        :selected-suggest="state.selectedSuggest"
        @update:model-value="updateList"
        @clear:selected-suggest="clearSelectedSuggest"
    />
    <List
        :suggest-list="props.suggestList"
        :selected-suggest="state.selectedSuggest"
        @update:selected-suggest="updateSelectedSuggest"
    />
  </div>
</template>
<script setup lang="ts">
import Input from "@/components/suggest/components/input.vue";
import List from "@/components/suggest/components/list.vue";
import type { ISuggest } from "@/types/input-with-suggest.ts";
import { reactive } from "vue";

interface IProps {
  suggestList: ISuggest[],
}

interface IState {
  selectedSuggest: ISuggest,
}

interface IEmit {
  "update:fetch": [inputValue: string]
}

const state = reactive({
  selectedSuggest: null,
})
const emit = defineEmits<IEmit>()
const props = defineProps<IProps>();

function updateList(inputValue: string) {
  emit("update:fetch", inputValue); // Пробрасываем выше
}
function updateSelectedSuggest(suggest: ISuggest) {
  state.selectedSuggest = suggest;
}
function clearSelectedSuggest() {
  state.selectedSuggest = null;
}

</script>
