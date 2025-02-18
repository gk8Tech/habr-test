<template>
  <div>
    <Suggest :suggest-list="state.suggestList" @update:fetch="fetchData" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Suggest from "@/components/suggest/suggest.vue";
import type { ISuggest, IResponseSuggestList } from "@/types/input-with-suggest.ts";

interface IState {
  suggestList: ISuggest[],
  error: string | null,
}

const state = reactive<IState>({
  suggestList: [],
  error: '',
})

async function getUsers(query: string): Promise<IResponseSuggestList | null> {
  const params = new URLSearchParams();
  if (query) params.append("q", query);

  const url = `https://habr.com/kek/v2/publication/suggest-mention${params.toString() ? `?${params.toString()}` : ''}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      state.error = `Ошибка запроса: ${res.status} ${res.statusText}`;
      return null;
    }

    return await res.json();
  } catch (err) {
    state.error = "Ошибка сети: " + (err as Error).message;
    return null;
  }
}

async function fetchData(str: string) {
  const response = await getUsers(str);

  if (response?.data) {
    state.suggestList = [...response.data];
    state.error = null;
  } else {
    state.suggestList = [];
  }
}
</script>
