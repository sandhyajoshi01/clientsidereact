import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter,MDBBtn,MDBIcon } from "mdbreact";
import 'mdbreact/dist/css/mdb.css';


const Footer = () => {
  return (
    <MDBFooter>
      <div className="footer-copyright text-center py-3">
          &copy; {new Date().getFullYear()} Copyright: <a className="text-dark" href="https://www.styleforyou.com"> styleforyou.com </a>
        </div>
    </MDBFooter>
  );
}

export default Footer;