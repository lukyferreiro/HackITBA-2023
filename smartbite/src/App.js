import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Plan from "./pages/Plan";
import PlanCompleted from "./pages/PlanCompleted";
import Home from "./pages/Home";
import RecetasRapidas from "./pages/RecetasRapidas";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.REACT_APP_CONTEXT}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}>
            <Route index element={<LandingPage/>}/>
            <Route path='/plan' element={<Plan/>}/>
            <Route path='/completado' element={<PlanCompleted/>}/>
            <Route path='/recetasRapidas' element={<RecetasRapidas/>}/>
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
