import React from 'react';
import { useUser } from '../../components/AuthProvider';
import { Divider, Grid, Header, Segment } from 'semantic-ui-react';
import './HomePage.css';
import RoutePlanner from '../../components/RoutePlanner/RoutePlanner';

const TrainOne = require('../../assets/train01.jpg');
const MobilePhone = require('../../assets/lookingatphone.png');
const TrainTwo = require('../../assets/choochoo.jpg');

export function HomePage(): React.ReactElement {
    const user = useUser();

    /*
    * need to change route to
    * /route-planning/${fromStationId}/${toStationId}/${departure}/${arrival}/${travelClass}
    * but for now....its fine lol
    */

    return (
        <div className='home-page'>
            
            <div className="header-box">
                <h2 className="slogan"> 
                    Let's Get {user?.userName ?? "You"} EnTrack
                </h2>
            </div>

            <RoutePlanner />

            <div className="boxes-center">
                <Segment basic className="resizing">
                    <Grid columns={3} stackable
                    textAlign='left'>

                        <Grid.Row>
                            <Grid.Column>
                                <Segment padded inverted className="info-box">
                                    <div>
                                        <img src={TrainOne} alt="train" width={200} />
                                    </div>

                                    <Divider />

                                    <Header className="header-style">
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
                                <Segment padded inverted className="info-box">
                                    <div>
                                        <img src={MobilePhone} alt="mobile app" width={200} height={150} />
                                    </div>

                                    <Divider />

                                    <Header className="header-style">
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
                                <Segment padded inverted className="info-box">
                                    <div>
                                        <img src={TrainTwo} alt="Hammond station" width={200} />
                                    </div>

                                    <Divider />

                                    <Header className="header-style">
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