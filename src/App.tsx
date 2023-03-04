import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import Navigation from "./components/Navigation";
import { Provider } from "react-redux";
import { store } from "./store/index";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
