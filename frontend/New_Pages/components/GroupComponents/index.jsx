
import logo from "../../dist/img/t34-logo.jpg";
import React, {useEffect, useState}from "react";
import {Link} from "react-router-dom";

const GroupComponents = ({data}) => {


return(
    <div className="products-wrapper">  
    {data.map((group) => {
      return(
        <div className="products-wrapper-test">  
        {/* products display 1st row*/} 
        <div className="wrapper" >
        <div class="row2">
          <div class="column">
          <div class="card">
            {/*  add href to group info page LINK LATER*/}
            
            <a href="/group-info-page" >
            <div className="img-wrap"> 
              <img src={logo} className="logo-position">
              </img> 
            </div>
            {/* spacer instead of wishlist btn*/}
            &nbsp;
                <div className="item-cart">
                    <h5>{group.name}</h5>
                    <p class="members-text">31k Members</p>
                    <p><button>Join Group</button></p>
                </div>
            </a>

          </div>
          </div>   

        </div>
        </div>
        </div>  
      )
    })}


    </div>  
      
);
}
export default GroupComponents;