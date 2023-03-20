import React from 'react';
import { Image } from 'semantic-ui-react';
import HomeLogo from '../../assets/EnTrack_HomeLogo.png'
import { useUser } from '../../components/AuthProvider';
import { Grid, Header, Segment } from 'semantic-ui-react';
import './HomePage.css';

export function HomePage(): React.ReactElement {
    const user = useUser();

    return (
        <div className='home-page'>
            <header> Let's Get {user?.userName ?? "You"}... </header>
            
            <Image src={HomeLogo} size='large' />
        <div>
            <h2 className="slogan"> 
                Let's Get You Entrack
            </h2>

            <main className="grid-position">
            <Grid container class='ui center aligned'>
                <Grid.Row columns={3}>

                    <Grid.Column>
                        <Segment compact emphasis padded
                        className="info-box">
                            <Header>
                                Why Choose EnTrack?
                            </Header>

                            <p className="info-box-content">
                            We strive to make your traveling experience
                            the best that it can be. At much cheaper prices,
                            and an easier experience, let us be your first
                            option!
                            </p>

                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment compact emphasis padded
                        className="info-box">
                            <Header>
                                Download the App!
                            </Header>

                            <p className="info-box-content">
                            With our mobile app, traveling has never been
                            easier! View all your trip information on the
                            go, as well as pull up your tickets anytime and
                            anywhere!
                            </p>

                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment compact emphasis padded
                        className="info-box">
                            <Header>
                                Why Wait?
                            </Header>

                            <p className="info-box-content">
                            Let's get you EnTrack and headed to your
                            next destination. All you have to do is 
                            click book now and we'll take it from
                            there!
                            </p>

                        </Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
            </main>

        </div>
    );
}