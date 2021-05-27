import React from 'react';
import './Preloader.scss'

function Preloader() {
    return (
        <>
        <div class="container-pre">
            <div class="coast">
                <div class="wave-rel-wrap">
                    <div class="wave"></div>
                </div>
            </div>
            <div class="coast delay">
                <div class="wave-rel-wrap">
                    <div class="wave delay"></div>
                </div>
            </div>
            <div class="text text-w">S</div>
            <div class="text text-a">T</div>
            <div class="text text-v">R</div>
            <div class="text text-e">I</div>
            <div class="text text-s">X</div>

            

        </div>
        <div style={{backgroundColor: 'rgba(0,0,0,0.8)', zIndex: '10', position: 'absolute', height: '100%', overflow: 'hidden', width: '100%', top: '-10px', right: '0px'}}></div>
        </>
    )
}

export default Preloader;