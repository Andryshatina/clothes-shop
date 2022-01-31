import React from 'react';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./components/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import './App.css';
import { Route, Routes } from "react-router-dom";
import { auth } from './firebase/firebase.utils'
import { createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from 'react-redux'
import { setCurrentUser } from "./redux/user/user.action";


class App extends React.Component {

    unsubscribeFromAuth = null

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
            if(userAuth){
                const userRef = await createUserProfileDocument(userAuth)

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    })
                })
            } else {
                setCurrentUser(userAuth)
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    render () {
        return(
            <div>
              <Header />
              <Routes>
                  <Route exact path='/' element={<HomePage/>}/>
                  <Route path='/shop' element={<ShopPage/>}/>
                  <Route path='/signin' element={<SignInAndSignUpPage/>}/>
              </Routes>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
