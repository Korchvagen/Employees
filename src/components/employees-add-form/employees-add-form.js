import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      salary: ''
    }
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.name.length < 3 || +this.state.salary <= 0) {
      return;
    }

    this.props.onAdd(this.state.name, this.state.salary);
    this.setState({
      name: '',
      salary: ''
    });
  }

  render() {
    const { name, salary } = this.state;
    return (
      <div className="app-add-form">
        <h3>Добавьте сотрудника</h3>
        <form className="add-form d-flex" onSubmit={this.handleSubmit}>
          <input type="text"
            className="form-control new-post-label"
            placeholder="Как его зовут?"
            name="name"
            value={name}
            onChange={this.onValueChange} />
          <input type="number"
            className="form-control new-post-label"
            placeholder="З/П в $?"
            name="salary"
            value={salary}
            onChange={this.onValueChange} />

          <button type="submit"
            className="btn btn-outline-light">Добавить</button>
        </form>
      </div>
    );
  }
}

export default EmployeesAddForm;