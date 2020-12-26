import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";
import backend from "./services/backend";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({
    content: null,
    type: null,
  });

  useEffect(() => {
    updatePeople();
  }, []);

  const updatePeople = () => {
    backend.getAll().then((data) => {
      setPersons(data);
    });
  };

  const resetInfo = () => {
    setNewName("");
    setNewNumber("");
  };

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage({ content: null, type: null });
    }, 5000);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const person = persons.find((object) => object.name === newName);
    //Updates phone number for existing person
    if (
      person &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      backend
        .updatePerson({ ...person, number: newNumber })
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            )
          );
          showMessage({
            content: "Successfully updated number",
            type: "success",
          });
        })
        .catch(() => {
          showMessage({
            content: `Information of ${person.name} has already been removed from server`,
            type: "error",
          });
          setPersons(
            persons.filter((originalPerson) => originalPerson.id !== person.id)
          );
        });
      resetInfo();
      return;
    }
    //Checks to make sure both fields are filled out
    if (!newName || !newNumber) {
      alert(`Please fill in both fields`);
      return;
    }
    //Adds a new person since person doesn't exist (otherwise caught by first if statement)
    const newObject = { name: newName, number: newNumber };
    backend.newPerson(newObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      showMessage({
        content: "Added new person",
        type: "success",
      });
      resetInfo();
    });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteHandler = (person) => {
    if (window.confirm(`Really delete ${person.name}?`)) {
      backend.deletePerson(person.id).then((response) => {
        if (response.status === 200) {
          showMessage({
            content: "Successfully deleted",
            type: "success",
          });
          updatePeople();
        }
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.content} type={message.type} />
      <Filter
        filter={filter}
        filterChangeHandler={(event) => setFilter(event.target.value)}
      />
      <h2>Add new person</h2>
      <Form
        submitHandler={submitHandler}
        nameChangeHandler={(event) => setNewName(event.target.value)}
        newNumber={newNumber}
        newName={newName}
        numberChangeHandler={(event) => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person
          key={person.name}
          person={person}
          deleteHandler={deleteHandler}
        />
      ))}
    </div>
  );
};

export default App;
