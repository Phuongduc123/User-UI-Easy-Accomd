import {NotificationManager} from 'react-notifications';
import { useHistory } from 'react-router';
const axios = require("axios");
const history = useHistory;

//signup
export const postInformToSignup = async (
  params,
  setSuccessSignup,
  setNotification
) => {
  await axios
    .post("http://127.0.0.1:8000/renterregister/", params)
    .then((response) => {
      console.log("signup: ", response);
      if (
        Array.isArray(response.data.email) === true &&
        Array.isArray(response.data.username) === true
      ) {
        setNotification([response.data.email[0], response.data.username[0]]);
      } else if (Array.isArray(response.data.email) === true) {
        setNotification([response.data.email[0]]);
      } else if (Array.isArray(response.data.username) === true) {
        setNotification([response.data.username[0]]);
      } else {
        setSuccessSignup(true);
        setNotification([]);
      }
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const postInformTenantToSignup = async (
  params,
  setSuccessSignup,
  setNotification
) => {
  console.log("121321");
  await axios
    .post("http://127.0.0.1:8000/hostregister/", params)
    .then((response) => {
      console.log("signup tenant: ", response);
      if (
        Array.isArray(response.data.email) === true ||
        Array.isArray(response.data.address) === true ||
        Array.isArray(response.data.fullname) === true ||
        Array.isArray(response.data.identication) === true ||
        Array.isArray(response.data.password) === true ||
        Array.isArray(response.data.phoneNumber) === true ||
        Array.isArray(response.data.username) === true  
      ) {
        setNotification(["Xem lại thông tin đăng ký của bạn"]);
      } else{
        setSuccessSignup(true);
      }
      
      
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};


//login
export const postToLogin = async (
  params,
  setLogged
) => {
  await axios
    .post("http://127.0.0.1:8000/login/", params)
    .then((response) => {
      console.log("login: ", response);
      if(response.data==="not ok"){
        NotificationManager.error("","Kiểm tra lại mật khẩu và email")
      }else{
        console.log(response)
        localStorage.setItem("Rooms_logged",true)
        localStorage.setItem("Rooms_token",response.data.token)
        localStorage.setItem("Rooms_user_type",response.data.user_type)
        localStorage.setItem("Rooms_username",response.data.username)
        setLogged(true)
      }
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
};

//profile
export const getRenterProfile = async (
  setProfile
) => {
  await axios
    .get("http://127.0.0.1:8000/renterProfile/", {headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("login: ", response);
      if(response.status===200){
        setProfile(response.data)
      }
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
};

export const putRenterUpdateProfile  = async (
  params
) => { 
  await axios
    .put("http://127.0.0.1:8000/renterUpdateProfile/",params,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log(response)
      if(response.data==="ok"){
        NotificationManager.success('', 'Cập nhật thành công');
      }else{
        NotificationManager.error('', 'Điền đầy đủ thông tin để cập nhật');
      }
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
};

export const getHostProfile = async (
  setProfile
) => { 
  await axios
    .get("http://127.0.0.1:8000/hostProfile/", {headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("host Profile: ", response);
      if(response.status===200){
        setProfile(response.data)
      }
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
}

export const putHostUpdateProfile  = async (
  params
) => { 
  await axios
    .put("http://127.0.0.1:8000/hostUpdateProfile/",params,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("update profile:",response)
      if(response.data==="ok"){
        NotificationManager.success('', 'Cập nhật thành công');
      }else{
        NotificationManager.error('', 'Lỗi khi cập nhật');
      }
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
};

export const putChangePassword  = async (
  params,
  setNotification
) => { 
  await axios
    .put("http://127.0.0.1:8000/changePassword/",params,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("change password:",response)
      if(response.data!=="ok"){
        setNotification(true);
        NotificationManager.error("","Thay đổi mật khẩu thất bại")
        
      }else{
        setNotification(false);
        NotificationManager.success("","Thay đổi mật khẩu thành công") 
      }
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
};

export const getAllHost = async (
  setAllHost
) => {
  await axios
    .get(`http://127.0.0.1:8000/allUser/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get all host:",response)
      setAllHost(response.data.data)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
}

//Post

export const getHostPostList = async (
  setResponse
) => { 
  await axios
    .get("http://127.0.0.1:8000/post/hostPostList/", {headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("host post list: ", response);
      setResponse(response.data.data)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
}

export const getRoomDetail = async (
  params,
  setLiked,
  setResponse
) => { 
  await axios
    .get(`http://127.0.0.1:8000/post/postDetail/${params.id}`, {headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("post Detail: ", response);
      setResponse(response.data.data)
      setLiked(response.data.liked)
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
}

export const postPost  = async (
  params
) => { 
  await axios
    .post("http://127.0.0.1:8000/post/createPost/",params,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("create Post:",response)
      if(response.data==="ok"){
        NotificationManager.success('Chờ được xác nhận', 'Đăng bài thành công');
        history.push("/manage-post")
      }else{
        NotificationManager.error('Có lỗi khi đăng bài', 'Lỗi');
      }
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
};

export const updatePost  = async (
  params,
  id
) => { 
  console.log(params,"----",id)
  await axios
    .put(`http://127.0.0.1:8000/post/updatePost/${id}/`,params,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("update Post:",response)
      if(response.data==="ok"){
        NotificationManager.success('Chờ được xác nhận', 'Đăng bài thành công');
      }else{
        NotificationManager.error('Có lỗi khi đăng bài', 'Lỗi');
      }
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
};

export const getPostHomepage = async (
  params,
  setPostLocation
) => { 
  await axios
    .get(`http://127.0.0.1:8000/post/homePage/${params.location}/${params.start}/${params.end}` )
    .then((response) => {
      console.log("home page: ", response);
      setPostLocation(response.data.data)
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
}

export const postFavorite  = async (
  params
) => { 
  await axios
    .post(`http://127.0.0.1:8000/favorite/createAndDelete/${params.postId}/`,{},{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("post favorite:",response)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
};

export const getFavorite = async (
  params,
  setPostFavorite
) => { 
  await axios
    .get(`http://127.0.0.1:8000/favorite/list/${params.start}/${params.end}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get favorite:",response)
      setPostFavorite(response.data.data)
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
};

export const postReview = async (
  params,
  id
) => {
  await axios
    .post(`http://127.0.0.1:8000/review/createReview/${id}/`,params,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("post review:",response)
      if(response.data==="ok"){
        NotificationManager.success("","Bình luận thành công chờ xác nhận")
      }else{
        NotificationManager.error("","Bình luận không thành công ")
      }
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
}

export const getReview = async (
  params,
  setCommentList
) => {
  await axios
    .get(`http://127.0.0.1:8000/review/listReviewOfPost/${params.id}/${params.start}/${params.end}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get review:",response)
      setCommentList(response.data.data)
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
}

export const getSearchPost = async (
  params,
  setSearchPost
) => {
  await axios
    .get(`http://127.0.0.1:8000/post/search/${params.searching}/${params.start}/${params.end}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("search post:",response)
      setSearchPost(response.data.data)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
}

export const getPostFilter = async (
  params,
  setPostList
) => {
  await axios
    .get(`http://127.0.0.1:8000/post/searchByCiteria/`,{params:params,headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get Post Filter:",response)
        setPostList(response.data.data)
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
}


//admin
export const getUnconfirmedHostList = async (
  params,
  setUnconfirmedHostList
) => {
  await axios
    .get(`http://127.0.0.1:8000/admin/unconfirmedhostlist/${params.start}/${params.end}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get uncofirmed host list:",response)
      setUnconfirmedHostList(response.data.data)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
}

export const getConfirmedHostList = async (
  params,
  setConfirmedHostList
) => {
  await axios
    .get(`http://127.0.0.1:8000/admin/confirmedhostlist/${params.start}/${params.end}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get uncofirmed host list:",response)
      setConfirmedHostList(response.data.data)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
} 

export const putConfirmAccount = async (
  params,
) => {
  await axios
    .put(`http://127.0.0.1:8000/admin/confirmhost/${params.is_confirmed}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("confirm host:",response)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
} 

export const putAllowUpdate = async (
  params,
) => {
  await axios
    .put(`http://127.0.0.1:8000/admin/allowupdate/${params.id}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("put allow update:",response)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
} 

export const getConfirmedPostList = async (
  params,
  setConfirmedPostList
) => {
  await axios
    .get(`http://127.0.0.1:8000/post/admin/postList/True/${params.start}/${params.end}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get confirmed Post List:",response)
      setConfirmedPostList(response.data.data)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
} 

export const getUnConfirmedPostList = async (
  params,
  setUnconfirmedPostList
) => {
  await axios
    .get(`http://127.0.0.1:8000/post/admin/postList/False/${params.start}/${params.end}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get unconfirmed Post List:",response)
      setUnconfirmedPostList(response.data.data)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
} 

export const putAllowUpdatePost = async (
  params,
) => {
  await axios
    .put(`http://127.0.0.1:8000/post/admin/confirmpost/${params.id}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("put allow update post:",response)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
} 

export const getConfirmedReviewList = async (
  setConfirmedReviewList
) => {
  await axios
    .get(`http://127.0.0.1:8000/review/listReview/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get confirmed Review List:",response)
      setConfirmedReviewList(response.data)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
} 

export const ConfirmedReview = async (
  params
) => {
  await axios
    .put(`http://127.0.0.1:8000/review/confirmReview/${params.id}/`,{},{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("confirmed Review:",response)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
} 


//message 
export const getFullMessage = async (
  params,
  setFullMessage
) => {
  await axios
    .get(`http://127.0.0.1:8000/chat/chat/${params.id}/${params.start}/${params.end}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get full message:",response.data.data)
      setFullMessage(response.data.data)
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
} 

export const getIdChat = async (
  setIdChat
) => {
  await axios
    .get(`http://127.0.0.1:8000/chat/thread/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get Id Chat:",response)
      setIdChat(response.data[0].id)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
} 

export const getIdChatAdmin = async (
  params,
  setIdChat
) => {
  await axios
    .get(`http://127.0.0.1:8000/chat/threadAdmin/${params.hostname}`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
    .then((response) => {
      console.log("get Id Chat Admin:",response)
      setIdChat(response.data[0].id)
      
    })
    .catch((error) => {
      console.log("error: ", error);  
    });
} 

export const postUpdateStatus = async (
  params,
  id
) => {
  await axios
    .put(`http://127.0.0.1:8000/post/updatePostStatus/${id}/`, params)
    .then((response) => {
      console.log("update post status: ", response);
      if(response.data==="ok")
      NotificationManager.success('Thành công', 'Cập nhật thành công');
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const putExtendExpiredDate = async (
  params,
  id
) => {
  await axios
    .put(`http://127.0.0.1:8000/post/extendExpiredDate/${id}/`, params)
    .then((response) => {
      console.log("extend expired date: ", response);
      if(response.data==="ok")
      NotificationManager.success('Thành công', 'Cập nhật thành công');
      else{
        NotificationManager.error('', 'Bài đăng còn chưa hết hạn');
      }
    })
    .catch((error) => {
      console.log("error: ", error);
    });
  }


  //statistic
  export const getStatisTic = async (
    params,
    setData
  ) => {
    await axios
      .get(`http://127.0.0.1:8000/views/statistic/${params.id}/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
      .then((response) => {
        console.log("get statistic:",response)
        setData(response.data.views)
      })
      .catch((error) => {
        console.log("error: ", error);  
      });
  } 


  //notification
  export const getNotificationList = async (
  ) => {
    await axios
      .get(`http://127.0.0.1:8000/notification/List/`,{headers:{Authorization:`JWT ${localStorage.getItem("Rooms_token")}`}})
      .then((response) => {
        console.log("get notification list :",response)
        response.data.map((noti)=>{
          NotificationManager.warning("",noti.message,10000000,)
        })
      })
      .catch((error) => {
        console.log("error: ", error);  
      });
  } 

  

  


  





