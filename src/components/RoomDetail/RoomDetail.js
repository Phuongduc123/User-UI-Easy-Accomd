/* eslint-disable no-undef */
import React, { useEffect,createElement, useState } from "react";
import "./RoomDetail.css";
import { Input, Carousel, Avatar, Tooltip, Comment } from "antd";
import BeautyStars from 'beauty-stars';
import moment from "moment";
import {
  HeartOutlined,
  EditOutlined,
  EyeOutlined,
  WarningOutlined,
  GlobalOutlined,
  HomeOutlined,
  UserOutlined,
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { useLocation } from "react-router";
import actions from "../../redux/actions/post/index";
import { connect } from "react-redux";
import ShowMoreText from "react-show-more-text";
import FbImageLibrary from "react-fb-image-grid";
import { getReview, postReview } from "../../request";
const { Search } = Input;
const {TextArea} = Input;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function RoomDetail(props) {
  const location = useLocation();
  const [commentList,setCommentList] = useState([])
  const [totalRating,setTotalRating] = useState(1) 
  const [comment,setComment] = useState("");
  const [rating,setRating] = useState(1);
  const [startComment,setStartComment] = useState(0);
  const [endComment,setEndComment] = useState(5);
  const [liked,setLiked] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  //hook

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    props.getRoomDetail(location?.state?.id,setLiked);
    getReview({start:startComment,end:endComment,id:location?.state?.id},setCommentList)
  }, []);

  useEffect(()=>{
    let total=0;
    commentList.map((review)=>[
      total+=review.rating   
    ])
    setTotalRating(total/commentList.length)

  },[commentList])

  //function
  const hanldePostReview = () =>{
    postReview({rating:rating,comment:comment},location?.state?.id)
    setComment("")
  }
  
  return (
    <div className="RoomDetail">
      <div
        style={{ marginTop: "10px", paddingLeft: "5rem", paddingRight: "5rem" }}
      >
        {/* title and some information */}
        <div style={{ display: "flex", marginTop: "30px" }}>
          <div className="line" />
          <div style={{ flexDirection: "column", flex: 1 }}>
            <div className="place">{props.roomDetail?.detailAddress}</div>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 10, fontSize: "12px", color: "green" }}>
                C??n ph??ng
              </div>
              <div style={{ flex: 1, display: "flex", marginTop: "-20px" }}>
                <Avatar
                  size={40}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
                <div>
                  <div>{props.roomDetail.hostName}</div>
                  <div style={{ fontSize: "10px", color: "grey" }}>
                    {props.roomDetail?.detailAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* image collection */}
      <div style={{ display: "flex" }}>
        <div style={{ flex: 3 }} />
        <div style={{ flex: 10, marginTop: "20px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1.5 }}>
              <FbImageLibrary
                style={{height:"300px"}}
                images={props.roomDetail.images}
                renderOverlay={() => <div>Xem ???nh</div>}
              />
            </div>
            <div className="information-table" style={{ flex: 1 }}>
              <div className="address-name">
                {props.roomDetail?.detailAddress}
              </div>
              <div className="post-date-detail">Ng??y ????ng: 12/11/2000</div>
              <div className="have-room">C??n ph??ng</div>
              <div className="price-detail">
                {props.roomDetail?.price} /{" "}
                <span style={{ fontSize: "17px", color: "grey" }}>th??ng</span>
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <GlobalOutlined style={{ color: "brown" }} />
                <div style={{ marginLeft: "10px", color: "black" }}>
                  {props.roomDetail?.describeAddress}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <HomeOutlined style={{ color: "brown" }} />
                <div style={{ marginLeft: "10px", color: "black" }}>
                  {props.roomDetail?.roomType}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <UserOutlined style={{ color: "black" }} />
                <div style={{ marginLeft: "10px", color: "black" }}>
                  {props.roomDetail?.numberOfRoom} ng?????i ??? t???i ??a
                </div>
              </div>
              <div style={{ color: "black", marginTop: "10px" }}>
                ????nh gi??:{" "}
                <span style={{ color: "red", fontSize: "17px" }}>{Math.round(totalRating,1)}</span> /5
                (19 ????nh gi??)
                <BeautyStars
                  size={20}
                  value={totalRating}
                />
              </div>
              <div className="contact">
                <div
                  style={{
                    color: "black",
                    fontSize: "13px",
                    marginTop: "10px",
                  }}
                >
                  Li??n h???:
                </div>
                <div>{`T??n ch??? nh??: ${props.roomDetail.hostName}`}</div>
                <div>{`Hotline: ${props.roomDetail.phoneNumber}`}</div>
                <div>Email: huy@gmail.com</div>
              </div>
              <div
                className="operations"
                style={{ display: "flex", marginTop: "20px", color: "black" }}
              >
                <div style={{ flex: 1 }}>
                  <HeartOutlined 
                    onClick={()=>{
                      setLiked(!liked)
                      props.postFavorite(location?.state?.id)
                    }}
                    style={{ marginLeft: "21px", cursor: "pointer",color:liked===true?"red":"black" }}
                  />
                  <div style={{ fontSize: "12px" }}>{`${props.roomDetail.total_like} Y??u th??ch`}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <EditOutlined
                    style={{ marginLeft: "21px", cursor: "pointer" }}
                  />
                  <div style={{ fontSize: "12px" }}>????nh gi??</div>
                </div>
                <div style={{ flex: 1 }}>
                  <EyeOutlined
                    style={{ marginLeft: "21px", cursor: "pointer" }}
                  />
                  <div style={{ fontSize: "12px" }}>{props.roomDetail.total_views} view</div>
                </div>
                <div style={{ flex: 1 }}>
                  <WarningOutlined
                    style={{ marginLeft: "21px", cursor: "pointer" }}
                  />
                  <div style={{ fontSize: "12px" }}>B??o c??o</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 3 }} />
      </div>

      <div
        className="information"
        style={{ display: "flex", marginTop: "40px" }}
      >
        <div style={{ flex: 1.5 }} />
        <div style={{ flex: 6 }}>
          <div className="location">
            <div style={{ fontSize: "20px" }}>?????a ??i???m</div>
            <div style={{ color: "grey" }}>
              {props.roomDetail?.detailAddress}
            </div>
          </div>
          <div
            className="detail-room"
            style={{ display: "flex", marginTop: "10px" }}
          >
            <div className="room-type" style={{ flex: 1 }}>
              <div style={{ fontSize: "20px" }}>Lo???i ph??ng</div>
              <div
                style={{
                  color: "grey",
                  width: windowDimensions.width / 6,
                }}
              >
                <div style={{ display: "flex" }}>
                  <div>
                    <div style={{ display: "flex" }}>
                      {`Lo???i ph??ng:`}
                      {props.roomDetail?.roomType}
                    </div>
                    <div style={{ display: "flex" }}>{`Ban c??ng: ${
                      props.roomDetail?.balcony === true ? "c??" : "kh??ng"
                    }`}</div>
                    <div style={{ display: "flex" }}>
                      {`Nh?? t???m: `}
                      {props.roomDetail?.bathroomType}
                    </div>
                    <div style={{ display: "flex" }}>
                      {`B???p: `} {props.roomDetail?.kitchen}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="other-utility" style={{ flex: 1 }}>
              <div style={{ fontSize: "20px" }}>Ph??? ph??</div>
              <div
                style={{
                  color: "grey",
                  width: windowDimensions.width / 6,
                }}
              >
                  <div>{`Ti???n ??i???n: ${props.roomDetail?.electricity_price}/s??? ??i???n`}</div>
                  <div>{`Ti???n n?????c: ${props.roomDetail?.water_price}/s??? n?????c`}</div>
              </div>
            </div>
            <div className="note" style={{ flex: 1 }}>
              <div style={{ fontSize: "20px" }}>Ch?? ??</div>
              <div
                style={{
                  color: "grey",
                  wordBreak: "break-all",
                  width: windowDimensions.width / 6,
                }}
              >
                <ShowMoreText
                  expanded={false}
                  width={400}
                  lines={3}
                  more="Xem th??m"
                  less="Thu l???i"
                >
                  {props.roomDetail?.other}
                </ShowMoreText>
              </div>
            </div>
          </div>
          <div className="description">
            <div style={{ fontSize: "20px", marginTop: "20px" }}>M?? t???</div>
            <div style={{ color: "grey" }}>
              <ShowMoreText
                expanded={false}
                width={windowDimensions.width / 1.5}
                lines={3}
                more="Xem th??m"
                less="Thu l???i"
              >
                {props.roomDetail?.other}
              </ShowMoreText>
            </div>
          </div>
          <div className="comments">
            <div style={{ color: "black", marginTop: "30px",fontSize:"20px",marginBottom:"10px" }}>
              ????nh gi??:{" "}
              <span style={{ color: "red", fontSize: "20px" }}>{rating}</span> /5 (19
              ????nh gi??)
              <BeautyStars
                size={20}
                value={rating}
                onChange={value => setRating(value)}
              />
            </div>

            <div style={{display:"flex"}}>
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
              <TextArea rows={4} value={comment} onChange={(value)=>setComment(value.target.value)} onPressEnter={hanldePostReview}/>
            </div>
            {commentList.map((commentContent,index)=>{
              return(
                <CommentAntd key={index} commentContent={commentContent} />
              )
            })}
          </div>
        </div>

        <div style={{ flex: 0.5 }} />
      </div>

      {/* footer */}
      <div style={{ display: "flex" }}>
        <div style={{ flex: 0 }} />
        <img
          style={{ flex: 7, width: "1rem" }}
          className="Footer"
          src="./assets/FootPage.png"
        />
        <div style={{ flex: 0 }} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    roomDetail: state.post.roomDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoomDetail: (id,setLiked) => {
      dispatch(actions.getRoomDetail(id,setLiked));
    },
    postFavorite: (postId) =>{
      dispatch(actions.postFavorite(postId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetail);

//comment
function CommentAntd(props) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <div className="Comment">
      <Comment
        actions={actions}
        author={<a>{props.commentContent.renter_id}</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <p>
            {props.commentContent.comment}
          </p>
        }
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
}


