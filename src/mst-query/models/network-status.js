import { types } from "mobx-state-tree";

export const NetworkStatus = types
  .model("NetworkStatus", {
    status: types.optional(
      types.enumeration("Status", ["idle", "loading", "success", "error"]),
      "idle"
    ),
    isLoading: false,
    isLoaded: false,
  })
  .views((self) => ({
    get isIdle() {
      return self.status === "idle";
    },
    get isLoading() {
      return self.status === "loading";
    },
    get isSuccess() {
      return self.status === "success";
    },
    get isError() {
      return self.status === "error";
    },
  }))
  .actions((self) => ({
    updateStatus: (status) => {
      self.state = status;
    },
  }));
