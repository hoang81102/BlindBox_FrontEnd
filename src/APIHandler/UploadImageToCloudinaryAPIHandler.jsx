const CLOUD_NAME = "dk3yac2ie";
const UPLOAD_PRESET = "mystic_blindbox";
const FOLDER_NAME = "asset";

export const UploadImageToCloudinaryAPIHandler = async (formData) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Upload thất bại!");

    return await response.json();
  } catch (error) {
    console.error("Lỗi API Cloudinary:", error);
    return null;
  }
};
