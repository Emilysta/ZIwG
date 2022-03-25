import * as React from 'react'
import './HomePage.css'
import peopleImage from '../images/pexels-tima-miroshnichenko-6615107_edited.png'

function HomePage() {
    return (
        <div className='wholePageLayout'>
            <div className='horizontalContainer'>
                <section className="leftContainer">
                    <div>
                        <h1 className='highlighted title'>Find Interesting Events</h1>
                        <div className='content'>
                            <span>
                                <p>Tempore quae molestias aliquid voluptas <br />animi ut aut asperiores minima.</p>
                            </span>
                            <span>
                                <input type="button" className='centered' value="See Events" />
                            </span>
                        </div>
                    </div>
                </section>

                <section className="rightContainer">
                    <img id="peopleImage" src={peopleImage} />
                </section>
            </div>
        </div>
    )
}

export default HomePage;