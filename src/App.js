import logo from './logo.svg';
import './styles/main.scss';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <img src="/icons/icon-72.png" alt=""/>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="light-background">
        <h1>hello</h1>
        <h2>hello</h2>
        <h3>hello</h3>
        <h4>hello</h4>
        <h5>hello</h5>
        <h6>hello</h6>
        <p className="button-link">here is a <a>link</a></p>
        </div>
      </header>
    </div>
  );
}

export default App;
