<template>
  <div>
    <input-tag :suggest-list="state.suggestList" @fetchData="fetchData" />
  </div>
</template>

<script setup lang="ts">
import { reactive} from "vue";
import inputTag from "@/components/input-with-suggest/input-tag.vue";
import type { ISuggest, IResponseSuggestList } from "@/types/input-with-suggest.ts";

interface IState {
  suggestList: ISuggest[],
  error: string | null,
}

const state = reactive<IState>({
  suggestList: [],
  error: '',
})

async function getUsers<T>(query: string): Promise<T | null> {
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

async function fetchData(search: string) {
  const response = await getUsers<IResponseSuggestList>(search);

  if (response?.data) {
    state.suggestList = [...response.data];
    state.error = null;
  } else {
    state.suggestList = [];
  }
}
</script>
