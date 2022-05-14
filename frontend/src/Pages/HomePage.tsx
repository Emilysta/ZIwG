import * as React from 'react'
import { BlendedCircle } from 'Components/BlendedCircle'
import './HomePage.scss'
import peopleImage from '../images/pexels-tima-miroshnichenko-6615107_edited.png'
import { ButtonLink } from '../Components/ButtonLink'

function HomePage() {
    return (
        <div className='wholePageLayout homePage'>
            <div className='horizontalContainer'>
                <section className="leftContainer">
                    <div>
                        <h1 className='highlighted title'>Find Interesting Events</h1>
                        <div className='content'>
                            <span>
                                <p>Tempore quae molestias aliquid voluptas <br />animi ut aut asperiores minima.</p>
                            </span>
                            <span>
                                <ButtonLink className='centered' to='/events'>See Events</ButtonLink>
                            </span>
                        </div>
                    </div>
                    <BlendedCircle id="circle-2" size={260} left="min(680px, 60vw)" bottom="-40vh" />
                    <img id="peopleImage" src={peopleImage} />
                </section>
            </div>
        </div>
    )
}

export default HomePage;