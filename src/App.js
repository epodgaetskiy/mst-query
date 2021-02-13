import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./users/users.store";

const App = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.users.fetch();
  }, [store]);

  if (store.users.isLoading) {
    return <div>...loading</div>;
  }

  return store.users.data.map((user, index) => (
    <div key={index}>{user.email}</div>
  ));
});

export default App;
