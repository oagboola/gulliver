import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';

import Login from '../components/Login/Login';
import './Home.css'

const HomeImage = styled.div`
  height: inherit;
  text-align: center
`

const ImageDescription = styled.div`
  height: 200px;
  font-weight: bold;
  text-align: center;
`

const PlacesHeader = styled.div`
  height: 100px;
  background-color: whitesmoke;
  margin-left: -15px;
  margin-right: -15px;
  text-align: center;
  font-size: 3em;
`;

const SiteImage = styled.div`
  height: 300px;
  text-align: center;
`

const Home = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={{span:8, offset:2}} className="loginWrapper">
            <Row className="homeRow">
              <Col sm={12} md={4} className="loginBox">
                <Login />
              </Col>
              <Col sm={12} md={8} className="homeContentWrap">
                <HomeImage>
                  <p className="mainSiteImageTitle">Kajuru Castle</p>
                  <Image src="images/kajuru.jpg" thumbnail className="mainSiteImage"/>
                  <ImageDescription>
                    <p>Location: Kaduna, Nigeria</p>
                    <p>Kajuru Castle is a luxury villa, built between the years 1981 and 1989, at Kajuru village in Kaduna State, Nigeria. It was built by a German expatriate in Nigeria, living in Kaduna at the time. </p>
                    <p>Learn More About the Kajuru Castle...</p>
                  </ImageDescription>
                </HomeImage>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <PlacesHeader>
              <p>Interesting Places near you</p>
            </PlacesHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={{span: 10, offset:1}}>
            <Row className="siteImagesWrapper">
              <Col xs={12} sm={3}>
                <SiteImage>
                  <Image src="images/kajuru.jpg" rounded width="350px"/>
                  <p>Kajuru Castle</p>
                </SiteImage>
              </Col>
              <Col xs={12} sm={3}>
                <SiteImage>
                  <Image src="images/kajuru.jpg" rounded width="350px"/>
                  <p>Kajuru Castle</p>
                </SiteImage>
              </Col>
              <Col xs={12} sm={3}>
                <SiteImage>
                  <Image src="images/kajuru.jpg" rounded width="350px"/>
                  <p>Kajuru Castle</p>
                </SiteImage>
              </Col>
              <Col xs={12} sm={3}>
                <SiteImage>
                  <Image src="images/kajuru.jpg" rounded width="350px"/>
                  <p>Kajuru Castle</p>
                </SiteImage>
              </Col>
              <Col xs={12} sm={3}>
                <SiteImage>
                  <Image src="images/kajuru.jpg" rounded width="350px"/>
                  <p>Kajuru Castle</p>
                </SiteImage>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home;
