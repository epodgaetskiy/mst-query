import {
  types,
  applySnapshot,
  flow,
  isLiteralType,
  isFrozenType,
} from "mobx-state-tree";
import { NetworkStatus } from "./models/network";

const updateModel = (model, data) => {
  if (isLiteralType(model) || isFrozenType(model)) {
    model = data;

    return;
  }

  applySnapshot(model, data);

  return;
};

export const queryModel = (model, { fetch, getData }) => {
  return types.optional(
    types.compose(
      NetworkStatus,
      types
        .model({
          data: model,
        })
        .actions((self) => {
          const loader = flow(function* (...args) {
            try {
              self.updateLoading(true);
              const response = yield fetch(...args);
              const data = getData(response);

              updateModel(self.data, data);

              self.updateLoaded(true);
            } catch (error) {
              console.error(error);
              return error;
            } finally {
              self.updateLoading(false);
            }
          });

          return {
            fetch: loader,
          };
        })
    ),
    {}
  );
};
