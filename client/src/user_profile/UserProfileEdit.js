import dummy_usr_img from "./assets/images/dummy_user.png";
import design_1 from "./assets/images/design30.png";
import design_2 from "./assets/images/design18.png";
import "./assets/styles/userprofileedit.css";
import { useState } from "react";

const UserProfileEdit = () => {
  const [proimg, setProImg] = useState(dummy_usr_img);

  const [social_link_urls, setSocial_link_urls] = useState([]);
  const [newlink, setNewLink] = useState("");

  const [notable_works, setNotableWorks] = useState([]);
  const [notable_work_title, setNotableWorkTitle] = useState("");
  const [notable_work_link, setNotableWorkLink] = useState("");

  const [works, setWorks] = useState([]);
  const [newworktitle, setNewWorkTitle] = useState("");
  const [newworkdesc, setNewWorkDesc] = useState("");
  const [newworklink, setNewWorkLink] = useState("");
  const [isnewcurrent, setIsNewCurrent] = useState(false);

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

  const remove_my_work = (e) => {
    var link = document.getElementById("work-link-" + e.target.id).value;
    setWorks(
      works.filter((work) => {
        return work.work_link !== link;
      })
    );
  };

  const remove_notable_works = (e) => {
    var link = document.getElementById("note-link-to" + e.target.id).value;
    setNotableWorks(
      notable_works.filter((notable_work) => {
        return notable_work.note_work_link !== link;
      })
    );
  };

  const add_notable_work = () => {
    if (notable_work_title && notable_work_link) {
      var not_work = notable_works.concat([
        {
          note_work_title: notable_work_title,
          note_work_link: notable_work_link,
        },
      ]);
      setNotableWorks(not_work);
      setNotableWorkLink("");
      setNotableWorkTitle("");
    }
  };

  const add_my_work = () => {
    if (newworktitle && newworkdesc && newworklink) {
      var user_works = works.concat([
        {
          work_title: newworktitle,
          work_desc: newworkdesc,
          work_link: newworklink,
          is_current: isnewcurrent,
        },
      ]);

      setWorks(user_works);
      setNewWorkLink("");
      setNewWorkDesc("");
      setIsNewCurrent(false);
      setNewWorkTitle("");
    }
  };

  return (
    <div className="profile-edit-main">
      <img id="background-design1" src={design_1} alt="" />
      <div className="container user-profile-edit">
        <h1 id="p_edit_heading">USER PROFILE EDIT</h1>
        <div className="row basic-details">
          <div className="col-md-3 profile-img">
            <img src={proimg} alt="user" />
          </div>

          <div className="col-md-9 names-bio">
            <form action="" method="post">
              <div className="details">
                <div className="row">
                  <div className="inp-field col-md-6">
                    <div className="lable">FUll Name</div>
                    <input type="text" />
                  </div>
                  <div className="inp-field col-md-6">
                    <div className="lable">Username</div>
                    <input type="text" />
                  </div>
                </div>
                <div className="inp-field">
                  <div className="lable">Your Role</div>
                  <input type="text" placeholder="seperate with , " />
                </div>
                <div className="inp-field">
                  <div className="lable">Bio</div>
                  <textarea rows="6" type="text"></textarea>
                </div>
              </div>

              <div className="form-btns">
                <label
                  htmlFor="uploaded_profile_img"
                  className="upload-profile-img-label"
                >
                  <i class="fas fa-upload"></i>
                  &nbsp;Upload Profile Picture
                </label>
                <input
                  type="file"
                  name="uploaded_profile_img"
                  id="uploaded_profile_img"
                  onChange={profileimg_uploaded}
                  hidden
                />
                <p>Update to Save</p>
                <button type="submit">SAVE</button>
              </div>
            </form>
          </div>
        </div>
        <hr></hr>
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
                      <i id={id} className={"fa fa-minus"}></i>
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
                  <button onClick={add_social_link}>
                    <i className={"fa fa-plus"}></i>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="notable-works col-md-6">
            <h3>NOTABLE WORKS</h3>

            {notable_works.length > 0 &&
              notable_works.map((notable_work, index) => {
                return (
                  <div className="row notable_work">
                    <div className="col-md-5">
                      <div className="lable">Title</div>
                      <input
                        type="text"
                        value={notable_work.note_work_title}
                        disabled
                      />
                    </div>
                    <div className="col-md-5">
                      <div className="lable">Link</div>
                      <input
                        id={"note-link-to" + index}
                        type="text"
                        value={notable_work.note_work_link}
                        disabled
                      />
                    </div>

                    <div className="col-md-1 add-notable-btn">
                      <div className="lable">&nbsp;</div>
                      <button id={index} onClick={remove_notable_works}>
                        <i id={index} className={"fa fa-minus"}></i>
                      </button>
                    </div>
                  </div>
                );
              })}

            {notable_works.length < 3 && (
              <div className="row notable_work">
                <div className="col-md-5">
                  <div className="lable">Title</div>
                  <input
                    type="text"
                    value={notable_work_title}
                    onChange={(e) => {
                      setNotableWorkTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-5">
                  <div className="lable">Link</div>
                  <input
                    type="text"
                    value={notable_work_link}
                    onChange={(e) => {
                      setNotableWorkLink(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-1 add-notable-btn">
                  <div className="lable">&nbsp;</div>
                  <button onClick={add_notable_work}>
                    <i className={"fa fa-plus"}></i>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="notable_work_save">
            <p>Saved!</p>
            <button>SAVE</button>
          </div>
          <hr></hr>
          <img id="background-design2" src={design_2} alt="" />
          <h3>MY WORKS</h3>
          {works.length > 0 &&
            works.map((work, index) => {
              return (
                <div className="row my-works">
                  <div className="row my_works_url_title">
                    <div className="work_title col-md-4">
                      <div className="lable">Work Title</div>
                      <input type="text" value={work.work_title} disabled />
                    </div>
                    <div className="work_descriptiopn col-md-4">
                      <div className="lable">Work URL</div>
                      <input
                        type="text"
                        id={"work-link-" + index}
                        value={work.work_link}
                        disabled
                      />
                    </div>
                    <div class="switch-toggle col-md-2">
                      <div className="lable">Working</div>
                      <input
                        type="checkbox"
                        id="currently_working"
                        checked={work.is_current}
                      />
                      <label htmlFor="currently_working"></label>
                    </div>

                    <div className="col-md-2">
                      <div className="lable">&nbsp;</div>
                      <button type="submit" onClick={remove_my_work}>
                        <i id={index} className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="lable">Work Description</div>
                    <div className="work_descriptiopn">
                      <textarea disabled>{work.work_desc}</textarea>
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="row my-works">
            <div className="row my_works_url_title">
              <div className="work_title col-md-5">
                <div className="lable">Work Title</div>
                <input
                  type="text"
                  value={newworktitle}
                  onChange={(e) => {
                    setNewWorkTitle(e.target.value);
                  }}
                />
              </div>
              <div className="work_descriptiopn col-md-5">
                <div className="lable">Work URL</div>
                <input
                  value={newworklink}
                  type="text"
                  onChange={(e) => {
                    setNewWorkLink(e.target.value);
                  }}
                />
              </div>
              <div class="switch-toggle col-md-2">
                <div className="lable">Working</div>
                <input
                  type="checkbox"
                  id="currently_working_1"
                  onChange={(e) => {
                    if (isnewcurrent) {
                      setIsNewCurrent(false);
                    } else {
                      setIsNewCurrent(true);
                    }
                  }}
                  checked={isnewcurrent}
                />
                <label htmlFor="currently_working_1"></label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="lable">Work Description</div>
              <div className="work_descriptiopn">
                <textarea
                  onChange={(e) => {
                    setNewWorkDesc(e.target.value);
                  }}
                  value={newworkdesc}
                ></textarea>
              </div>
            </div>
            <div className="add_word_save_btn">
              <button onClick={add_my_work}>Add To Your Works</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
