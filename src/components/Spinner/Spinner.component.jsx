import React from "react";
import "./Spinner.styles.scss";


const Spinner = ({stories,posts}) => (
  <div className="spinner-container">
   <div className={`spinner ${stories?'stories': posts? 'posts' : ''}`}>
	<p>Loading</p>
</div>
  </div>
);

export default Spinner;
