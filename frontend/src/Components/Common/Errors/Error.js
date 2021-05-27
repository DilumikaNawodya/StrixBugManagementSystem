import React from 'react';
import './Error.scss'

function Error({message})  {

    const handleError = () => {
        localStorage.clear()
        window.location.href = "/login"
    }

    return (
        <div id="notfound">
		    <div class="notfound">
                <div class="notfound-404">
                    <h1>Oops!</h1>
                    <h2>{message}</h2>
                </div>
			   <button class="btn btn-dark" onClick={handleError}>GO TO HOMEPAGE</button>
		    </div>
	    </div>
    )
}

export default Error;