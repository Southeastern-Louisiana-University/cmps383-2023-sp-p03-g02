import React from 'react';
import { useUser } from '../../components/AuthProvider';
import { Button, Divider, Grid, Header, Icon, Input, Segment } from 'semantic-ui-react';
import './HomePage.css';
//import { TrainOne } from '../../assets/train01.jpg';

export function HomePage(): React.ReactElement {
    const user = useUser();

    return (
        <div className='home-page'>
            
            <h2 className="slogan"> 
                Let's Get {user?.userName ?? "You"} Entrack
            </h2>

            <div className="container-center">
                <Segment padded className="resizing">
                    <Grid columns={2} stackable container textAlign='center'>

                        <Divider vertical>
                             <Icon name="arrow right"/>
                        </Divider>

                        <Grid.Row>
                            <Grid.Column>
                                <h1 className="box-header"> Starting From: </h1>
                                <Input type="text" placeholder="New Orleans" />
                            </Grid.Column>

                            <Grid.Column>
                                <h1 className="box-header"> Going To: </h1>
                                <Input type="text" placeholder="Houston" />
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Segment>
            </div>
            
            <div className="btn-center">
                <Button content="Book Now!" />
            </div>

            <div className="boxes-center">
                <Segment basic className="resizing">
                    <Grid columns={3} stackable
                    textAlign='left'>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment padded className="info-box">
                                    
                                    <Header>
                                        Why Choose EnTrack?
                                    </Header>

                                    <p>
                                        We strive to make your traveling
                                        experience enjoyable and convenient. 
                                        Here at EnTrack, we take the stress out
                                        of booking your trip.
                                    </p>
                                </Segment>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment padded className="info-box">
                                    <Header>
                                        Download the App!
                                    </Header>

                                    <p>
                                        With our mobile app, traveling has never been
                                        easier! View all your trip information on the
                                        go, as well as pull up your tickets anytime and
                                        anywhere!
                                    </p>
                                </Segment>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment padded className="info-box">
                                    <Header>
                                        Why Wait?
                                    </Header>

                                    <p>
                                        Let's get you EnTrack and headed to your
                                        next destination. All you have to do is 
                                        click book now and we'll take it from
                                        there!
                                    </p>
                                </Segment>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>

        </div>
    );
}