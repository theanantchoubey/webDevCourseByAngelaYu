import React from "react";
import Card from "./card";
import contacts from "../contacts";
import Avatar from "./Avatar";

function createCard(contact){
  return <Card 
    key={contact.id}
    num={contact.id}
    name={contact.name}
    imgURL={contact.imgURL}
    phone={contact.phone}
    email={contact.email}
  />
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Avatar 
        img="https://media-exp1.licdn.com/dms/image/C4D03AQFZNRHG2nTLWQ/profile-displayphoto-shrink_400_400/0/1631547001986?e=1665619200&v=beta&t=sKzYWmTp1moTcU9CzBpUA0DABA5Iz00A81v-6qMq_PQ"
      />

      {contacts.map(createCard)}
      {/* <Card
        name={contacts[0].name}
        imgURL={contacts[0].imgURL}
        phone={contacts[0].phone}
        email={contacts[0].email}
      />
      <Card
        name={contacts[1].name}
        imgURL={contacts[1].imgURL}
        phone={contacts[1].phone}
        email={contacts[1].email}
      />
      <Card
        name={contacts[2].name}
        imgURL={contacts[2].imgURL}
        phone={contacts[2].phone}
        email={contacts[2].email}
      /> */}
    </div>
  );
}

export default App;
