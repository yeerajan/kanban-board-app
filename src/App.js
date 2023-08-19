import React from 'react';
import './App.css';
import KanbanBoard from './KanbanBoard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kanban Board App</h1>
      </header>
      <main>
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;
