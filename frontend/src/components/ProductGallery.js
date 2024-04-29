// import React, {useState} from "react";
// import {Image} from "react-bootstrap";

// export default function ProductGallery({images, alt}) {
// 	const [selectImgIndex, setSelectImgIndex] = useState(0);
// 	function mouseIn(index) {
// 		setSelectImgIndex(index);
// 	}
// 	return (
// 		<div>
// 			{images ? (
// 				<>
// 					<div>
// 						<Image
// 							src={images[selectImgIndex]}
// 							alt={alt}
// 							fluid
// 							style={{
// 								height: "500px",
// 								objectFit: "contain"
// 							}}
// 						/>
// 					</div>
// 					<div className="d-flex flex-wrap mt-2">
// 						{images.map((image, i) => (
// 							<Image
// 								key={i}
// 								src={image}
// 								alt={alt}
// 								fluid
// 								style={{
// 									width: "80px",
// 									height: "80px",
// 									margin: "5px",
// 									objectFit: "cover",
// 									cursor: "pointer"
// 								}}
// 								onMouseEnter={() => mouseIn(i)}
// 							/>
// 						))}
// 					</div>
// 				</>
// 			) : null}
// 		</div>
// 	);
// }

import React, { useState } from "react";

export default function ProductGallery({ images, alt }) {
  const [selectImgIndex, setSelectImgIndex] = useState(0);

  function mouseIn(index) {
    setSelectImgIndex(index);
  }

  return (
    <div>
      {images ? (
        <>
          <div>
            <img
              src={images[selectImgIndex]}
              alt={alt}
              className="h-80 object-contain mx-auto"
            />
          </div>
          <div className="flex flex-wrap mt-2 justify-center">
            {images.map((image, i) => (
              <img
                key={i}
                src={image}
                alt={alt}
                className="w-16 h-16 m-1 object-cover cursor-pointer"
                onMouseEnter={() => mouseIn(i)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
