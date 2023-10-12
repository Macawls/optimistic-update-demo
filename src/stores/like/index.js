import { defineStore } from "pinia";

export const initialLikeState = {
  status: false,
  hasInitiatedRequest: false,
  isLoading: false
}

export const useLikeStore = defineStore("like", {
  state: () => structuredClone(initialLikeState),
  actions: {
    async _performAction(chance, loadingTime) {
      if (this.isLoading) {
        return;
      }
      
      this.hasInitiatedRequest = true;
      this.isLoading = true;
      const compare = Math.random().toFixed(1)

      // Simulate async call
      await new Promise((resolve) => setTimeout(resolve, loadingTime));

      this.status = chance <= compare;
      this.isLoading = false;
    },
    optimisticAction(chance, loadingTime) {
      this.status = true;
      this._performAction(chance, loadingTime);
    },
    non_optimisticAction(chance, loadingTime) {
      this._performAction(chance, loadingTime);
    },
    isSameAs(likeStoreState){
      return this.status === likeStoreState.status && 
      this.isLoading === likeStoreState.isLoading &&
      this.hasInitiatedRequest === likeStoreState.hasInitiatedRequest
    }
  },
});
