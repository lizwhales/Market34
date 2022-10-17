import React, {useEffect, useState}from "react";
import logo from "../../dist/img/t34-logo.jpg";
import axios from "../../api/axios";
import "./GroupPage.css";
import GroupComponents from "../GroupComponents";
import PageNext from "../PageNextBar/PageNext";
import SideNav from "../SideNavComponent";
import NavBar from "../NavBarComponent";
import SortByMembers from "../SortByMemberComponent";

const GroupPage = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  // 10 items displayed per page
  const [recordsPerPage] = useState(10);

  const queryParams = new URLSearchParams(window.location.search);
  const sortBy = queryParams.get("sortBy");
  
  useEffect(() => {
    axios.get('/groups')
    .then(res => {
      const tmp = res.data;
      //setData(res.data);
      if (sortBy == 'oldest') {
        setData(tmp);
        //console.log('newest');
      } else if (sortBy == 'desc') {
        setData(tmp.sort((a, b) => b.members.length - a.members.length));
        //console.log('desc');
      } else if (sortBy == 'asc') {
        setData(tmp.sort((a, b) => a.members.length - b.members.length));
        //console.log('asc');
      } else {
        setData(tmp.reverse());
      }
      setLoading(false);
    })
    .catch(() => {
      alert('There was an error while retrieving the data')
    })
    //.then(fetchData())
  }, [])

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage)
          
  return (
<div className="parent" >
  <NavBar />

  {/* side bar*/} 
  <div class="new">
    <a href="/create-group-page" >
      <button class="btn btn-success"> Create New Group</button>
    </a>
  </div>
  
  
    {/* products display*/} 
    <div class="main">
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

    </div> 


  </div>
  );
}

export default GroupPage;
