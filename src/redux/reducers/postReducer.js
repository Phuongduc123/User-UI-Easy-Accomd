/* eslint-disable import/no-anonymous-default-export */
import { GET_HOST_POST_LIST_SUCCEED, GET_ROOM_DETAIL, GET_ROOM_DETAIL_SUCCEED,POST_FAVORITE,POST_POST, SEARCH_POST } from "../actions/post/action_type";
import {postFavorite, postPost} from "../../request";

export default (
  state = {
    postListIsConfirmed: [],
    postListIsntConfirmed: [],
    roomDetail:{},
    searching:"",
  },
  action
) => {
  switch (action.type) {
    case GET_HOST_POST_LIST_SUCCEED: {
      let fakePostListIsConfirmed = [];
      let fakePostListIsntConfirmed = [];
      action.params.postList.map((post) => {
        if (post.is_confirmed === false) {
          fakePostListIsntConfirmed.push(post);
        } else {
          fakePostListIsConfirmed.push(post);
        }
      });
      return {
        ...state,
        postListIsConfirmed: fakePostListIsConfirmed,
        postListIsntConfirmed: fakePostListIsntConfirmed,
      };
    }

    case GET_ROOM_DETAIL_SUCCEED:{
      return {
        ...state,
        roomDetail:action.params.data
      }
    }

    case POST_POST:{
      postPost(action.params)
      return {
        ...state
      }
    }

    case POST_FAVORITE:{
      postFavorite(action.params)
      return {
        ...state
      }
    }

    case SEARCH_POST:{
      return{
        ...state,
        searching:action.params.searching
      }
    }

    default: {
      return { ...state };
    }
  }
};
