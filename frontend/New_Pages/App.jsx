import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Switch, BrowserRouter as Router, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUpPage";
import NewListings from "./components/NewListingPage";
import SellPage from "./components/SellPage";
import WishlistPage from "./components/WishlistPage";
import GroupPage from "./components/GroupPage";
import CreateGroupPage from "./components/CreateGroupPage"
import MyGroupsPage from "./components/MyGroupsPage"
import ProductInformationPage from "./components/ProductInformationPage" 
import CheckoutPage from "./components/CheckoutPage";
import GroupInfoPage from "./components/GroupInfoPage";
import MyGroupsDisplay from "./components/MyGroupsDisplay";
import MemberListPage from "./components/MemberListPage";
import React, {useEffect, useState}from "react";

function App() {
  useEffect(() => {
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    document.body.style.zoom = "75%";

    return () => {
      // Restore default value
      document.body.style.zoom = initialValue;
    };
  }, []);
  
  return (
    <Router>
      <Switch>
        <Route path="/home-page">
        <HomePage/>
        </Route>
        <Route path="/:path(|login-page)">
          <LoginPage/>
        </Route>
        <Route path="/sign-up-page">
          <SignUp/> 
        </Route>
        <Route path="/new-listings-page">
          <NewListings/>
        </Route>
        <Route path="/sell-page/:sellerId">
          <SellPage/>
        </Route>
        <Route path="/wishlist-page/:userId">
          <WishlistPage/>
        </Route>
        <Route path="/group-page/:userId">
          <GroupPage/>
        </Route>
        <Route path="/create-group-page">
          <CreateGroupPage/>
        </Route>
        <Route path="/my-groups-page/:userId">
          <MyGroupsPage/>
        </Route>
        <Route path="/product-page/:productId">
          <ProductInformationPage/>
        </Route>
        <Route path="/checkout-page/:userId">
          <CheckoutPage/>
        </Route>
        <Route path="/group-info-page/:groupId">
          <GroupInfoPage/>
        </Route>
        <Route path="/my-groups-display/:groupId">
          <MyGroupsDisplay/>
        </Route>
        <Route path="/member-list-page/:groupId">
          <MemberListPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

