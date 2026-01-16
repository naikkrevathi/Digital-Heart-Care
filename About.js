import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
function About() {
  return (
   <>
   <Header/>
<section className="breadcrumb_part breadcrumb_bg">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="breadcrumb_iner">
          <div className="breadcrumb_iner_item">
            <h2>about us</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section className="about_us padding_top">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-6 col-lg-6">
                            <div className="about_us_img">
                                <img src="/img/top_service.png" alt="Heart Health" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-5">
                            <div className="about_us_text">
                                <h2>About Us</h2>
                                <p>We specialize in leveraging retinal imaging to predict heart diseases. Our mission is to provide cutting-edge solutions for early detection and prevention of cardiovascular conditions.</p>
                              
                                <div className="banner_item">
                                    <div className="single_item">
                                        <img src="/img/icon/banner_1.svg" alt="Emergency" />
                                        <h5>Emergency Care</h5>
                                    </div>
                                   
                                    <div className="single_item">
                                        <img src="/img/icon/banner_3.svg" alt="Qualified" />
                                        <h5>Qualified Experts</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            

<Footer/>



   </>
  );
}

export default About;