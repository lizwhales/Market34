import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import uploadPlaceholder from "../../dist/img/upload-picture.jpg";
import "./CreateGroupPage.css";
import Cookie from 'universal-cookie';
import NavBar from "../NavBarComponent"


const CreateGroupPage = () => {
  var coookie = new Cookie();
  const [user, setUser] = useState([]);
  const fetchData = async () => {
      const server_res = await axios.get("/getuser", {withCredentials:true, headers:{'Authorization':coookie.get("token")}});
      const user = server_res.data;
      setUser(user);
  };
  
  {/*method to unpack the data and fetch effect*/ }
  useEffect(() => {
      fetchData();
  }, []);

  {/* stuff for image upload*/} 

  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
    if (e.target.files.length) {
    console.log(e.target.files[0])
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const [values, setValues] = useState({
    groupName: "",
    groupDescription: "",
  });

  console.log(values);

  const PostNewGroup =  event => {
    /* group details */
    event.preventDefault();
    const props = {
      name: values.groupName,
      description: values.groupDescription,
      members: [user],
      admins: [user],
      icon_url: ""
    }

    /* image details */
    const formData = new FormData();
    formData.append('file', image.raw);
    //console.log(formData);

    if (!image.raw) {
      alert('Image Required. Please fill in all fields.');
    }

    if (!props.name) {
      alert('Group Name Required. Please fill in all fields.');
    }

    if (!props.description) {
      alert('Group Description Required. Please fill in all fields.');
    }

    /* posting */
    // image upload
    axios({
      method: 'post',
      url: '/public/image',
      data: formData,
    })
    .then(function (res1) {
      if (res1.status=="200") {
        console.log('group image uploaded');
        props.icon_url = res1.data.image_urls[0];
        console.log(props);

        axios.post('/groups', props)
        .then(function (res2) {
          if (res2.status=="200") {
            console.log('group details successful');
            location.pathname='/group-page';
          } else {
            console.log("group posting went wrong");
          }
        })
        .catch(function (error) {
            console.log(error);
        });
      } else {
        console.log("group image posting went wrong");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  {/* get number of groups */}
  const [groups, setGroups] = useState('');
  const getGroups = () => {
    axios.get('/groups')
    .then(res => {
      setGroups(res.data.length);
    }).catch(err => {
      console.log(err);
    })
  }

  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    if (!firstRender) {
      getGroups();
      //fetchData();
      setFirstRender(true);
    }
  }, [firstRender]);
  
  return (
    <div className="parent" >
    {/* top nav bar*/}
<NavBar />
        
    <div class="listings-main">
      <div className="home-title"> Create a Group now,<a> and start lisitng privately right away!</a></div>
    </div>
    <hr />
    <div className="number-listings"> {groups} groups online
    
    {/* on click to submit new listing here*/}
      <button className="publish-btn" onClick={PostNewGroup}> Create Group</button>
    
    </div>
    <hr />
      {/*Upload Image box and button handle uploading img*/}    
    <div class="left-box">
      <label for="item-name"> <div className="item-name">Group Icon*: </div></label>
      <div className="square-pic">  
      <label htmlFor="upload-button">
        {/* image preview conditionals for user to see*/} 
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="100%" height="100%" />
        ) : (
          <>
            <img src={uploadPlaceholder} className="upload-placeholder"></img> 
          </>
        )}
      </label>  

      <input
      type="file" 
      id="upload-button"
      style={{ display: "none" }}
      onChange={handleChange}
      /> 
      </div>
      {/* <button onClick={handleUpload}>Upload Image</button>   */}
    </div>
    
    {/* form to input new listing data*/}
    <div class="container">
      <form className="publish-form">
          
        {/* onChange event here to get data */}
        <label for="item-name"> <div className="item-name">Group Name*: </div></label>
        <input type="listing-text"
        onChange={(e)=> setValues({...values, groupName:e.target.value})} 
        />
        <label for="enter-desc"> <div className="item-name">Group Description*:</div></label>
        <input type="asd" 
        onChange={(e)=> setValues({...values, groupDescription:e.target.value})} 
        />
          {/* select on change for dropdown button*/}
    
    {/* visibility radio buttons to be done here 
    <div className="vis-container">
      <div class="flex-child">
      <div className="visbility-header">
      <div  className="radio-public">
      <RadioButton
          changed={radioChangeHandler}
          id="1"
          value="public"
        />
        </div>
        Public
      </div>
      <div className="visbility-text">
        Anyone can join this group.
      </div>
    </div>



    <div class="flex-child"> 

    <div className="visbility-header">
    <div  className="radio-public">
      <RadioButton
          changed={radioChangeHandler}
          id="2"
          value="private"
        />
        </div>
        Private
      </div>
      <div className="visbility-text-1">
        Only people given access can join this group.
      </div>
    </div>
    </div>            
    */}

      </form> 
    </div>
  </div>
  );
}

export default CreateGroupPage;