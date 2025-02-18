<template>
    <Suggest :suggest-list="state.suggestList" @update:fetch="fetchData" />
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { httpClient } from "@/utils/httpClient.ts";
import Suggest from "@/components/suggest/suggest.vue";
import type { ISuggest, IResponseSuggestList } from "@/types/suggest.ts";

interface IState {
  suggestList: ISuggest[],
  error: string | null,
}

const state = reactive<IState>({
  suggestList: [],
  error: '',
})

async function getUsers(query: string): Promise<IResponseSuggestList | null> {
  return await httpClient<IResponseSuggestList>("suggest-mention", {
    params: { q: query },
  });
}

async function fetchData(str: string) {
  if(!str) {
    state.suggestList = [];
    return
  }

  const response = await getUsers(str);

  if (response?.data) {
    state.suggestList = [...response.data];
    state.error = null;
  } else {
    state.suggestList = [];
  }
}
</script>
