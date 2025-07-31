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
      term: '',
      filter: 'all'
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

  searchedEmpl = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;
    });
  }

  filteredEmpl = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'salary':
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }
  }

  onUpdateSearch = (term) => {
    this.setState({ term });
  }

  onChangeFilter = (filter) => {
    this.setState(({ filter }));
  }

  render() {
    const { data, term, filter } = this.state;
    const emplCount = data.length;
    const emplIncrCount = data.filter(item => item.increase === true).length;
    const visibleData = this.filteredEmpl(this.searchedEmpl(data, term), filter)

    return (
      <div className="app">
        <AppInfo emplCount={emplCount} emplIncrCount={emplIncrCount} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onChangeFilter={this.onChangeFilter} />
        </div>

        <EmployeesList data={visibleData} onDelete={this.deleteItem} onToggleProp={this.onToggleProp} />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;