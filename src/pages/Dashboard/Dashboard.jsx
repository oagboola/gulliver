import React, { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

import NoteList from '../../components/NoteList/NoteList'
import PlacesList from '../../components/PlacesList/PlacesList'
import NoteEditor from '../../components/NoteEditor/NoteEditor';
import Map from '../../components/Map/Map';
import EntriesApi from '../../apis/entriesApi';
import { FirebaseContext } from '../../components/Firebase';
import UserContext from '../../contexts/UserContext';
import PlacesApi from '../../apis/placesApi';

const Dashboard = () => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const placesApi = new PlacesApi(firebase);
  const entriesApi = new EntriesApi(firebase);

  const [notes, setNotes] = useState();
  const [currentEntry, setCurrentEntry] = useState({});
  const [selectedTab, setSelectedTab] = useState('note');
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 6.5236,lng: 3.6006});
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    entriesApi.entries(user.uid).on('value', (snapshot) => {
      setNotes(snapshot.val())
    })
    placesApi.places(user.uid).on('value', (snapshot) => {
      setLocations(snapshot.val() || [])
    })
  }, [user]);

  const updateCurrNote = (selectedNote) => {
    setCurrentEntry(selectedNote);
  };

  const handleClick = () => {
    setCurrentEntry({});
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  }

  return (
     <>
       <Container fluid style={{height:'calc(100% - 58px)'}}>
         <Row style={{height: '100%'}}>
           <Col xs={2} style={{border:'1px solid black'}}>
           {
             selectedTab === 'note' ?
              notes ?
                <NoteList notes={notes} updateDisplayedNote={updateCurrNote}/> : <p>Retrieving your saved entries...</p>
              : <PlacesList locations={locations} setMapCenter={setMapCenter} setZoom={setZoom}/>
           }
           </Col>
           <Col xs={10}  style={{border:''}}>
             <Tabs activeKey={selectedTab} onSelect={handleTabClick}>
               <Tab eventKey="note" title="Note" >
                 <Button type="button" onClick={handleClick}>Create New Entry</Button>
                 <NoteEditor currentEntry={currentEntry} setCurrentEntry={setCurrentEntry}/>
               </Tab>
               <Tab eventKey="map" title="Map">
                 <Map locations={locations} mapCenter={mapCenter} setMapCenter={setMapCenter} zoom={zoom} setZoom={setZoom}/>
               </Tab>
             </Tabs>
           </Col>
         </Row>
       </Container>
     </>
  )
}

export default Dashboard;
