import React from 'react';
import styled from 'styled-components';

const RegistrationFrom = styled.div`
    display: flex,
    justify-content: center;
    margin: 15px;

    > section > div{
      border: 1px solid #ccc;
      max-width: 300px;
      margin: 0px auto;
    }

    > section > div > div > input{
      width: 200px;
      font-size: 1rem;
      padding: 3px 2px;
      margin: 4px;
    }

    > section> div> div > button {
      font-size: 1rem;
      background-color: #eee;
      padding: 5px 20px;
      border: 1px solid #ccc;
      margin: 10px 0px 30px 0px;
      cursor: pointer;
    }
   > section > div > div > p {
     cursor: pointer;
   }
`;

class Registration extends React.Component{
  constructor(){
    super();
    this.state = {
      email: '',
      pass: '',
      name: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  onNamChange = (event) => {
    this.setState({name: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({pass: event.target.value})
  }

  onRegisterSubmit = () => {
    console.log(this.state);
    fetch('https://warm-bayou-58598.herokuapp.com/register', {
      method: 'post',
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        pass: this.state.pass,
        name: this.state.name
      })
    })
    .then( response => response.json())
    .then( user => {
        if(user.id){
          console.log('user: ', user.id);
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
    })
    .catch(console.log);
  }


  render(){
    return(
      <RegistrationFrom>
          <section>
            <div>
                <h3>Registration Form</h3>
                <div>
                  <input
                    type='text'
                    name='name'
                    placeholder="Name"
                    onChange={this.onNamChange}
                  />
                </div>
                <div>
                  <input
                    type='email'
                    name='email'
                    placeholder="Email Address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div>
                  <input
                    type='password'
                    name='pass'
                    placeholder="Password"
                    onChange={this.onPasswordChange}
                  />
                </div>
                <div>
                  <button
                    onClick={this.onRegisterSubmit}>
                    Submit
                  </button>
                </div>
                <div>
                  <p onClick={() => this.props.onRouteChange('signin')}>Sign In</p>
                </div>
            </div>
          </section>
      </RegistrationFrom>
    );
  }
}


// const Registration = ({onRouteChange}) => {
//   return(
//     <RegistrationFrom>
//         <section>
//           <div>
//               <h3>Registration Form</h3>
//               <div>
//                 <input type='text' name='name' placeholder="Name" />
//               </div>
//               <div>
//                 <input type='email' name='email' placeholder="Email Address" />
//               </div>
//               <div>
//                 <input type='password' name='password'  placeholder="Password"/>
//               </div>
//               <div>
//                 <button>Submit</button>
//               </div>
//               <div>
//                 <p onClick={()=>onRouteChange('signin')}>Sign In</p>
//               </div>
//           </div>
//         </section>
//     </RegistrationFrom>
//   );
// }


export default Registration;
