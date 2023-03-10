import React, {useEffect, useState}from "react";
import { useParams } from "react-router-dom";
import logo from "../../dist/img/t34-logo.jpg";
import axios from "../../api/axios";
import "./GroupPage.css";
import GroupComponents from "../GroupComponents";
import PageNext from "../PageNextBar/PageNext";
import SideNav from "../SideNavComponent";
import NavBar from "../NavBarComponent";
import SortByMembers from "../SortByMemberComponent";
import Cookie from 'universal-cookie';
var coookie = new Cookie();

import { AiFillPlusCircle } from "react-icons/ai";

const GroupPage = () => {
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  // 10 items displayed per page
  const [recordsPerPage] = useState(10);

  // get parameters
  const queryParams = new URLSearchParams(window.location.search);
  const sortBy = queryParams.get("sortBy");
  const searchBy = queryParams.get("searchBy");
  const {userId} = useParams();
  
  useEffect(() => {
    // function to get groups a user is not a part of
    axios.get(`/groups/other/${userId}`, {withCredentials:true, headers:{'Authorization':coookie.get("token")}})
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
        setData(tmp.sort((a, b) => b.members.length - a.members.length));
      } else if (sortBy == 'asc') {
        setData(tmp.sort((a, b) => a.members.length - b.members.length));
      } else {
        setData(tmp.reverse());
      }
      setLoading(false);
    })
    .catch(() => {
      alert('There was an error while retrieving the data')
    })
  }, []);

  // pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage)
          
  return (
    <div className="parent" >
      <NavBar />

      {/* products display*/} 
      <div class="main-groups">
        <div className="home-title"> Suggested Groups:</div>
        <hr />
        <div className="number-listings"> {data.length} groups 
          {/* sort by button drop down*/} 
          <SortByMembers />
        </div> 
        <hr />

        <div className="products-wrapper">  
          {/* products display 1st row*/} 
          <div className="wrapper" >
            <div class="row2">
              <div class="column">
                {/* insert groupscomponent here */}
                <GroupComponents data={currentRecords}/> 
                <PageNext
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>

        <span className="add-new"><a href="/create-group-page"> <AiFillPlusCircle className="add-icon"/></a></span>
      </div> 
    </div>
  );
}

export default GroupPage;
