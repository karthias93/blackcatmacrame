import React, { useState } from "react";
import { Upload, message } from "antd";
import Loader from "./Loader"; 
import Avatar from "./Avatar";
import axios from "axios"; 

export default function EditAvatar({ avatar, setAvatar }) {
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const uploadFileHandler = async (file) => {
    setUploadingAvatar(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setAvatar(data);
      setUploadingAvatar(false);
      message.success("Avatar uploaded successfully!"); 
    } catch (error) {
      console.error(error);
      message.error("Error uploading avatar!"); 
      setUploadingAvatar(false);
    }
  };

  return (
    <div className="edit_avatar flex flex-col items-center">
      {uploadingAvatar ? (
        <Loader />
      ) : (
        <Avatar size={80} url={avatar} className="mb-2" />
      )}
      <Upload
        name="avatar"
        customRequest={uploadFileHandler}
        showUploadList={false} 
        beforeUpload={(file) => {
          if (!file.type.match("image/.*")) {
            message.error("Please select an image file!");
            return Upload.LIST_IGNORE;
          }
          return true;
        }}
      >
        <button className="upload_button w-full flex items-center justify-center px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium">
          <i className="fas fa-pen mr-2"></i> Update Avatar
        </button>
      </Upload>
    </div>
  );
}

