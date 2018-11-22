import React from 'react';
import styled from 'styled-components';

const SigninForm = styled.div`
    display: flex,
    justify-content: center;

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
`;


class Signin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value} );
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignin = () => {
    console.log(this.state);
    fetch('https://warm-bayou-58598.herokuapp.com/signin' , {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then( response => response.json())
    .then( user => {
      console.log('user detail: ',user);
      if(user.id){
        this.props.loadUser(user);
        this.props.onRouteChange('home');
        console.log('login success');
      }else{
        this.props.onRouteChange('signin');
        console.log('user / password do not match')
      }

    })
    // .then( data  =>
    //   {
    //     switch (data) {
    //       case 'success':
    //         this.props.onRouteChange('home');
    //         console.log('login success');
    //         break;
    //       default:
    //         this.props.onRouteChange('signin');
    //         console.log('no user and password');
    //     }
    //   // if(data === 'success'){
    //   //   console.log('success');
    //   //   this.props.onRouteChange('home');
    //   // }
    // })

    //this.props.onRouteChange('home');

  }

  render(){
    return(
        <SigninForm>
            <section>
              <div>
                  <h3>Sign in Form</h3>
                  <div>
                    <input
                    type='email'
                    name='email'
                    placeholder="Email Address"
                    onChange={this.onEmailChange}/>
                  </div>
                  <div>
                    <input
                    type='password'
                    name='password'
                    placeholder="Password"
                    onChange={this.onPasswordChange}
                    />
                  </div>
                  <div>
                    <button onClick={this.onSubmitSignin} >Sign In</button>
                  </div>
              </div>
            </section>
        </SigninForm>
      );
  }
}


// const Signin = ({onRouteChange}) => {
//   return(
//     <SigninForm>
//         <section>
//           <div>
//               <h3>Sign in Form</h3>
//               <div>
//                 <input type='email' name='email' placeholder="Email Address" />
//               </div>
//               <div>
//                 <input type='password' name='password'  placeholder="Password"/>
//               </div>
//               <div>
//                 <button onClick={() => onRouteChange('home')} >Sing In</button>
//               </div>
//           </div>
//         </section>
//     </SigninForm>
//   );
// }

export default Signin;
