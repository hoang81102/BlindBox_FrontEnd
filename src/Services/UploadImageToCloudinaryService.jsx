import { UploadImageToCloudinaryAPIHandler } from "../APIHandler/UploadImageToCloudinaryAPIHandler";

export const UploadImageToCloudinaryService = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "mystic_blindbox");
  formData.append("folder", "asset");

  const data = await UploadImageToCloudinaryAPIHandler(formData);
  return data ? data.secure_url : null;
};
