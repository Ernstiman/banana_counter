import { createRoot } from "react-dom/client";

import App from "./Routes/App";
import { StrictMode } from "react";


createRoot(document.getElementById('root')).render(<StrictMode><App/></StrictMode>);