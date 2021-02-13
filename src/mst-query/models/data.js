import { types, applySnapshot } from "mobx-state-tree";

const DataBaseActions = types.model({}).actions((self) => ({
  dataApplySnapshot: (data) => {
    applySnapshot(self.data, data);
  },
}));

export class DataModel {
  static map(model) {
    return types.compose(
      "DataModel",
      types.model({
        data: types.map(model),
      }),
      DataBaseActions,
      types
        .model({})
        .views(() => ({}))
        .actions((self) => ({
          dataEachUpdate: (data = []) => {
            data.forEach((item) => {
              self.data.put(item);
            });
          },
        }))
    );
  }

  static array(model) {
    return types.compose(
      "DataModel",
      types.model({
        data: types.array(model),
      }),
      DataBaseActions
    );
  }

  static model(model) {
    return types.compose(
      "DataModel",
      types.model({
        data: types.optional(model, {}),
      }),
      DataBaseActions,
      types
        .model({})
        .views(() => ({}))
        .actions((self) => ({
          dataUpdateKey: ({ key, value }) => {
            self.data[key] = value;
          },
        }))
    );
  }

  static literal(defaultValue = null) {
    return types.compose(
      "DataModel",
      types.model({
        data: types.optional(
          types.maybeNull(
            types.union(
              types.number,
              types.string,
              types.boolean,
              types.undefined
            )
          ),
          defaultValue
        ),
      }),
      types
        .model({})
        .views(() => ({}))
        .actions((self) => ({
          dataUpdate: (value) => {
            self.data = value;
          },
        }))
    );
  }
}
