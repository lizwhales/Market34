import React, { useEffect, useState } from "react";
import "./NewListings.css";
import axios from "../../api/axios";
import uploadPlaceholder from "../../dist/img/upload-picture.jpg";
import NavBar from "../NavBarComponent"
import Cookie from 'universal-cookie';
var coookie = new Cookie();

const NewListingPage = () => {
  const [firstRender, setFirstRender] = useState(false);
  const [values, setValues] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    itemCategory: "",
    itemGroup: "",
    itemVisbility: "",
  });

  useEffect(() => {
    if (!firstRender) {
      getGroups();
      getCatergories();
      getSold();
      setFirstRender(true);
    }
  }, [firstRender]);

  {/* stuff for image upload*/} 
  const [image, setImage] = useState({ preview: "", raw: "" });

  // save image upload info
  const handleChange = e => {
    if (e.target.files.length) {
      console.log(e.target.files[0])
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const PostNewListing =  event => {
    event.preventDefault();

    /* item details */
    const props = {
      name: values.itemName,
      description: values.itemDescription,
      price: parseFloat(values.itemPrice).toFixed(2),
      public_visibility: values.itemVisbility,
      category_ids: [],
      group_ids: [],
      image_urls: [],
      comments: []
    }

    // handle optional options
    if (values.itemCategory) {
      props.category_ids = [values.itemCategory];
    }

    if (values.itemGroup) {
      props.group_ids = [values.itemGroup];
    }

    /* image details */
    const formData = new FormData();
    formData.append('file', image.raw);

    /* posting */
    // image upload
    axios({
      method: 'post',
      url: '/public/image',
      data: formData,
      withCredentials:true, 
      headers: {'Authorization':coookie.get("token")},
    })
    .then(function (res1) {
      props.image_urls = res1.data.image_urls;

      // item upload
      axios.post('/public', props,  {withCredentials:true, headers:{'Authorization':coookie.get("token")}})
      .then(function (res2) {
        if (res2.status=="200") {
          alert('Listed item successfully');
          // redirect if successful
          location.pathname='/home-page';
        } else {
          console.log("item posting went wrong");
        }
      })
      .catch(function (error) {
        alert('Please fill in all required fields.');
      });
    })
    .catch(() => {
      alert('Image Required. Please fill in all required fields. Accepted images are .jpg, .jpeg, .png, .webp');
    });
  }

  {/* options to select for category drop down */}
  const [categories, setCategories] = useState('');
  
  const getCatergories = async () => {
    await axios.get('/category', {withCredentials:true, headers:{'Authorization':coookie.get("token")}})
    .then(res => {
      setCategories(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const categoryOptions = [
    {value: '', text: '---Select a category---'},
  ];
  
  for (const category of categories) {
    categoryOptions.push({value: category._id, text: category.name});
  }

  {/* options for visibility */}
  const visibilityOptions = [
    {value: '', text: '---Select sell visbility---'},
    {value: true, text: 'Public'},
    {value: false, text: 'Private'},
  ];

  {/* options for group dropdown menu */}
  const [groups, setGroups] = useState('');
  const getGroups = async () => {
    const server_res = await axios.get("/getuser", 
      {withCredentials:true, headers:{'Authorization':coookie.get("token")}});
    const user = server_res.data.user_id;

    // get groups user is a part of
    await axios.get(`/groups/user/${user}`, {withCredentials:true, headers:{'Authorization':coookie.get("token")}})
    .then(res => {
      setGroups(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const groupOptions = [
    {value: '', text: '---Select group if applicable---'}
  ];
  
  for (const group of groups) {
    groupOptions.push({value: group._id, text: group.name});
  }

  // get number of sold items
  const [sold, setSold] = useState('');
  const getSold = async () => {
    await axios.get(`/sold`, {withCredentials:true, headers:{'Authorization':coookie.get("token")}})
    .then(res => {
      setSold(res.data.length);
    })
    .catch(() => {
        alert('There was an error while retrieving the data')
    })
  }

  {/* set selected for each drop down*/}
  const [selectedVis, setSelectedVis] = useState(visibilityOptions[0].value);
  const [selectedCat, setSelectedCat] = useState(categoryOptions[0].value);
  const [selectedGroup, setSelectedGroup] = useState(groupOptions[0].value);

  {/* handle onchange for each drop down state */}
  const handleChangeCat = e => {
    //console.log(e.target.value);
    setSelectedCat(e.target.value);
    setValues({...values, itemCategory:e.target.value})
  };

  const handleChangeVis = e => {
    setValues({...values, itemVisbility:e.target.value})
    //console.log(e.target.value);
    setSelectedVis(e.target.value);
  };
  
  const handleChangeGroup = e => {
    setValues({...values, itemGroup:e.target.value})
    //console.log(e.target.value);
    setSelectedGroup(e.target.value);
  };
    
  return (
    <div className="parent" >
      <NavBar />
        
      <div class="listings-main">
        <div className="home-title"> List an item,<a> and start selling right away!</a></div>
      </div>
      <hr />
      <div className="number-listings"> {sold} items sold on Market34!</div>
      
      <hr />
      <br></br>
      {/*Upload Image box */}    
      <div class="left-box">
        <label for="item-image"> <div className="item-name">Item Image*: </div></label>
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
      </div>
    
      {/* form to input new listing data */}
      <div class="container-form">
        <form className="publish-form-item">
          {/* onChange event here to get data */}
          <label for="item-name"> 
            <div className="item-name"> <div className="item-name"> Item Name*: </div> </div>
          </label>
          <input type="listing-text"
              onChange={(e)=> setValues({...values, itemName:e.target.value})} 
            />
          <label for="enter-price"><div className="item-name"> Price*: </div></label>
          <input type="listing-text"
            onChange={(e)=> setValues({...values, itemPrice:e.target.value})} 
          />
          <label for="enter-desc"> 
            <div className="item-name"><div className="item-name">Item Description*:</div></div>
          </label>
          <input type="asd" 
              onChange={(e)=> setValues({...values, itemDescription:e.target.value})} 
          />

          {/* select on change for dropdown button*/}
          <label for="category-name">
            <div className="item-name"><div className="item-name"> Item Category:</div></div>
          </label>
          <select type="category-listing" value={selectedCat} onChange={handleChangeCat}>
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>

          {/* select on change for dropdown button*/}
          <label for="visbility-list"> 
            <div className="item-name"><div className="item-name">Item Visibility*:</div></div>
          </label>
          <select type="category-listing" value={selectedVis} onChange={handleChangeVis}>
            {visibilityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>   
            ))}
          </select>

          {/* select on change for dropdown button*/}
          <label for="groups-list"> <div className="item-name">Group Select:</div></label>
          <select type="category-listing" value={selectedGroup} onChange={handleChangeGroup}>
            {groupOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>   
            ))}
          </select>

        </form> 
        
        {/* on click to submit new listing here*/}
        <button className="publish-btn" onClick={PostNewListing}> Publish Item</button>
      </div>
    </div>
  );
}

export default NewListingPage;