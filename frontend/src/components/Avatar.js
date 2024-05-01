import React from "react";
import {Image} from "react-bootstrap";
import defaultAvatar from "../images/defaultAvatar.webp";

export default function Avatar({size, url, className}) {
	return (
		<Image
			className={className}
			src={url === "default" ? defaultAvatar : url}
			alt="User Avatar"
			fluid
			roundedCircle={true}
			style={{width: size, height: size, objectFit: "cover"}}
		/>
	);
}
