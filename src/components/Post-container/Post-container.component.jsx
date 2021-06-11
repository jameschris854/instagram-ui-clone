import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setPostData } from "../../redux/post/post.action";
import { Post } from "../Post/Post.component";
import "./Post-container.styles.scss";

const PostContainer = ({ postsData, fetchPosts, authState,currentUser }) => {
  
  console.log(authState);
  
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetch("http://127.0.0.1:3000/api/v1/posts", {
        headers: { Authorization: "Bearer " + authState.token },
      });
      const data = await response.json();
      fetchPosts(data.posts);
      // ...
    }
    fetchData();
  }, [fetchPosts, authState]);

  console.log(postsData.posts ? console.log(postsData.posts) : "no posts");
  
  return (
    <div className="post-container">
      {postsData.posts
        ? postsData.posts.map((post) => (
            <Post
              key={post.id}
              state="active"
              imageUrl={post.postImage}
              proImage={post.author.photo}
              userName={post.author.userName}
              // eslint-disable-next-line
              userId={post.author.id == currentUser.id? null :post.author.id}
              caption={post.postCaption}
            />
          ))
        : "loading"}
    </div>
  );
};

const mapStateToProps = (state) => ({
  postsData: state.posts,
  authState: state.auth.authData,
  currentUser: state.user.currentUser.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (posts) => dispatch(setPostData(posts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);

/* <Post
        state="active"
        imageUrl="https://images-na.ssl-images-amazon.com/images/I/81WUs3wBGbL._AC_SL1500_.jpg"
        proImage="https://wallpapercave.com/wp/wp5135903.jpg"
      />
      <Post
        imageUrl="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAhsHgOldozR5d_-2lJbnR9qv0g5X2g8HAQ&usqp=CAU"
      />
      <Post
        state="active"
        imageUrl="https://i.pinimg.com/originals/a4/f8/f9/a4f8f91b31d2c63a015ed34ae8c13bbd.jpg"
        proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvxDrCR5SfO2zzeBNLF9U9xbjlC8-ToAA68g&usqp=CAU"
      /> */
