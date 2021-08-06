import dummy_usr_img from "./assets/images/dummy_user.png";
import "./assets/styles/userprofileedit.css";
import { useState } from "react";

const UserProfileEdit = () => {
  const [proimg, setProImg] = useState(dummy_usr_img);
  const [social_link_urls, setSocial_link_urls] = useState([]);
  const [newlink, setNewLink] = useState("");

  /*urls.forEach(url => console.log(url.replace(/.+\/\/|www.|\..+/g, '')))*/
  const link_2_sitename = (link) => {
    return link.replace(/.+\/\/|www.|\..+/g, "");
  };

  const profileimg_uploaded = (e) => {
    setProImg(URL.createObjectURL(e.target.files[0]));
  };

  const add_social_link = () => {
    if (newlink) {
      var link_urls = social_link_urls.concat([newlink]);
      setSocial_link_urls(link_urls);
      setNewLink("");
    }
  };

  const removelink = (e) => {
    var link = document.getElementById("link" + e.target.id).value;
    setSocial_link_urls(
      social_link_urls.filter((url) => {
        console.log(link_2_sitename(url) !== link_2_sitename(link));
        return link_2_sitename(url) !== link_2_sitename(link);
      })
    );
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

      <div className="details row">
        <div className="social_links col-md-6">
          <h3>SOCIAL LINKS</h3>
          {social_link_urls.map((social_link_url, id) => {
            return (
              <div className="row social_link" key={id}>
                <div className="col-md-1 social_icon">
                  <i
                    className={`fab fa-${link_2_sitename(social_link_url)}`}
                  ></i>
                </div>
                <div className="col-md-10 social_url_inp">
                  <input
                    id={"link" + id}
                    value={social_link_url}
                    type="text"
                    disabled
                  />
                </div>
                <div className="col-md-1 add-social-url">
                  <button id={id} onClick={removelink}>
                    -
                  </button>
                </div>
              </div>
            );
          })}

          {social_link_urls.length < 8 && (
            <div className="row social_link">
              <div className="col-md-1 social_icon">
                <i className={"fa fa-link"}></i>
              </div>
              <div className="col-md-10 social_url_inp">
                <input
                  type="text"
                  value={newlink}
                  onChange={(e) => {
                    setNewLink(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-1 add-social-url">
                <button onClick={add_social_link}>+</button>
              </div>
            </div>
          )}
        </div>

        <div className="notable-works col-md-6">
          <h3>NOTABLE WORKS</h3>

          <div className="notable_work1">
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Link" />
          </div>

          <div className="notable_work2">
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Link" />
          </div>

          <div className="notable_work3">
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Link" />
          </div>
          <button>save</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
