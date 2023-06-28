//import '../common/template/dependences';
import React from 'react';

import Header from '../common/template/header';
import SideBar from '../common/template/sideBar';
import Footer from '../common/template/footer';
import Messages from "../common/msg/messages";

export default function App(props) {
    return (
        <div className='wrapper'>
            <Header />
            <SideBar />
            <div className='content-wrapper'>
                {props.children}
            </div>
            <Footer />
            <Messages />
        </div>
    )
}