import { Carousel } from 'antd';

function UncontrolledExample() {
  return (
    <Carousel autoplay>
      <div>
        <h3 className="text-white">First slide label</h3>
        <p className="text-white">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
      <div>
        <h3 className="text-white">Second slide label</h3>
        <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div>
        <h3 className="text-white">Third slide label</h3>
        <p className="text-white">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </div>
    </Carousel>
  );
}

export default UncontrolledExample;

import { Carousel, Typography, Row, Col } from 'antd';
import reviewBackgroundImg from '../components/images/testimonials-bg.jpg';

const { Title, Paragraph } = Typography;

function Testimonials() {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <Title className="text-center text-primary text-3xl mb-4">This is The Awesome</Title>
        <Title className="text-center text-primary text-2xl">Customers had to Say!</Title>
      </div>
      <Row justify="center" className="mt-8">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Carousel autoplay className="shadow-xl">
            <div>
              <Paragraph className="text-center text-gray-700">
                "Genny has such beautiful macrame work and the quality is really spectacular. She has a craftsmanship and precision you don't learn by simply watching YouTube videos. Shipping was super fast, especially considering this was a custom piece. Thanks again Genny! I wear them everyday."
              </Paragraph>
              <Paragraph className="text-center font-semibold">Eric Stever</Paragraph>
              <Paragraph className="text-center">June 20th, 2022</Paragraph>
            </div>
            <div>
              <Paragraph className="text-center text-gray-700">"Beautiful Piece"</Paragraph>
              <Paragraph className="text-center font-semibold">Kim Miller</Paragraph>
              <Paragraph className="text-center">July 13th, 2022</Paragraph>
            </div>
            <div>
              <Paragraph className="text-center text-gray-700">"That was a gift for my boyfriend and he really liked it! Good quality and fast shipping! Thanks!"</Paragraph>
              <Paragraph className="text-center font-semibold">Genevieve Quellet</Paragraph>
              <Paragraph className="text-center">Nov 8th, 2021</Paragraph>
            </div>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

