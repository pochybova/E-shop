import React from "react";
import {Modes, ProfilePage} from "./pages/ProfilePage";
import {ProductsPage} from "./pages/ProductsPage";
/*import { Inp } from "./components/Input";*/
import "./styles.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductsPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/profile/favorite" element={<ProfilePage mode={Modes.FAVORITES}/>}/>
                <Route path="/profile/cart" element={<ProfilePage mode={Modes.CART}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

// function App() {
//   return <ProductsPage />;
// }

// export default App;
