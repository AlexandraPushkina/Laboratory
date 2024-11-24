import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Fire, Check, Check2Square, Globe2, Cup, X} from 'react-bootstrap-icons'; 
import './dishCard.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function emblemForVegan(hit){
    if (hit.healthLabels.find((i) => i === "Vegetarian") != -1 ){  //FIXME: возможно ошибка
    return (<Col sm={2}>
        <Check2Square size={20}/> 
      </Col>)
    }
    else  
    return (<Col sm={2}>
        <X size={20}/> 
      </Col>);
    
}

function noticeForVegan(hit){
    if (hit.healthLabels.find((i) => i === "Vegetarian") != -1 ){  //FIXME: возможно ошибка
        return 'Yes';
        }
        else  'No';
}


function dishCard(){
    return(
       <Card className='dishCard'>
       <Card.Body>
       <Card.Img className='imgCard mb-0' variant="top" src={hit.images} />
         <Card.Title className='mb-2'>
           {hit.title}
         </Card.Title>
         <Card.Subtitle className='mb-1'>
           <Row className='m-2'>
             <Col sm={2}>
               <Cup size={20}/> 
             </Col>
             <Col sm={10} className='mt-1'>
               Meal type: {hit.mealType} ({hit.dishType});
             </Col>
           </Row>
         </Card.Subtitle>

         <ListGroup variant="flush">
           <ListGroup.Item>
             <Row>
            <Col sm={2}>
                <Globe2 size={20}/> 
            </Col>
            <p>Cuisine: {hit.cuisineType}</p>
            <Col sm={2}>
                <Fire size={20}/> 
            </Col>
                <Col sm={10} className='mt-1'>
                <b>Calories: {hit.calories}</b>
            </Col>
             </Row>
             <Row>
             <Col sm={2}>
                 {emblemForVegan} 
               </Col>
               <Col sm={10} className='mt-1'>
                 <b>For vegan: {noticeForVegan} </b>
               </Col>
             </Row>
           </ListGroup.Item>

           <ListGroup.Item>   
             <Row>
               <Col sm={2}>
                 <Check size={20}/> 
               </Col>
               <Col sm={10} className='mt-1'>
                 <b>Share link: {hit.shareAs} </b>
               </Col>
             </Row>
           </ListGroup.Item>
           
         </ListGroup>
       </Card.Body>
     </Card>
    );
 }
  
export default dishCard;
 