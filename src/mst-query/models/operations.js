import { applySnapshot, isLiteralType, isFrozenType } from "mobx-state-tree";

export const updateModel = (model, data) => {
  if (isLiteralType(model) || isFrozenType(model)) {
    model = data;

    return;
  }

  applySnapshot(model, data);

  return;
};
