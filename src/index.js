import ReactDOM from "react-dom";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from 'react-query/devtools'
import App from "./App";
const queryClient = new QueryClient();

ReactDOM.render(<QueryClientProvider client={queryClient}>
    <App />
    {/* <ReactQueryDevtools initialIsOpen /> */}
</QueryClientProvider>, document.getElementById("root"));
