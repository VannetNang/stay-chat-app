import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { GlobalState } from "../../components/context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(GlobalState);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const profileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        avatar: imageURL,
        name: name,
        bio: bio,
      });
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error(error.code);
      setLoading(false);
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    setPreviewImage(URL.createObjectURL(file));

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL_API_BASE, {
      method: "POST",
      body: data,
    });
    const imageUploaded = await response.json();
    setImageURL(imageUploaded.secure_url);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUid(user.uid);
      const userRef = doc(db, "users", user.uid);
      const userInfo = (await getDoc(userRef)).data();

      if (userInfo) {
        if (userInfo.name) {
          setName(userInfo.name);
        }
        if (userInfo.bio) {
          setBio(userInfo.bio);
        }
        if (userInfo.avatar) {
          setImageURL(userInfo.avatar);
        }
      } else {
        console.error("User document does not exist in Firestore.");
      }
    });
  }, []);

  return (
    <>
      <div className="flex flex-col h-full bg-black min-h-screen">
        <div
          className="text-gray heading-mobile lg:heading hover-text m-[2rem] lg:ml-[25%] flex items-center gap-2"
          onClick={() => navigate("/home")}
        >
          <img src={assets.arrow_icon} className="w-[25px]" />
          Back
        </div>

        <form onSubmit={profileUpdate}>
          <div className="flex-center flex-col gap-[1rem] mb-[3rem] lg:gap-[2rem]">
            <img
              src={
                previewImage
                  ? previewImage
                  : imageURL
                  ? imageURL
                  : assets.avatar_icon
              }
              alt="Avatar Icon"
              className="w-[180px] lg:w-[250px]"
            />
          </div>

          <label
            htmlFor="avatar"
            className="flex-center gap-[20px] mb-[2.5rem] lg:mb-[3rem] cursor-pointer"
          >
            <img
              src={
                previewImage
                  ? previewImage
                  : imageURL
                  ? imageURL
                  : assets.avatar_icon
              }
              alt="Avatar Icon"
              className="logo-rounded-mobile lg:logo-rounded"
            />
            <input
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={handleUploadImage}
            />
            <p className="regular lg:heading-mobile text-gray">
              Upload Profile Image
            </p>
          </label>

          <div className="flex flex-col gap-[2rem] lg:gap-[3rem]">
            <div className="flex-center gap-[1rem] lg:gap-[2rem]">
              <label
                htmlFor="name"
                className="regular lg:heading-mobile text-gray"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-dark-gray h-[42px] lg:w-[500px] pl-[10px] w-[330px] outline-0"
              />
            </div>

            <div className="flex justify-center gap-[1rem] ml-[1.5rem] lg:gap-[2rem]">
              <label
                htmlFor="bio"
                className="regular lg:heading-mobile text-gray"
              >
                Bio
              </label>
              <textarea
                type="text"
                name="bio"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-dark-gray w-[330px] lg:w-[500px] h-[100px] pl-[10px] pt-[5px] outline-0"
              />
            </div>
          </div>

          <div className="text-gray flex-center mt-[3rem]">
            <button
              type="submit"
              className="bg-purple text-gray w-[156px] h-[48px] regular lg:heading-mobile rounded-lg cursor-pointer hover-light flex-center gap-1"
            >
              Save
              {loading && (
                <img
                  src={assets.loading_icon}
                  alt="..."
                  width={20}
                  height={20}
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
