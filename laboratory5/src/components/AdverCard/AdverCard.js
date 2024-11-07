import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Tag, PersonCheck , Check2Square, Phone} from 'react-bootstrap-icons'; 
import './AdverCard.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BikeWeltRaven from './BikeWeltRaven.png';

const adver = {
    title: 'Bike Welt Raven 2.1 HD 29 (2024)',
    price: '700$',
    customer: 'Johm Matters',
    location: 'Cheshire Street, London',
    condition: 'used',
    phone: '+290065909',
    image_url: ''
}

function AdverCard(){
    return(
       <Card className='adverCard'>
       <Card.Body>
       <Card.Img className='imgCard mb-0' variant="top" src={BikeWeltRaven} />
         <Card.Title className='mb-2'>
           {adver.title}
         </Card.Title>
         <Card.Subtitle className='mb-1'>
           <Row className='m-2'>
             <Col sm={2}>
               <Tag size={20}/> 
             </Col>
             <Col sm={10} className='mt-1'>
               Price: {adver.price}
             </Col>
           </Row>
         </Card.Subtitle>
         <ListGroup variant="flush">
           <ListGroup.Item>
             <Row>
               <Col sm={2}>
                 <PersonCheck size={20}/> 
               </Col>
               <Col sm={10} className='mt-1'>
                 <b>Customer: {adver.customer}</b>
                 <p>Location: {adver.location}</p>
               </Col>
             </Row>
             <Row>
               <Col sm={2}>
                 <Check2Square size={20}/> 
               </Col>
               <Col sm={10} className='mt-1'>
                 <b>Condition: {adver.condition} </b>
               </Col>
             </Row>
           </ListGroup.Item>
           <ListGroup.Item>
             
             <Row>
               <Col sm={2}>
                 <Phone size={20}/> 
               </Col>
               <Col sm={10} className='mt-1'>
                 <b>For communication: {adver.phone} </b>
               </Col>
             </Row>
           </ListGroup.Item>
         </ListGroup>
       </Card.Body>
     </Card>
    );
 }
 
 export default AdverCard;