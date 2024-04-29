import { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import PageMenu from "../../components/pageMenu/PageMenu";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card";
import { getUser, updateUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth);

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: user?.address || {
      address: user?.address?.address || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      //get the user one time
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        photo: user?.photo || "",
        address: user?.address || {
          address: user?.address?.address || "",
          state: user?.address?.state || "",
          country: user?.address?.country || "",
        },
      });
    }
  }, [dispatch, user]);

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleImagechange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    const userData = {
      name: profile.name,
      phone: profile.phone,
      role: profile.role,
      address: {
        address: profile.address,
        state: profile.state,
        country: profile.country,
      },
    };

    await dispatch(updateUser(userData));
  };

  const savePhoto = async () => {};

  return (
    <>
      <section>
        {isLoading && <Loader />}

        <div className="container">
          <PageMenu />

          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {!isLoading && (
                <>
                  <div className="profile-photo">
                    <div>
                      <img
                        src={imagePreview === null ? user?.photo : imagePreview}
                        alt="profile"
                      />
                      <h3>Role: {profile?.role}</h3>
                      {imagePreview !== null && (
                        <div className="--center --all">
                          <button
                            className="--btn --btn-secondary"
                            onClick={savePhoto}>
                            <AiOutlineCloudUpload size={18} /> Upload Photo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <form onSubmit={saveProfile}>
                    <p>
                      <label>Change Photo</label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImagechange}
                      />
                    </p>

                    <p>
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profile?.name}
                        onChange={handleInputchange}
                        required
                      />
                    </p>

                    <p>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profile?.email}
                        onChange={handleInputchange}
                        disabled
                      />
                    </p>

                    <p>
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile?.phone}
                        required
                        onChange={handleInputchange}
                      />
                    </p>

                    <p>
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={profile?.address?.address}
                        required
                        onChange={handleInputchange}
                      />
                    </p>

                    <p>
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={profile?.address?.state}
                        required
                        onChange={handleInputchange}
                      />
                    </p>

                    <p>
                      <label>Country</label>
                      <input
                        type="text"
                        name="country"
                        value={profile?.address?.country}
                        required
                        onChange={handleInputchange}
                      />
                    </p>

                    <button className="--btn --btn-primary --btn-block">
                      Update Profile
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
