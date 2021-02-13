import { types, flow } from "mobx-state-tree";
import { NetworkStatus } from "./models/network-status";
import { updateModel } from "./models/operations";

// network status as react-query
// mutation
// TS
// abort

const initialQueryParams = {
  getData: (data) => data,
  onError: () => {},
};

const getQueryModelDisplayName = (model) => {
  if (!model.name) {
    return "QueryModel";
  }

  return `${model.name}_QueryModel`;
};

export const queryModel = (
  model,
  {
    fetch,
    getData = initialQueryParams.getData,
    onError = initialQueryParams.onError,
  }
) => {
  return types.optional(
    types.compose(
      getQueryModelDisplayName(model),
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
              onError(error);
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
