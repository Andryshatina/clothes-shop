import React from 'react';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./components/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import './App.css';
import { Route, Routes } from "react-router-dom";
import { auth } from './firebase/firebase.utils'
import { createUserProfileDocument } from "./firebase/firebase.utils";


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
            if(userAuth){
                const userRef = await createUserProfileDocument(userAuth)

                userRef.onSnapshot(snapshot => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    }, () => console.log(this.state))
                })
            } else {
                this.setState({currentUser: userAuth})
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    render () {
        return(
            <div>
              <Header currentUser={this.state.currentUser}/>
              <Routes>
                  <Route exact path='/' element={<HomePage/>}/>
                  <Route path='/shop' element={<ShopPage/>}/>
                  <Route path='/signin' element={<SignInAndSignUpPage/>}/>
              </Routes>
            </div>
        )
    }
}

export default App;
