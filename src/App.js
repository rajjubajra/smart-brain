import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Registration from './components/Registration/Registration';
import './App.css';

//page background particle effects
const particleOptions =
  {
    particles: {
      line_linked: {
        shadow: {
          enable: true,
          color: "#008de5",
          blur: 1
        }
      }
    }
  }




const intialStat =  {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      issSignIn: false,
      entries: '',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor(){
    super();
    this.state =  intialStat;
  }

  // componentDidMount(){
  //   fetch('http://localhost:5000')
  //   .then( response => response.json())
  //   .then( data => console.log(data))
  //   // and .then(console.log) is same
  // }

  loadUser = (data)=> {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }})
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(intialStat);
    }else{
      this.setState({issSignIn: true})
    }

    this.setState({route: route});
  }

  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      //console.log(width, height);
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow:  clarifaiFace.top_row * height,
        rightCol: width - ( clarifaiFace.right_col - width),
        bottomRow: height - (clarifaiFace.bottom_row - height)
      }

  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onImageSubmit = () => {
    console.log('click button', this.state.user.id, this.state.input);
    this.setState({imageUrl: this.state.input});
      fetch('https://shielded-fortress-55781.herokuapp.com/imageUrl', {
        method: 'post',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://shielded-fortress-55781.herokuapp.com:5000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               //id: '123',
                id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log);

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  pageRoute = (nav) => {
    switch (nav) {
      case 'signin':
        return <Signin
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
                />
        break;
      case 'register':
        return <Registration
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
                />
        break;
      case 'home':
        return(
        <div>
          <Rank
            name   ={this.state.user.name}
            entries={this.state.user.entries}
          />
          <ImageLinkForm
             onInputChange={this.onInputChange}
             onImageSubmit={this.onImageSubmit}
          />
          <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
        </div>
        )
        break;
      default:
      return `Error: route note fount`;
    }
  }



  render() {
    return (
      <div className="App">
      <Particles className='particles'  params={particleOptions} />
        <Navigation route={this.state.route} onRouteChange={this.onRouteChange}/>
        <Logo />
        {  this.pageRoute(this.state.route)  }
      </div>
    );
  }
}

export default App;
