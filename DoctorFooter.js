function DoctorFooter() {
    return (
      <footer className="footer-area">
      <div className="footer section_padding">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-2 col-md-4 col-sm-6 single-footer-widget">
              <a href="#" className="footer_logo"> <img src="/img/logo.png" alt="#" /> </a>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
              <div className="social_logo">
                <a href="#"><i className="ti-facebook" /></a>
                <a href="#"> <i className="ti-twitter" /> </a>
                <a href="#"><i className="ti-instagram" /></a>
                <a href="#"><i className="ti-skype" /></a>
              </div>
            </div>
            <div className="col-xl-2 col-sm-6 col-md-4 single-footer-widget">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Department</a></li>
                <li><a href="#"> Online payment</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Department</a></li>
              </ul>
            </div>
            <div className="col-xl-2 col-sm-6 col-md-4 single-footer-widget">
              <h4>Explore</h4>
              <ul>
                <li><a href="#">In the community</a></li>
                <li><a href="#">IU health foundation</a></li>
                <li><a href="#">Family support </a></li>
                <li><a href="#">Business solution</a></li>
                <li><a href="#">Community clinic</a></li>
              </ul>
            </div>
            <div className="col-xl-2 col-sm-6 col-md-6 single-footer-widget">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Lights were season</a></li>
                <li><a href="#"> Their is let wherein</a></li>
                <li><a href="#">which given over</a></li>
                <li><a href="#">Without given She</a></li>
                <li><a href="#">Isn two signs think</a></li>
              </ul>
            </div>
            <div className="col-xl-3 col-sm-6 col-md-6 single-footer-widget">
              <h4>Newsletter</h4>
              <p>Seed good winged wherein which night multiply
                midst does not fruitful</p>
              <div className="form-wrap" id="mc_embed_signup">
                <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01" method="get" className="form-inline">
                  <input className="form-control" name="EMAIL" placeholder="Your Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your Email Address '" required type="email" />
                  <button className="click-btn btn btn-default text-uppercase"> <i className="ti-angle-right" />
                  </button>
                  <div style={{position: 'absolute', left: '-5000px'}}>
                    <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabIndex={-1} defaultValue type="text" />
                  </div>
                  <div className="info" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright_part">
        <div className="container">
          <div className="row align-items-center">
            <p className="footer-text m-0 col-lg-8 col-md-12">{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright © All rights reserved | Heart Disease <i className="ti-heart" aria-hidden="true" /> 
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </p>
            <div className="col-lg-4 col-md-12 text-center text-lg-right footer-social">
              <a href="#"><i className="ti-facebook" /></a>
              <a href="#"> <i className="ti-twitter" /> </a>
              <a href="#"><i className="ti-instagram" /></a>
              <a href="#"><i className="ti-skype" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    );
  }
  
  export default DoctorFooter;