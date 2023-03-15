import React from 'react';
import { Image } from 'semantic-ui-react';
import HomeLogo from '../../assets/EnTrack_HomeLogo.png'
import './HomePage.css';

export function HomePage(): React.ReactElement {
    return (
        <div className='home-page'>
            <header> Let's Get You... </header>
            
            <Image src={HomeLogo} size='large' />
        </div>
    );
}