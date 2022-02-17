import './App.css';
import { Component } from "react";

let handler; 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDapiReady: false
    };
  }

  linkBankAccount = () => {
    if (this.state.isDapiReady){
      handler.open()
    }
    else{
      console.log("Dapi not ready, try again")
    }
    
  }

  componentDidMount = () => {

    handler = window.Dapi.create({
      environment: window.Dapi.environments.sandbox, //or .production
      appKey: "YOUR_APP_KEY",
      countries: ["AE"],
      bundleID: "YOUR_BUNDLE_ID", 
      clientUserID: "CLIENT_USER_ID", 
      isCachedEnabled: true,
      isExperimental: false,
      clientHeaders: {},
      clientBody: {},
      onSuccessfulLogin: (bankAccount) => {
        let ba = bankAccount; 

        ba.data.getIdentity()
        .then((response)=>{
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
        
      },
      onFailedLogin: (err) => {
        if (err != null) {
          console.log("Error");
          console.log(err);
        } else {
          console.log("No error");
        }
      },
      onReady: () =>{
       this.setState({
         isDapiReady:true
        })
      },
      onExit: () => {
      console.log("User exited the flow")
    }
  });

}

render() {
  return (
    <div>
      <button onClick={this.linkBankAccount}>
        Link a Bank Account
        </button>
    </div>
  );
}
}


export default App;
