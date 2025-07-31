import './app-info.css';

const AppInfo = (props) => {
  return (
    <div className="app-info">
      <h1>Учет сотрудниклв в компании</h1>
      <h2>Общее число сотрудников: {props.emplCount}</h2>
      <h2>Премию получат: {props.emplIncrCount}</h2>
    </div>
  );
}

export default AppInfo;