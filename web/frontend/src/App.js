import { useEffect, useState } from "react";
import Authentication from "./Components/Authentication/Authentication";

import MyContext from "./context";

import Header from "./Components/MainSections/Header";
import Content from "./Components/MainSections/Content";

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [UID, setUID] = useState('');

  useEffect(()=>{
  },[UID])

  return (
  <MyContext.Provider value={{UID,setUID}} >
    <div className="App">
      {
      !authenticated ? <Authentication props={{setAuthenticated}}/>
      :
      <>
        {authenticated=='unauthenticated' ? <Header isAuthenticated={false} setAuthenticated={setAuthenticated}/> : <Header isAuthenticated={true} setAuthenticated={setAuthenticated}/>}

        {authenticated=='unauthenticated' ? <Content isAuthenticated={false}/> : <Content isAuthenticated={true}/>}

      </>
      }
    </div>
  </MyContext.Provider>


  );
}

export default App;