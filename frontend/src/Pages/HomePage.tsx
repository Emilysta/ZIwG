import * as React from 'react'
import { BlendedCircle } from 'Components/BlendedCircle'
import './HomePage.scss'
import peopleImage from '../images/pexels-tima-miroshnichenko-6615107_edited.png'
import { ButtonLink } from '../Components/ButtonLink'

function HomePage() {
    return (
        <div className='wholePageLayout homePage'>
            <div className="leftContainer">
                <div>
                    <h1 className='highlighted title'>Find Interesting Events</h1>
                    <div className='content'>
                        <p>Tempore quae molestias aliquid voluptas <br />animi ut aut asperiores minima.</p>
                        <ButtonLink className='overrideLinkButton' to='/events'>See Events</ButtonLink>
                    </div>
                </div>
                <BlendedCircle id="circle-2" size={260} left="min(680px, 60vw)" bottom="-40vh" />
                <img id="peopleImage" src={peopleImage} alt='' />
            </div>
        </div>
    )
}

export default HomePage;