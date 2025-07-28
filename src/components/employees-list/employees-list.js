import EmployeesListItem from "../employees-list-item/employees-list-item";
import './employess-list.css';

const EmployeesList = () => {
  return (
    <ul className="app-list list-group">
      <EmployeesListItem/>
      <EmployeesListItem />
      <EmployeesListItem />
    </ul>
  );
}

export default EmployeesList;