import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

const UploadImageService = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file selected");
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(error);
      },

      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

export default UploadImageService;
