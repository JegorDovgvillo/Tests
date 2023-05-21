import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../header/Header";
import ListItems from "../listItems/ListItems";
import FavoritesList from "../favoritesList/FavoritesList";
import VacancyInfo from "../vacancyInfo/VacancyInfo";
import EmptyPage from "../emptyPage/EmptyPage";

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ListItems />} />
          <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/information" element={<VacancyInfo />} />
          <Route path="/emptyPage" element={<EmptyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
