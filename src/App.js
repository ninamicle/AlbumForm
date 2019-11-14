import React from 'react';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import './App.css';
import Main from './componenti/main';
import {Link} from 'react-router-dom';

function App() {
  return (
    
    <div className="content">
    <Layout>
        <Header style={{background:'red'}} title="Pokemon" scroll>
            <Navigation>
                <Link to="/myprofile">MyProfile</Link>
                <Link to="/LoginForm">Login</Link>
                <Link to="/pokedex">Pokedex</Link>
            </Navigation>
        </Header>
        <Drawer title="Pokemon">
            <Navigation>
            <Link to="/myprofile">MyProfile</Link>
            <Link to="/LoginForm">Login</Link>
            <Link to="/pokedex">Pokedex</Link>
            </Navigation>
        </Drawer>
        <Content>
            <div className="page-content" />
            <Main/>
        </Content>
    </Layout>
</div>
    
  );
}

export default App;
