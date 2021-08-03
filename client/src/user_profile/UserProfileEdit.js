import dummy_usr_img from "./assets/images/dummy_user.png";
import "./assets/styles/userprofileedit.css";
import { useState } from "react";

const UserProfileEdit = () => {
  const [linkico, setLinkIco] = useState("link");
  const [social_link_url, setSocial_link_url] = useState("");

  /*urls.forEach(url => console.log(url.replace(/.+\/\/|www.|\..+/g, '')))*/
  const add_social_link = () => {
    var web = social_link_url.replace(/.+\/\/|www.|\..+/g, "");
    console.log(web);
    setLinkIco(web);
  };

  return (
    <div className="container user-profile-edit">
      <div className="row basic-details">
        <div className="col-md-3 profile-img">
          <img src={dummy_usr_img} alt="user" />
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
                <input type="text" />
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
                hidden
              />
              <button type="submit">SAVE</button>
            </div>
          </form>
        </div>
      </div>

      <h3>Social Links</h3>
      <div className="social-links">
        <div className="row social-link">
          <div className="col-md-1 social-link-ico">
            <i className={`fab fa-${linkico}`} aria-hidden="true"></i>
          </div>
          <div className="col-md-10">
            <input
              type="text"
              value={social_link_url}
              onChange={(e) => {
                setSocial_link_url(e.target.value);
              }}
            />
          </div>
          <div className="col-md-1">
            <button onClick={add_social_link}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
