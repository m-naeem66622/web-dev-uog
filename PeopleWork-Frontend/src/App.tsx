import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "./components/organisms/ThemeProvider";
import { routes } from "./routes/routes";

const AppRoutes = () => {
  const routeElement = useRoutes(routes);
  return routeElement;
};

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="peopleWork-ui-theme">
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
