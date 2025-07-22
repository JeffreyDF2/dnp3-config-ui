import "./App.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";

const routes = [
  { path: "/", label: "Basic" },
  { path: "/communcation", label: "Communication" },
  { path: "/FSI", label: "Fault Severity Index" },
  { path: "/Review", label: "Review" },
];

function App() {
  const location = useLocation();
  const currentPath = location.pathname === "/" ? "/" : location.pathname;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800">
        DNP3 Relay Configurator
      </h1>
      <Tabs defaultValue={currentPath}>
        <TabsList className="flex justify-center w-full">
          {routes.map(({ path, label }) => (
            <TabsTrigger
              key={path}
              value={path}
              asChild
              className="flex-grow text-center"
            >
              <Link to={path}>{label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-4 border rounded-lg p-4 bg-white shadow">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
