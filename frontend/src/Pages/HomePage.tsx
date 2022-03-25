import * as React from 'react'
import './HomePage.css'
import peopleImage from '../images/pexels-tima-miroshnichenko-6615107_edited.png'

function HomePage() {
    return (
        <div className='horizontalContainer'>
            <section className="leftContainer">
                <div>
                    <h1 className='highlighted title'>Find Intreating Events</h1>
                    <div className='content'>
                        <span>
                            <p>Tempore quae molestias aliquid voluptas <br />animi ut aut asperiores minima.</p>
                        </span>
                        <span>
                            <input type="button" value="See Events" />
                        </span>
                    </div>
                </div>
            </section>

            <section className="rightContainer">
                <div>
                    <img id="peopleImage" src={peopleImage} />
                </div>
            </section>
        </div>
    )
}

export default HomePage;