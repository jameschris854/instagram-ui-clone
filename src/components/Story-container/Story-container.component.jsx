import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StoryItem } from "../Story-item/Story-item.component";
import "./Story-container.styles.scss";

const StoryContainer = ({ authState }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchUsersList() {
      console.log(`${process.env.REACT_APP_API_URL}users`);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        headers: { Authorization: "Bearer " + authState.token },
      });
      const allUsers = await res.json();
      setUserList(allUsers.data.users);
      console.log(allUsers.data.users);
    }
    fetchUsersList();
  }, [authState.token]);

  return (
    <div className="story-container">
      {!userList[0]
        ? "loading"
        : userList.map((user) => (
            <StoryItem state="active" proImage={user.photo} username={user.userName} />
          ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  authState: state.auth.authData,
  currentUser: state.user.currentUser.user,
});

export default connect(mapStateToProps)(StoryContainer);

// <StoryItem proImage="https://wallpapercave.com/wp/wp5135903.jpg" />
//       <StoryItem
//         state="active"
//         proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAhsHgOldozR5d_-2lJbnR9qv0g5X2g8HAQ&usqp=CAU"
//       />
//       <StoryItem proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIvAUH2ClVMdv3p6CB6oJtnEhqNhm7unb0Fg&usqp=CAU" />
//       <StoryItem
//         state="active"
//         proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU4g8xUnnDU4kVOp8_-3f3aPDusw_D2AlyXw&usqp=CAU"
//       />
//       <StoryItem
//         state="active"
//         proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJfqwK_Qq8yNUkrG8F72ziIsnrkTCDVIEVug&usqp=CAU"
//       />
//       <StoryItem proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTJJjceD7Xn1-ZIEoxBUHl1f0lFXIi6daOmQ&usqp=CAU" />
//       <StoryItem
//         state="active"
//         proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt85hyof5_odk1dRNdny7dczU4L7ukDavDsA&usqp=CAU"
//       />
//       <StoryItem proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJh6t-5E8Ay_8LVLhNtEqXeUgehHdyeEHUQ&usqp=CAU" />
//       <StoryItem
//         state="active"
//         proImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUIE7MZAcG_Dq3TVof1tHAYLUSSq1y-nGrDQ&usqp=CAU"
//       />
//       <StoryItem proImage="https://images.summitmedia-digital.com/cosmo/images/2020/08/26/julia-barretto-profile-picture-idea-1598430021.jpg" />
