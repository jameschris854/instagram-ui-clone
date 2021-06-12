import React from "react";
import "./Spinner.styles.scss";

const Spinner = ({stories,posts}) => (
  <div className="spinner-container">
   <div class={`loader ${stories?'stories': posts? 'posts' : ''}`}>
	<a href="#">Loading</a>
</div>
  </div>
);

export default Spinner;
