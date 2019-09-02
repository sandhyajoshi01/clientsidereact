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
      <MDBCarouselInner className="carousel-inner">
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img
              className="d-block w-100"
              src="https://www.colorbarcosmetics.com/images/xtimeless-banner-desktop-new.jpg.pagespeed.ic.wWyoNsXmLW.jpg"
              alt="First slide"
            />
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Perfect way to age gracefully!</h3>
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
            <h3 className="h3-responsive"></h3>
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
            <h3 className="h3-responsive"></h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="4">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src="http://cdn3.bigcommerce.com/s-4ix8x54f/product_images/uploaded_images/dior-eyewear-ad-advertisement-campaign-spring-2014-the-impression-02.jpg?t=1425857499"
                      alt="First slide"
                    />
                  <MDBMask overlay="black-light" />
                  </MDBView>
                  <MDBCarouselCaption>
                    <h3 className="h3-responsive">Hottest deals from DIOR</h3>
                  </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="5">
                          <MDBView>
                            <img
                              className="d-block w-100"
                              src="https://www.photigy.com/school/wp-content/uploads/2018/12/4-67.jpg"
                              alt="First slide"
                            />
                          <MDBMask overlay="black-light" />
                          </MDBView>
                          <MDBCarouselCaption>
                            <h3 className="h3-responsive"></h3>
                          </MDBCarouselCaption>
                        </MDBCarouselItem>

      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  );
}

export default Carousel;