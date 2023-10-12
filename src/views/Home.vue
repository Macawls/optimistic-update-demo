<script setup>
import { useLikeStore } from '../stores/like/index'
import { computed, ref } from "vue";
import Footer from '../components/Footer.vue'
import heart_full from '../assets/heart-red.png'
import heart_empty from '../assets/heart.png'

const likeStore = useLikeStore();
const failureChance = ref(0.0);
const chanceStepOptions = Array.from({ length: 11 }, (_, index) =>
  parseFloat((0.1 * index).toFixed(1))
);

const getFailChanceVal = () => failureChance.value;
const onInputChange = (event) => {
  failureChance.value = event.target.value;
};

const messages = {
  notPerformed: {
    msg: "request not performed",
    color: "#e5c07b",
  },
  loading: {
    msg: "loading",
    color: "#61afef",
  },
  success: {
    msg: "success",
    color: "#98c379",
  },
  failure: {
    msg: "failure",
    color: "#e06c75",
  },
};

const status = computed(() => {
  if (!likeStore.hasInitiatedRequest) {
    return messages.notPerformed;
  }

  if (likeStore.isLoading) {
    return messages.loading;
  }

  return likeStore.status ? messages.success : messages.failure;
});
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <h2 class="font-medium" style="text-transform: uppercase; color: #e06c75">
      Failure <span style="text-transform: none; color: #a6adba"> chance 😔👍</span>
    </h2>
    <input
      type="range"
      min="0.0"
      max="1.0"
      class="range"
      :value="failureChance"
      step="0.1"
      @input="onInputChange"
    />
    <div class="w-full flex justify-between text-xs px-2">
      <span v-for="val in chanceStepOptions" :key="val">{{
        val * 100 + "%"
      }}</span>
    </div>
    <img
      :class="{ 'animate__animated animate__heartBeat': likeStore.status }"
      style="width: 150px"
      :src="likeStore.status ? heart_full : heart_empty"
    />
    <div class="flex flex-col gap-4 text-center">
      <div class="flex gap-4 mt-3">
        <button
          @click="likeStore.optimisticAction(getFailChanceVal())"
          class="btn"
        >
          Optimistic Action
        </button>
        <button
          @click="likeStore.non_optimisticAction(getFailChanceVal())"
          class="btn"
        >
          Non-Optimistic Action
        </button>
      </div>
      <button
        :class="likeStore.isLoading ? 'btn-disabled' : 'btn'"
        @click="likeStore.$reset()"
        class="btn"
      >
	  {{ likeStore.isLoading ? '' : 'Reset' }}
        <span v-if="likeStore.isLoading" class="loading loading-spinner"></span>
      </button>
      <h2 style="text-transform: uppercase" class="font-medium">
        Status: <span :style="{ color: status.color }">{{ status.msg }}</span>
      </h2>
    </div>
	<Footer/>
  </div>
</template>
