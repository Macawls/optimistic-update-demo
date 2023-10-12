import { defineStore } from "pinia";

export const useLikeStore = defineStore("like", {
  state: () => ({
    status: false,
    hasInitiatedRequest: false,
    isLoading: false,
    loadingTime: 700,
  }),
  actions: {
    async _performAction(chance) {
      if (this.isLoading) {
        return;
      }
      
      this.hasInitiatedRequest = true;
      this.isLoading = true;
      const compare = Math.random().toFixed(1)

      // Simulate async call
      await new Promise((resolve) => setTimeout(resolve, this.loadingTime));

      console.log(compare)
      console.log(chance)

      this.status = chance <= compare;
      this.isLoading = false;
    },
    optimisticAction(chance) {
      this.status = true;
      this._performAction(chance);
    },
    non_optimisticAction(chance) {
      this._performAction(chance);
    },
  },
});
