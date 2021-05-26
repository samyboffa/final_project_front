import "./App.css";
import Header from "./Components/Header";
import { GiftCards } from "./Components/GiftCards";
import { Home } from "./Components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Games } from "./Components/Games";
import { TopUp } from "./Components/TopUp";
import { LoginSignUp } from "./Components/Login";
import { SignUp } from "./Components/SignUp";
import { GiftCardDetail } from "./Components/GiftCardDetail";
import { TopUpDetails } from "./Components/TopUpDetails";
import { Profile } from "./Components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./Redux/actions/products";
import { getTopUp } from "./Redux/actions/topUp";
import { Cart } from "./Components/Cart";
import { MyOrders } from "./Components/MyOrders";
import { SellingHeader } from "./Components/Selling/SellingHeader";
import { SellingShop } from "./Components/Selling/SellingShop";
import { SellingAdd } from "./Components/Selling/SellingAdd";
import { SellingMyListing } from "./Components/Selling/SellingMyListing";
import { AdminPanel } from "./Components/adminPanel/AdminPanel";
import { AdminPanelProducts } from "./Components/adminPanel/AdminPanelProducts";
import { AdminPanelOffers } from "./Components/adminPanel/AdminPanelOffers";
import { AdminPanelHeader } from "./Components/adminPanel/AdminPanelHeader";
import { AdminPanelOrders } from "./Components/adminPanel/AdminPanelOrders";
import MyNotifications from "./Components/MyNotifications";
import AccesDenied from "./Components/AccessDenied";
import { getCurrentUser } from "./Redux/actions/user";
function App() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userReducer.user);
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Header />
                        <Home />
                    </Route>
                    <Route path="/games">
                        <Header />
                        <Games />
                    </Route>
                    <Route exact path="/topup">
                        <Header />
                        <TopUp />
                    </Route>
                    <Route exact path="/giftcards">
                        <Header />
                        <GiftCards />
                    </Route>
                    <Route path="/login">
                        <LoginSignUp />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route
                        path="/giftcards/:id"
                        render={({ match }) => <GiftCardDetail match={match} />}
                    ></Route>
                    <Route
                        path="/topup/:gameName"
                        render={({ match }) => <TopUpDetails match={match} />}
                    ></Route>
                    {user ? (
                        <Route path="/profile">
                            {/*Private */}
                            <Header />
                            <Profile />
                        </Route>
                    ) : (
                        <AccesDenied />
                    )}
                    {user ? (
                        <Route path="/profile">
                            {/*Private */}
                            <Header />
                            <Profile />
                        </Route>
                    ) : (
                        <AccesDenied />
                    )}
                    {user ? (
                        <Route path="/cart">
                            {/*Private */}
                            <Cart />
                        </Route>
                    ) : (
                        <AccesDenied />
                    )}
                    {user ? (
                        <Route path="/myorders">
                            {/*Private */}
                            <Header />
                            <MyOrders />
                        </Route>
                    ) : (
                        <AccesDenied />
                    )}
                    {user ? (
                        <Route path="/notif">
                            {/*Private */}
                            <Header />
                            <MyNotifications />
                        </Route>
                    ) : (
                        <AccesDenied />
                    )}

                    <Route path="/sellshop" exact>
                        {/*Private  */}
                        {/*done  */}
                        <Header />
                        <SellingHeader />
                        <SellingShop />
                    </Route>
                    <Route path="/selladd" exact>
                        {/*Private */}
                        {/*done  */}
                        <Header />
                        <SellingHeader />
                        <SellingAdd />
                    </Route>
                    <Route path="/sellmylisting" exact>
                        {/*Private */}
                        {/*done  */} <Header />
                        <SellingHeader />
                        <SellingMyListing />
                    </Route>
                    <Route path="/adminPanel" exact>
                        {/*Admin */}
                        {/*done  */}
                        <Header />
                        <AdminPanel />
                    </Route>
                    <Route path="/AdminPanelPoductsMngmt">
                        {/*Admin */}
                        {/*done  */}
                        <Header />
                        <AdminPanelHeader />
                        <AdminPanelProducts />
                    </Route>
                    <Route path="/AdminPanelOffersMngmt">
                        {/*Admin */}
                        {/*done  */}
                        <Header />
                        <AdminPanelHeader />
                        <AdminPanelOffers />
                    </Route>
                    <Route path="/AdminPanelOrdersMngmt">
                        {/*Admin */}
                        {/*done  */}
                        <Header />
                        <AdminPanelHeader />
                        <AdminPanelOrders />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
