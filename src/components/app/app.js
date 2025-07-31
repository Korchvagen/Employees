import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "John C.", salary: 800, increase: true, rise: true, id: uuidv4() },
        { name: "Alex M", salary: 3000, increase: false, rise: false, id: uuidv4() },
        { name: "Carl W.", salary: 5000, increase: true, rise: false, id: uuidv4() },
      ],
      term: ''
    }
  }

  deleteItem = (id) => {
    this.setState(({ data }) => ({
      data: data.filter(item => item.id !== id)
    }));
  }

  addItem = (name, salary) => {
    const employe = {
      name,
      salary,
      increase: false,
      rise: false,
      id: uuidv4()
    };

    this.setState(({ data }) => ({
      data: [...data, employe]
    }));
  }

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }

        return item;
      })
    }));
  }

  searchEmpl = (employees, term) => {
    if(term.length === 0) {
      return employees;
    }

    return employees.filter(employe => {
      return employe.name.indexOf(term) > -1;
    });
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  render() {
    const {data, term} = this.state;
    const emplCount = data.length;
    const emplIncrCount = data.filter(item => item.increase === true).length;
    const visibleData = this.searchEmpl(data, term);

    return (
      <div className="app">
        <AppInfo emplCount={emplCount} emplIncrCount={emplIncrCount} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter />
        </div>

        <EmployeesList data={visibleData} onDelete={this.deleteItem} onToggleProp={this.onToggleProp} />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;