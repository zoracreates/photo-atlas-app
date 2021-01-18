import Navbar from './components/navigation/Navbar';
import './styles/main.scss';

function App(props) {
  return (
    <>
      <Navbar />  {/* will add links to the Navbar compoenet*/}

      <main>
        <div className={`container`}>
          {props.children} {/* this is where routes will be*/}
        </div>
      </main>
      
      <footer>
        <div className={`container`}>
          <p>&copy; PhotoAtlas 2021</p>
          <p className={`caption`}>
            All photographs and their titles/metadata on PhotoAtlas are copyrighted and owned by 
            their respective owners (the photographers) and not by PhotoAtlas. As such Photo Atlas does 
            not grant any licenses to any copyrights, patents or any other intellectual property rights.
          </p>
        </div>
      </footer>
      
    </>
  );
}

export default App;
