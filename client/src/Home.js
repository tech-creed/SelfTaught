import "./assets/styles/home.css";
import Icon1 from "./assets/images/Land_Icon_1.png";
import Icon2 from "./assets/images/Land_Icon_2.png";
import Shade from "./assets/images/top_shade.png";
import New_Pro from "./assets/images/new_pro.png";
import MCQ from "./assets/images/mcq.png";
import Blog_Img from "./assets/images/blob_pink.png";
import Gif_Incompatable from "./assets/images/incompatible.gif";
//import Logo from "./imgages/logo.png";

const LandingPage = () => {
  return (
    <div>
      <div className="topnav_images">
        <img id="top_shade" src={Shade} alt="Shade" />
      </div>
      <div className="system-view">
        <div className="landing_main_div">
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
            <h1>Teach Yourself</h1>
            <p id="main-content-para">
              Proin egestas arcu scelerisque ligula dapibus laoree
              <br /> Phasellus non massa ac diam condimentum <br />
              dictum Curabitur susc ipit eros gravida
              <br /> ultrices non massa ac diam
            </p>
            <div className="start_btn">
              <a href="/">Start</a>
            </div>
          </div>
        </div>

        <div className="landing_content">
          <div className="newbi-pro-background">
            <div className="container newbi-pro">
              <div className="newbi-pro-content">
                <h5>
                  Become a newbie to expert by watching youtube playlist on your
                  favourite topics and get certified by us
                </h5>
                <p>
                  <a href="/">Get Started</a>
                </p>
              </div>
              <img src={New_Pro} alt="new_pro" />
            </div>
          </div>

          <div className="mcq-test-background">
            <div className="container mcq-test">
              <div className="mcq-test-content">
                <h5>
                  Time to get your credentials for what you know by taking our
                  tests
                </h5>
                <p>
                  <a href="/">Take Test</a>
                </p>
              </div>
              <img src={MCQ} alt="new_pro" />
            </div>
          </div>

          <div className="blog-section">
            <div className="container blog-section">
              <div className="blog-section-content">
                <h5>What about learning from blogs? We have solution for it</h5>
                <p>
                  <a href="/">Start Read</a>
                </p>
              </div>
              <img src={Blog_Img} alt="gif" />
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-view">
        <h1>Our website is incompitable in this device</h1>
        <img src={Gif_Incompatable} alt="new_pro" />
      </div>
      <footer>
        <div className="f-icons">
          <a href="/">
            <i className="fab fa-github fa-2x"></i>
          </a>
          <a href="/">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a href="/">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
          <a href="/">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
          <a href="/">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        </div>
        <div className="copyright">
          <div>&copy;&nbsp;Copyrights TechCreed - 2021</div>
          <div className="our-link">
            <a
              href="https://tech-creed.netlify.com"
              rel="noreferrer"
              target="_blank"
            >
              Tech Creed
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
