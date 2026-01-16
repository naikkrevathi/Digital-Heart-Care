import { Login } from "@mui/icons-material";
import LogoutButton from "./LogoutButton";

function DoctorHeader() {
    const handleLogout = () => {
        // Perform logout logic here, e.g., clear tokens, redirect to login page, etc.
        localStorage.removeItem('userId'); // Remove userId from local storage
        window.location.href = '/'; // Redirect to the login page or home page
    }
  return (
<header className="main_menu home_menu">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-12">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/patient/home"> <img src="/img/logo.png" alt="logo" /> </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse main-menu-item justify-content-center" id="navbarSupportedContent">
              <ul className="navbar-nav align-items-center">
                <li className="nav-item active">
                  <a className="nav-link" href="/doctor/home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/doctor/about">about</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/doctor/add-patient-symptoms">Add Symptoms</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/doctor/add-ecg">Add ECG</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/doctor/add-echo">Add ECHO</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/doctor/add-tmt">Add TMT</a>
                </li>
              
                <li className="nav-item">
                  <a className="nav-link" href="/doctor/settings">Settings</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={handleLogout}>Logout</a>
                </li>
          
              </ul>
            </div>
           
          </nav>
        </div>
      </div>
    </div>
  </header>
  );
}

export default DoctorHeader;