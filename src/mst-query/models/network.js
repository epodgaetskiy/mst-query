import { types } from "mobx-state-tree";

export const NetworkStatus = types
  .model("NetworkStatus", {
    isLoading: false,
    isLoaded: false,
  })
  .actions((self) => ({
    updateLoading: (state) => {
      self.isLoading = state;
    },
    updateLoaded: (state) => {
      self.isLoaded = state;
    },
  }));
