import React from "react"
import SideBar from "../../components/SideBar"
import Form from 'react-bootstrap/Form';
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "../../components/NavBar"


const EditPage = () => {

return (
       <div>
 <SideBar/>
 <NavBar/>
 <div class="edit">
<Form>
 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Email address</Form.Label>
<Form.Control type="email" placeholder="name@example.com" />
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
 <Form.Label>Example textarea</Form.Label>
 <Form.Control type="email" placeholder="name@example.com" />
 </Form.Group>
 </Form>
 
</div>
      </div>
    )
}

export default EditPage