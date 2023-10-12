<script setup>
import { initialLikeState, useLikeStore } from "../stores/like/index";
import { computed, reactive, ref } from "vue";
import Footer from "../components/Footer.vue";
import Definition from "../components/Definition.vue";
import heart_full from "../assets/heart-red.png";
import heart_empty from "../assets/heart.png";

const likeStore = useLikeStore();

const isInitialLikeState = computed(() => {
  return likeStore.isSameAs(initialLikeState);
});

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

const timeOffset = 400;
const timeMultiplier = 1000;
const step = 0.2;

const options = reactive({
  failureChance: 0.0,
  requestTime: 1000
})


const chanceStepOptions = Array.from({ length: 6 }, (_, index) =>
  parseFloat((step * index).toFixed(1))
);

const timeStepOptions = Array.from({ length: 7 }, (_, index) =>
   Math.floor((step * index * timeMultiplier)) + timeOffset
);

</script>

<template>
  <div class="flex flex-col justify-center items-center gap-5 lg:gap-40">
  <Definition/>
  <Footer/>
  </div>
  <div class="flex flex-col items-center gap-5 w-96">
    <h2 class="font-medium" style="text-transform: uppercase; color: #61afef">
      Request
      <span style="text-transform: none; color: #a6adba"> time 😎🚀</span>
    </h2>
    <input
      type="range"
      :min="timeStepOptions[0]"
      :max="timeStepOptions[timeStepOptions.length - 1]"
      class="range"
      :value="options.requestTime"
      :step="step * timeMultiplier"
      @input="(event) => options.requestTime = event.target.value"
    />
    <div class="w-full flex justify-between text-xs px-2">
      <span v-for="val in timeStepOptions" :key="val">{{
        val >= 1000 ? `${val / 1000}s` : `0.${val / 100}s`
      }}</span>
    </div>
    
    <h2 class="font-medium" style="text-transform: uppercase; color: #e06c75">
      Failure
      <span style="text-transform: none; color: #a6adba"> chance 😔👍</span>
    </h2>
    <input
      type="range"
      :min="chanceStepOptions[0]"
      :max="chanceStepOptions[chanceStepOptions.length - 1]"
      class="range"
      :value="options.failureChance"
      :step="step"
      @input="(event) => options.failureChance = event.target.value"
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
      <div class="flex gap-4 flex-wrap justify-center items-center">
        <button
          @click="likeStore.optimisticAction(options.failureChance, options.requestTime)"
          class="btn btn-active flex-grow"
        >
          Optimistic Action
        </button>
        <button
          @click="likeStore.non_optimisticAction(options.failureChance, options.requestTime)"
          class="btn btn-active flex-grow"
        >
          Non-Optimistic Action
        </button>
      </div>
      <button
        :class="{
          'btn-disabled': likeStore.isLoading || isInitialLikeState ,
        }"
        @click="likeStore.$reset()"
        class="btn btn-active btn-ghost mt-2"
      >
        {{ likeStore.isLoading ? "" : "Reset" }}
        <span v-if="likeStore.isLoading" class="loading loading-spinner"></span>
      </button>
      <h2 style="text-transform: uppercase" class="font-medium">
        Status: <span :style="{ color: status.color }">{{ status.msg }}</span>
      </h2>
    </div>
  </div>
</template>
