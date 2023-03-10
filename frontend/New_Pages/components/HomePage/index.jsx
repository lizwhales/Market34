import React, {useEffect, useState}from "react";
import "./HomePage.css";
import axios from "../../api/axios";
import ProductComponents from "../ProductComponents";
import PageNext from "../PageNextBar/PageNext";

import SideNav from "../SideNavComponent";
import NavBar from "../NavBarComponent";
import SortBy from "../SortByComponent";

import Cookies from 'universal-cookie';

const coookie = new Cookies();

const HomePage = () => {

  // To hold the actual data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  // 10 items displayed per page
  const [recordsPerPage] = useState(10);
  const [user, setUser] = useState('');

  // get parameters
  const queryParams = new URLSearchParams(window.location.search);
  const categoryId = queryParams.get("cat_id");
  const sortBy = queryParams.get("sortBy");
  const searchBy = queryParams.get("searchBy");

  // function to get public items listed
  const fetchPublic = async () => {
    const server_res = await axios.get("/getuser", 
      {withCredentials:true, headers:{'Authorization':coookie.get("token")}});
    const user = server_res.data.user_id;
    setUser(user);

    // get public items
    await axios.get('/public', {withCredentials:true, headers:{'Authorization':coookie.get("token")}})
    .then(res => {
      var tmp = res.data;

      // search filter logic
      if (queryParams.has("searchBy")) {
        const searchedData = [];
        const query_characters = searchBy.toLowerCase().split("");
        tmp.forEach(entry => {
          var i = 0, count = 0;
          entry.name.toLowerCase().split("").forEach(character => {
            if (query_characters[i] == character) {
              count++;
            }
            i++;
          });
          if (count == query_characters.length) {
            console.log(entry.name);
            searchedData.push(entry);
          }
        });
        tmp = searchedData;
      }

      // sort by logic
      if (sortBy == 'oldest') {
        setData(tmp);
      } else if (sortBy == 'desc') {
        setData(tmp.sort((a, b) => b.price - a.price));
      } else if (sortBy == 'asc') {
        setData(tmp.sort((a, b) => a.price - b.price));
      } else {
        setData(tmp.reverse());
      }
      setLoading(false);
    })
    .catch(() => {
      alert('There was an error while retrieving the data')
    })
  }

  // function to get public items listed by category
  const fetchPublicCategory = async () => {
    await axios.get(`/public/category/${categoryId}`, 
      {withCredentials:true, headers:{'Authorization':coookie.get("token")}})
    .then(res => {
        var tmp = res.data;

        // search filter logic
        if (queryParams.has("searchBy")) {
          const searchedData = [];
          const query_characters = searchBy.toLowerCase().split("");
          tmp.forEach(entry => {
            var i = 0, count = 0;
            entry.name.toLowerCase().split("").forEach(character => {
              if (query_characters[i] == character) {
                count++;
              }
              i++;
            });
            if (count == query_characters.length) {
              console.log(entry.name);
              searchedData.push(entry);
            }
          });
          tmp = searchedData;
        }
    
        // sort by logic
        if (sortBy == 'oldest') {
          setData(tmp);
        } else if (sortBy == 'desc') {
          setData(tmp.sort((a, b) => b.price - a.price));
        } else if (sortBy == 'asc') {
          setData(tmp.sort((a, b) => a.price - b.price));
        } else {
          setData(tmp.reverse());
        }
        setLoading(false);
    })
    .catch(() => {
        alert('There was an error while retrieving the data')
    })
  }

  // get data
  if (!categoryId) {
    useEffect(() => {
      fetchPublic();
    }, []);
  } else {
    useEffect(() => {
      fetchPublicCategory();
    }, []);
  }

  // pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage)
      
  return (
    <div className="parent" >
      {/* nav bars */}
      <NavBar />
      <SideNav />
    
      {/* products display*/} 
      <div class="main">
        <div className="home-title"> Listings:</div>
        <hr />
        <div className="number-listings"> {data.length} listings 
          <SortBy />
        </div> 
        <hr />

        {/* calls on product components here trying to rewrap here*/}
        <div className="wrapper" >
          <div class="row2">
            <div class="column">

            <ProductComponents data={currentRecords} userId={user}/> 
            <PageNext
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
              />

            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default HomePage;
