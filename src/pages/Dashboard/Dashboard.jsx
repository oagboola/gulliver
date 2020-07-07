import React, { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

import NoteList from '../../components/NoteList/NoteList';
import NoteEditor from '../../components/NoteEditor/NoteEditor';
import Map from '../../components/Map/Map';
import EntriesApi from '../../apis/entriesApi';
import { FirebaseContext } from '../../components/Firebase';
import UserContext from '../../contexts/UserContext';

const Dashboard = () => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const [notes, setNotes] = useState();
  const [currentEntry, setCurrentEntry] = useState({});
  const entriesApi = new EntriesApi(firebase);

  useEffect(() => {
    entriesApi.entries(user.uid).on('value', (snapshot) => {
      setNotes(snapshot.val());
    });
  }, [user, entriesApi]);

  const updateCurrNote = (selectedNote) => {
    setCurrentEntry(selectedNote);
  };

  const handleClick = () => {
    setCurrentEntry({});
  };

  return (
    <>
      <Container fluid style={{ height: 'calc(100% - 58px)' }}>
        <Row style={{ height: '100%' }}>
          <Col xs={2} style={{ border: '1px solid black' }}>
            {notes ? (
              <NoteList notes={notes} updateDisplayedNote={updateCurrNote} />
            ) : (
              <p>Retrieving your saved entries...</p>
            )}
          </Col>
          <Col xs={10} style={{ border: '' }}>
            <Tabs defaultActiveKey='note'>
              <Tab eventKey='note' title='Note'>
                <Button type='button' onClick={handleClick}>
                  Create New Entry
                </Button>
                <NoteEditor
                  currentEntry={currentEntry}
                  setCurrentEntry={setCurrentEntry}
                />
              </Tab>
              <Tab eventKey='map' title='Map'>
                <Map />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
