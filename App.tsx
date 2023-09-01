import Routes from "./src/routes";
import { StateProvider } from "./src/contexts/StateContext";


const App = () => {
  return(
    <StateProvider>
      <Routes />
    </StateProvider>
  );
}

export default App;