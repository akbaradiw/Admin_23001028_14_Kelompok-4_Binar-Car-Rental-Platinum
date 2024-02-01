import { useRoutes } from "react-router-dom";
// import { routes } from './Routes'
import { routers } from "./routes";


const App = () => {
  let element = useRoutes(routers)
  return element

};

export default App;
