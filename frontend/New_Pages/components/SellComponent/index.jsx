import logo from "../../dist/img/t34-logo.jpg";
import React, {useEffect, useState}from "react";
import axios from "../../api/axios";
import {Link} from "react-router-dom"

const SellComponent = ({data}) => {

// /public/:item_id delete item here
console.log(data);

// find item_id
// delete request here
// below do on-click btn --> delete request 

return(
    <div className="products-wrapper">  
    {data.map((item) => {
      return(
        <div className="products-wrapper-test">  
        {/* products display 1st row*/} 
        <div className="wrapper" >
        <div class="row2">
          <div class="column">
          <div class="card">
            {/*  add href to product page TO LINK TO OBJECT_ID*/}
            <Link to={`/product-page/${item._id}`}>
            <div className="img-wrap"> 
             <img src={item.image_urls[0]} className="logo-position">
              </img> 
      
            </div>
            <div className="space"> </div>
            <div className="content-posts">
            <p class="price"> ${item.price}</p>
          </div>
            <div className="item-cart">
            <h3>{item.name}</h3>
            <a href="#"> <p><button>Remove</button></p></a>
        
            {/* use this to link to inidivdual product info*/}
            </div>
            {/* closing tag here BELOW */}
            </Link>
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

export default SellComponent;