import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import DoctorHeader from "../../Component/DoctorHeader";
import DoctorFooter from "../../Component/DoctorFooter";
function DoctorHome() {
    return (
        <div>
            <DoctorHeader />
            {/* Header part end*/}
            {/* banner part start*/}
            <section className="banner_part">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-xl-5">
                            <div className="banner_text">
                                <div className="banner_text_iner">
                                    <h5>We care for your heart</h5>
                                    <h1>Heart Disease Prediction <br /> Using Retinal Imaging</h1>
                                    <p>Our advanced technology uses retinal imaging to predict heart diseases with precision. Early detection can save lives and improve health outcomes.</p>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="banner_img">
                                <img src="/img/banner_img.png" alt="Retinal Scan" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* banner part end*/}
            {/* about us part start*/}
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
            {/* about us part end*/}
            {/* feature_part start*/}
            <section className="feature_part">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8">
                            <div className="section_tittle text-center">
                                <h2>Our Services</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-3 col-sm-12">
                            <div className="single_feature">
                                <div className="single_feature_part">
                                    <span className="single_feature_icon"><img src="/img/icon/feature_2.svg" alt="Retinal Scan" /></span>
                                    <h4>Retinal Imaging</h4>
                                    <p>State-of-the-art retinal imaging technology to analyze eye health and predict heart conditions.</p>
                                </div>
                            </div>
                            <div className="single_feature">
                                <div className="single_feature_part">
                                    <span className="single_feature_icon"><img src="/img/icon/feature_2.svg" alt="Early Detection" /></span>
                                    <h4>Early Detection</h4>
                                    <p>Identify potential heart diseases early to enable timely intervention and treatment.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className="single_feature_img">
                                <img src="/img/service.png" alt="Technology" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <div className="single_feature">
                                <div className="single_feature_part">
                                    <span className="single_feature_icon"><img src="/img/icon/feature_2.svg" alt="Heart Monitor" /></span>
                                    <h4>Heart Monitoring</h4>
                                    <p>Comprehensive monitoring solutions to track heart health and provide actionable insights.</p>
                                </div>
                            </div>
                            <div className="single_feature">
                                <div className="single_feature_part">
                                    <span className="single_feature_icon"><img src="/img/icon/feature_2.svg" alt="Consultation" /></span>
                                    <h4>Expert Consultation</h4>
                                    <p>Access to experienced cardiologists for personalized care and guidance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* feature_part end*/}
            {/* our department part start*/}
            <section className="our_depertment section_padding">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-xl-12">
                            <div className="depertment_content">
                                <div className="row justify-content-center">
                                    <div className="col-xl-8">
                                        <h2>Our Departments</h2>
                                        <div className="row">
                                            <div className="col-lg-6 col-sm-6">
                                                <div className="single_our_depertment">
                                                    <span className="our_depertment_icon"><img src="/img/icon/feature_2.svg" alt="Cardiology" /></span>
                                                    <h4>Cardiology</h4>
                                                    <p>Specialized care for heart-related conditions and diseases.</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-sm-6">
                                                <div className="single_our_depertment">
                                                    <span className="our_depertment_icon"><img src="/img/icon/feature_2.svg" alt="Retina" /></span>
                                                    <h4>Retinal Imaging</h4>
                                                    <p>Advanced imaging techniques to assess eye and heart health.</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-sm-6">
                                                <div className="single_our_depertment">
                                                <span className="our_depertment_icon"><img src="/img/icon/feature_2.svg" alt="Retina" /></span>
                                                    <h4>Diagnostics</h4>
                                                    <p>Comprehensive diagnostic services for accurate health assessments.</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-sm-6">
                                                <div className="single_our_depertment">
                                                    <span className="our_depertment_icon"><img src="/img/icon/feature_2.svg" alt="Prevention" /></span>
                                                    <h4>Prevention</h4>
                                                    <p>Programs and guidance to prevent heart diseases and maintain a healthy lifestyle.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* our department part end*/}

            <DoctorFooter />
        </div>
    );
}

export default DoctorHome;
