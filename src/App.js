import './App.css';
import { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '9f11d3a03339446e8de9765e7044547c'
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: null
      }
    }

    this.particlesParams = {
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 800
          }
        }
      }
    }
  }

  render() {
    const { isSignedIn, imageUrl, route, box, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={this.particlesParams} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          route === 'home' 
          ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButttonSubmit={this.onButttonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box}/>
          </ div>           
          : (
            route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }

  calculateFaceLocation = (regions) => {
    const clarifaiFace = regions[0].region_info.bounding_box;

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);


    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButttonSubmit = () => {
    const { input } = this.state;
    this.setState({ imageUrl: input })

    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response.outputs[0].data.regions)))
      .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({ route: route });
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }
  
}

export default App;
