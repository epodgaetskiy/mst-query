import { types } from "mobx-state-tree";
import { useContext, createContext } from "react";
import { queryModel } from "../mst-query";
import { usersService } from "./users.service";

const UserSchema = types.model({
  email: types.maybeNull(types.string),
});

const UsersQueryModel = queryModel(types.array(UserSchema), {
  fetch: usersService.get,
  getData: (data) => data.results,
});

const UsersStore = types.model({
  users: UsersQueryModel,
});

const usersStore = UsersStore.create();

const UsersStoreContext = createContext(usersStore);

export const UsersProvider = ({ children }) => (
  <UsersStoreContext.Provider value={usersStore}>
    {children}
  </UsersStoreContext.Provider>
);

export function useStore() {
  const store = useContext(UsersStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

// const UserForm = types.model({
//   user: types.optional(UserSchema, {}),
//   mutation: QueryMutation((user) => usersService.post(user))
// })

// UserForm.mutation.mutate({
//   email: "lol"
// })

// UserForm.mutation.isLoading
// UserForm.mutation.isError
