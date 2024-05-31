import React from 'react';
import './App.css';
import ExpenseTrackerForm from './components/ExpenseTrackerForm';
import ShowList from './components/ShowList';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const HomeRedirect = () => {
  console.log('Redirecting to /home');
  return <Navigate to="/home" replace />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<HomeRedirect />} /> */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path='/Form' element={< ExpenseTrackerForm onClose={() => { }} />}></Route>
          <Route path='/home' element={< ShowList />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
