import dummy_usr_img from "./assets/images/dummy_user.png";
import "./assets/styles/userprofileedit.css";
import { useState } from "react";

const UserProfileEdit = () => {
  const [proimg, setProImg] = useState(dummy_usr_img);
  const [social_link_urls, setSocial_link_urls] = useState([]);

  /*urls.forEach(url => console.log(url.replace(/.+\/\/|www.|\..+/g, '')))*/
  const link_2_sitename = (link) => {
    return link.replace(/.+\/\/|www.|\..+/g, "");
  };

  const profileimg_uploaded = (e) => {
    setProImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="container user-profile-edit">
      <div className="row basic-details">
        <div className="col-md-3 profile-img">
          <img src={proimg} alt="user" />
        </div>

        <div className="col-md-9 names-bio">
          <form action="" method="post">
            <div className="details">
              <div className="inp-field">
                <div>FULL NAME</div>
                <input type="text" />
              </div>
              <div className="inp-field">
                <div>USERNAME</div>
                <input type="text" />
              </div>
              <div className="inp-field">
                <div>Your Role</div>
                <input type="text" placeholder="seperate with , " />
              </div>
              <div className="inp-field">
                <div>BIO</div>
                <textarea rows="6" type="text"></textarea>
              </div>
            </div>

            <div className="form-btns">
              <label
                htmlFor="uploaded_profile_img"
                className="upload-profile-img-label"
              >
                Upload Profile Image
              </label>
              <input
                type="file"
                name="uploaded_profile_img"
                id="uploaded_profile_img"
                onChange={profileimg_uploaded}
                hidden
              />
              <button type="submit">SAVE</button>
            </div>
          </form>
        </div>
      </div>

      <div className="social_links">
        <div className="social_link"></div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
