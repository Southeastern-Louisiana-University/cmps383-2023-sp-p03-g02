import React from 'react';
import { Image } from 'semantic-ui-react';
import HomeLogo from '../../assets/EnTrack_HomeLogo.png'
import { useUser } from '../../components/AuthProvider';
import './HomePage.css';

export function HomePage(): React.ReactElement {
    const user = useUser();

    return (
        <div className='home-page'>
            <header> Let's Get {user?.userName ?? "You"}... </header>
            
            <Image src={HomeLogo} size='large' />
        </div>
    );
}