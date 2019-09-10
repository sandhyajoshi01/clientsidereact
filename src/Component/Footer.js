import React from "react";
import { MDBContainer, MDBFooter,MDBBtn,MDBIcon } from "mdbreact";
import 'mdbreact/dist/css/mdb.css';


const Footer = () => {
  return (
      <div className="footer-copyright text-center py-3 text-dark">
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
          <MDBContainer className="white">
              <a href="https://facebook.com" className="fa fa-ic mr-4 fa-lg" >
                  <MDBIcon fab icon="facebook-f" />
              </a>
              <a href="https://twitter.com" className="fa tw-ic mr-3 fa-lg">
                  <MDBIcon fab icon="twitter" />
              </a>
              <a href="https://instagram.com" className="fa ins-ic mr-3 fa-lg">
                  <MDBIcon fab icon="instagram" />
              </a>
              <a href="https://pinterest.com" className="fa pin-ic mr-3 fa-lg">
                  <MDBIcon fab icon="pinterest" />
              </a>
              <a href="https://youtube.com" className="fa yt-ic mr-3 fa-lg">
                  <MDBIcon fab icon="youtube" />
              </a>
          </MDBContainer>
          <MDBFooter  className="font-weight-bolder black-text">
          &copy; {new Date().getFullYear()}. Copyright: <a className="font-weight-bolder black-text"
            href="https://www.styleforyou.com"> styleforyou.com </a>
          </MDBFooter>
        </div>

  );
}

export default Footer;