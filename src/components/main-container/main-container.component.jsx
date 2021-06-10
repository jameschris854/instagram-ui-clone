import React,{ useState } from "react";
import PostContainer from "../Post-container/Post-container.component";
import { StoryContainer } from "../Story-container/Story-container.component";
import AddPostForm from "../../components/AddPostForm/AddPostForm.component";
import "./main-container.styles.scss";


const MainContainer = () => {
  const [ postForm, setPostForm ] = useState("hide");
  const handlePostFormToggle = () => {
    postForm==='show'?setPostForm("hide"):setPostForm("show")
  }
  return (
    <div className="main-container">
      <StoryContainer />
      <div className={`add-post-btn  ${postForm==='show'?'':'show'}`} onClick={handlePostFormToggle}>
        <i className="fas fa-plus"></i>
      </div>
      <AddPostForm visibility={postForm} handleClick={handlePostFormToggle}/>
      <PostContainer />
    </div>
  );
};

export default MainContainer;
