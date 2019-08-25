import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import  './Carousel.css';



const Carousel = () => {
  return (
    <MDBContainer >
      <MDBCarousel
      activeItem={1}
      length={5}
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
    >
      <MDBCarouselInner className="carousel-inner ">
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://upload.wikimedia.org/wikipedia/commons/2/26/Proenza_Schouler_MAC_Product.jpg"
              alt="First slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">MAC eyeshadows are here!</h3>

          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://d1jbmqjs327xbn.cloudfront.net/_pa/spaces-identity.icperfumes/nofolder-2018160/womens.jpg?w=1920"
              alt="Second slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Strong mask</h3>

          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://i.ytimg.com/vi/IRltGLEDgxE/maxresdefault.jpg"
              alt="Third slide"
            />
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Slight Mask</h3>

          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="4">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/f9902748010219.588b80d30e242.jpg"
                      alt="First slide"
                    />
                  <MDBMask overlay="black-light" />
                  </MDBView>
                  <MDBCarouselCaption>
                    <h3 className="h3-responsive">Hottest deals from NYX</h3>
                  </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="5">
                          <MDBView>
                            <img
                              className="d-block w-100"
                              src="https://www.thetrendspotter.net/wp-content/uploads/2017/10/Designer-Watches-for-Women.jpg"
                              alt="First slide"
                            />
                          <MDBMask overlay="black-light" />
                          </MDBView>
                          <MDBCarouselCaption>
                            <h3 className="h3-responsive">Light mask</h3>

                          </MDBCarouselCaption>
                        </MDBCarouselItem>

      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  );
}

export default Carousel;