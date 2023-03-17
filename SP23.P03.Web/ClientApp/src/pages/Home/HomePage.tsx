import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import './HomePage.css';

export function HomePage(): React.ReactElement {
    return (
        <div>
            <h2 className="slogan"> 
                Let's Get You Entrack
            </h2>

            <div className='info-box-position'>
            <Segment compact emphasis padded
            className="info-box">
                <Header>
                    Why Choose EnTrack?
                </Header>

                <p className="info-box-content">
                We strive to make your experience traveling
                the best that it can be! At much cheaper prices,
                and an easier experience, let us be the first
                option you think of to journey to your next
                vacation!
                </p>

            </Segment>
            </div>
            
        </div>
    );
}