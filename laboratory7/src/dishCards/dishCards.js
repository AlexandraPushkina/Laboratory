import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Fire, Check, Check2Square, Globe2, Cup, X } from 'react-bootstrap-icons'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './dishCards.css';

function emblemForVegan(hit) {
  if (hit && hit.healthLabels && hit.healthLabels.includes("Vegetarian")) {
      return <Check2Square size={20} />;
  } else {
      return <X size={20} />;
  }
}

function noticeForVegan(hit) {
  if (hit && hit.healthLabels && hit.healthLabels.includes("Vegetarian")) {
      return 'Yes';
  } else {
      return 'No';
  }
}

//заполняем 1 карту
function DishCard({hit}){
    return(
       <Card className='dishCard'>
       <Card.Body>
         <Card.Title className='mb-2'>
           {hit.label}
         </Card.Title>
         <ListGroup variant="flush">

         <ListGroup.Item>
         <Row className='m-2'>
            <Col sm={2}>
              <Cup size={20}/> 
            </Col>
            <Col sm={10} className='mt-1'>
              <b>Meal type: {hit.mealType[0]}</b>
            </Col>
          </Row>


          <Row className='m-2'>
            <Col sm={2}>
              <Globe2 size={20}/> 
            </Col>
            <Col sm={10} className='mt-1'>
              <p>Cuisine: {hit.cuisineType[0]}</p>
            </Col>
            </Row>

            <Row className='m-2'>
              <Col sm={2}>
                <Fire size={20}/> 
              </Col>
                <Col sm={10} className='mt-1'>
                <p>Calories: {Math.round(Number(hit.calories))}</p>
              </Col>
            </Row>
             
            <Row className='m-2'>
              <Col sm={2}>
                {emblemForVegan(hit)} 
              </Col>
              <Col sm={10} className='mt-1'>
                <p>For vegan: {noticeForVegan(hit)} </p>
              </Col>
            </Row>

           </ListGroup.Item>
           <ListGroup.Item>   
             <Row>
               <Col sm={2}>
                 <Check size={20}/> 
               </Col>
               <Col sm={10} className='mt-1'>
                 <b>Share link: <a href={hit.shareAs}> {hit.shareAs}</a> </b>
               </Col>
             </Row>
           </ListGroup.Item>

         </ListGroup>
       </Card.Body>
     </Card>
    );
 }

//обрабатывать много карт 
function DishCards({jsonData}){

    if (!jsonData || !jsonData.hits) {
        return <p>Ошибка, нет данных</p>; //Обработка ошибок
      }

    return (
        <div id="dishes">
            {jsonData.hits.map((hit, index) => (
                <DishCard key={index} hit={hit.recipe}/>
            ))}
        </div>
    )
}

export default DishCards;