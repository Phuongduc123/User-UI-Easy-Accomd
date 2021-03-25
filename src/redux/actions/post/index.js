/* eslint-disable import/no-anonymous-default-export */
import {
  GET_HOST_POST_LIST,
  GET_HOST_POST_LIST_SUCCEED,
  GET_ROOM_DETAIL,
  GET_ROOM_DETAIL_SUCCEED,
  POST_FAVORITE,
  POST_POST,
  SEARCH_POST,
} from "./action_type";

export default {
  getHostPostList: () => {
    return {
      type: GET_HOST_POST_LIST,
    };
  },
  getHostPostListSucceed: (postList) => {
    return {
      type: GET_HOST_POST_LIST_SUCCEED,
      params: {
        postList,
      },
    };
  },
  getRoomDetail: (id,setLiked) => {
    return {
      type: GET_ROOM_DETAIL,
      params: {
        id,
      },
      setLiked
    };
  },
  getRoomDetailSucceed: (data) => {
    return {
      type: GET_ROOM_DETAIL_SUCCEED,
      params: {
        data,
      },
    };
  },
  postPost: (
    detailAddress,
    describeAddress,
    roomType,
    numberOfRoom,
    price,
    rent_time,
    square,
    withOwner,
    bathroomType,
    heater,
    kitchen,
    airconditioner,
    balcony,
    water_price,
    electricity_price,
    other,
    images,
    expiredDate
  ) => {
    return {
      type: POST_POST,
      params: {
        detailAddress,
        describeAddress,
        roomType,
        numberOfRoom,
        price,
        rent_time,
        square,
        withOwner,
        bathroomType,
        heater,
        kitchen,
        airconditioner,
        balcony,
        water_price,
        electricity_price,
        other,
        images,
        expiredDate,
      },
    };
  },

  postFavorite:(postId)=>{
    return {
      type: POST_FAVORITE,
      params:{
        postId
      }
    }
  },

  searchPost:(searching) =>{
    return{
      type:SEARCH_POST,
      params:{
        searching
      }
    }
  }
};
