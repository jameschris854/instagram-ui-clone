import React from "react";
import { Post } from "../Post/Post.component";
import "./Post-container.styles.scss";

export const PostContainer = () => (
  <div className="post-container">
    <Post
    state='active'
      imageUrl="https://images-na.ssl-images-amazon.com/images/I/81WUs3wBGbL._AC_SL1500_.jpg"
      proImage="https://wallpapercave.com/wp/wp5135903.jpg"
    />
    <Post
      imageUrl="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAhsHgOldozR5d_-2lJbnR9qv0g5X2g8HAQ&usqp=CAU"
    />
    <Post
    state='active'
      imageUrl="https://i.pinimg.com/originals/a4/f8/f9/a4f8f91b31d2c63a015ed34ae8c13bbd.jpg"
      proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvxDrCR5SfO2zzeBNLF9U9xbjlC8-ToAA68g&usqp=CAU"
    />
  </div>
);
