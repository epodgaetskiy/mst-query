import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./users/users.store";

const App = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.users.fetch();
  }, [store.users]);

  if (store.users.isLoading) {
    return <div>...loading</div>;
  }

  if (store.users.isLoaded) {
    return store.users.data.map((user, index) => (
      <div key={index}>{user.email}</div>
    ));
  }
  return <div>MST query</div>;
});

export default App;
