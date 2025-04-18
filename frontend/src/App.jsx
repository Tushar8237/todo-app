import "./App.css";
import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";


// Main App component that wraps the application with a Navbar and Router
function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
