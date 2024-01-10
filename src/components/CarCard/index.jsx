import 'bootstrap/dist/css/bootstrap.min.css'
import {Col, Card, Button, Row, Container} from 'react-bootstrap/';
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";


const CarCard = () => {

    return (
  <div className="car-list">
   
         <Container >
         <Row >
         <Col>
         <Card >
           <Card.Img src="" variant="top" alt="jiakhh" />
           <Card.Body>
             <Card.Title>Nama/Tipe Mobil</Card.Title>
             <Card.Text>
               Some quick example text to build on the card title and make up the
               bulk of the card's content.
             </Card.Text>
             <Button>Delete</Button>
             <Button variant="primary">Edit</Button>
           </Card.Body>
         </Card>
         </Col>
         </Row>
         </Container>
        
   
   
        </div>
    )
}

export default CarCard