import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Fire, Check, Check2Square, Globe2, Cup, X } from 'react-bootstrap-icons'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dishCards.css';
import Pagination from 'react-bootstrap/Pagination';

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

//обрабатываем много карт 
function DishCards({jsonData}){

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(jsonData.hits.length / itemsPerPage) || 1;

    if (!jsonData || !jsonData.hits) {
        return <p>Ошибка, нет данных</p>; 
      }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jsonData.hits.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div id="dishes">
      {jsonData.hits.length === 0 && <p>No results found.</p>}
      {currentItems.map((hit, index) => (
        <DishCard key={index} hit={hit.recipe} />
      ))}

      {totalPages > 1 && ( // Отображаем пагинацию только если есть несколько страниц
        <Pagination className='dish_paginator'>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

          {}
          {[...Array(totalPages)].map((page, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      )}
    </div>
  );

}

export default DishCards;