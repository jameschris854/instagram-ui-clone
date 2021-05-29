import React, { useState } from "react";
import "./loginPhone.styles.scss";



export const LoginPhone = () => {
  const [backgroundNo,changeBackgroundNo] = useState(1)
   setTimeout(() => {
    changeBackgroundNo(backgroundNo < 5 ? backgroundNo + 1 : 1);
  }, 2000);

  return (
    <div className="phone-container">
      <img
        className="screenShot"
        src={`static/images/screenShot-${backgroundNo}.jpg`}
        alt=""
      />
      <img className="phones" src="static/images/homePagePhones.jpg" alt="" />
    </div>
  );
};
