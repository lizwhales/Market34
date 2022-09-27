import React, {useEffect, useState}from "react";
import "./HomePage.css";
import logo from "../../dist/img/t34-logo.jpg";
import axios from "../../api/axios";
import ProductComponents from "../ProductComponents";
/* icon imports */
import {AiOutlineHome, AiOutlineUsergroupAdd, AiOutlineLock} from 'react-icons/ai';
import {HiOutlineShoppingBag} from 'react-icons/hi';
import {MdOutlineGroups, MdFamilyRestroom, MdSportsFootball, MdSmartToy} from 'react-icons/md';
import {TbStar} from 'react-icons/tb';
import {RiBookOpenLine} from 'react-icons/ri';

/* category icons */
import {FaCar, FaTshirt, FaChessKnight, FaGuitar, FaHammer, FaPenFancy, FaDog} from 'react-icons/fa';
import {BsPlugFill} from 'react-icons/bs';
import {IoIosLeaf} from 'react-icons/io';
import {GiSofa} from 'react-icons/gi';

const HomePage = () => {
/*
  const [posts, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get("/public").then((response) => {
      setPost(response.data);
    });
  }, []);
*/

const [posts, setPosts] = useState([]);

  // Define the function that fetches the data from API
  const fetchData = async () => {
    const { data } = await axios.get("/public");
    setPosts(data);
  };

  // Trigger the fetchData after the initial render by using the useEffect hook
  useEffect(() => {
    fetchData();
  }, []);

  return (
  <div className="parent" >
     {/* top nav bar*/}
    <div class="navbar">
      <h1 className="website-title"> Market34</h1>
      <a class="active" href="/home-page"> <AiOutlineHome className="icon"/> Home</a>
        <a href="/sell-page"> <HiOutlineShoppingBag className="icon"/> Sell</a>
        <a href="/group-page"> <AiOutlineUsergroupAdd className="icon"/> Groups</a>
        <a href="#"> <MdOutlineGroups className="icon"/> My Groups</a>
        <a href="/wishlist-page"> <TbStar className="icon"/> Wishlist</a>
      <div class="nav-login">
      {/* search bar*/}
      <a href="/login-page"> <AiOutlineLock className="icon"/> Log In</a>
      <a href="/sign-up-page"><RiBookOpenLine className="icon" /> Register</a>
   
      <input type="text"placeholder="Search.."> 
      </input>
      </div>
    </div>

    {/* side bar*/} 
   
    <div class="sidenav">
    <div className="header">
    Categories
    </div>
    <a href="#"> <FaCar className="icon"/> Vechicles</a>
    <a href="#"> <FaTshirt className="icon"/> Apparel</a>
    <a href="#"> <BsPlugFill className="icon"/> Electronics</a>
    <a href="#"> <MdFamilyRestroom className="icon"/> Family</a>
    <a href="#">  <IoIosLeaf className="icon"/> Garden & Outdoor</a>
    <a href="#"> <FaChessKnight className="icon"/> Hobbies</a>
    <a href="#"><GiSofa className="icon"/>  Home Goods</a>
    <a href="#"> <FaHammer className="icon-flipped"/> Home Improvement &nbsp;&nbsp;&nbsp; Supplies</a>
    <a href="#"> <FaGuitar className="icon-flipped"/> Musical Instruments</a>
    <a href="#"> <FaPenFancy className="icon"/> Office Supplies</a>
    <a href="#"> <FaDog className="icon-flipped"/> Pet Supplies</a>
    <a href="#"> <MdSportsFootball className="icon"/> Sporting Goods</a>
    <a href="#"> <MdSmartToy className="icon"/> Toys & Games</a>
    <a href="/new-listings-page" >
      <button class="btn btn-success"> Create New Listing</button>
    </a>
  </div>
  
    {/* products display*/} 
    <div class="main">
      <div className="home-title"> Today's Listings:</div>
      <hr />
      <div className="number-listings"> 1234 listings 
      
          {/* sort by button drop down*/} 
    <div className="move-drop-btn">
      <div class="dropdown">
                <button class="dropbtn">Sort by: Default</button>
                <div class="dropdown-content">
                    <a href="#">Price: High-Low</a>
                    <a href="#">Price: Low-High</a>       
                </div>
        </div>
      </div> 
      </div> 
      <hr />

    {/* calls on product components here trying to rewrap here*/}
    <div className="wrapper" >
        <div class="row2">
          <div class="column">
          <ProductComponents/>
          </div>
        </div>
    </div>


    {/* next page bar here*/}
    <div class="center-next">
      <div class="pagination">
      <a href="#">&laquo;</a>
      <a href="#">1</a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a href="#">4</a>
      <a href="#">5</a>
      <a href="#">6</a>
      <a href="#">&raquo;</a>
    </div>
  </div>
    </div> 


  </div>

  );
}

export default HomePage;
