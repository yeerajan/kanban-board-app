import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('user');
  const [sortingOption, setSortingOption] = useState('priority');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.quicksell.co/v1/internal/frontend-assignment'
      );
      setTickets(response.data.tickets);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const groupAndSortTickets = () => {
    let groupedTickets = {};
    tickets.forEach((ticket) => {
      const key = groupingOption === 'user' ? ticket.userId : groupingOption;
      if (!groupedTickets[key]) {
        groupedTickets[key] = [];
      }
      groupedTickets[key].push(ticket);
    });

    // Sort the grouped tickets based on sorting option
    for (const key in groupedTickets) {
      groupedTickets[key].sort((a, b) => {
        if (sortingOption === 'priority') {
          return b.priority - a.priority;
        } else if (sortingOption === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }

    return groupedTickets;
  };

  const handleGroupingChange = (event) => {
    setGroupingOption(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  const groupedAndSortedTickets = groupAndSortTickets();

  return (
    <div>
      <div className='display'>
            <strong>Group by:</strong>
            <select value={groupingOption} onChange={handleGroupingChange}>
            <option value="user">User</option>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
            </select>
            <strong>Sort by:</strong>
            <select value={sortingOption} onChange={handleSortingChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
            </select>
      </div>
      <div className="kanban-board">
            {/* Render the grouped and sorted tickets */}
            {Object.keys(groupedAndSortedTickets).map((groupKey) => (
            <div key={groupKey} className="column">
                <h3>{groupKey}</h3>
                {groupedAndSortedTickets[groupKey].map((ticket) => (
                <div key={ticket.id} className="ticket">
                    <p>{ticket.id}</p>
                    <h5>{ticket.title}</h5>
                    <p>Priority: {ticket.priority}</p>
                    <p>{ticket.tag}</p>
                </div>
                ))}
            </div>
            ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
