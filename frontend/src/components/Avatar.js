// import React from "react";
// import {Image} from "react-bootstrap";

// export default function Avatar({size, url, className}) {
// 	return (
// 		<Image
// 			className={className}
// 			src={url === "default" ? "/images/defaultAvatar.webp" : url}
// 			alt="User Avatar"
// 			fluid
// 			roundedCircle={true}
// 			style={{width: size, height: size, objectFit: "cover"}}
// 		/>
// 	);
// }

import React from "react";
import { Image } from "antd";

export default function Avatar({ size, url, className }) {
  return (
    <Image
      className={className}
      src={url === "default" ? "/images/defaultAvatar.webp" : url}
      alt="User Avatar"
      style={{ width: size, height: size, objectFit: "cover", borderRadius: "50%" }}
    />
  );
}
