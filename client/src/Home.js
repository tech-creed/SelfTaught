import "./styles/home.css";
import Icon1 from "./img/Land_Icon_1.png";
import Icon2 from "./img/Land_Icon_2.png";
import Shade from "./img/top_shade.png";
//import Logo from "./img/logo.png";

const LandingPage = () => {
  return (
    <div>
      <div className="topnav_images">
        <img id="top_shade" src={Shade} alt="Shade" />
      </div>

      <div className="Icon-Div">
        <div className="icon-1">
          <img src={Icon1} alt="icon_1" />
        </div>
        <div className="icon-1-1">
          <img src={Icon1} alt="icon_1_1" />
        </div>
        <div className="icon-2">
          <img src={Icon2} alt="icon_2" />
        </div>
        <div className="icon-2-2">
          <img src={Icon2} alt="icon_2_2" />
        </div>
      </div>

      <div className="main-content">
        <h1>Lorem Ispum</h1>
        <p>Proin egestas arcu scelerisque ligula dapibus laoreet. Phasellus</p>
        <p>non massa ac diam condimentum dictum. Curabitur suscipit</p>
        <p>eros gravida ultrices</p>
      </div>
    </div>
  );
};

export default LandingPage;
