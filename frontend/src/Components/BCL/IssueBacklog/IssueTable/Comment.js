import React from 'react';
import {Container} from 'react-bootstrap';
import pp from './pp.jpg';
import './Comment.css';

function Comment(){
    return(
        <div>
            <h5>Comments</h5>
            <hr></hr>
            <div style={{display:'flex'}}>
                <img src={pp} width='50px' height='100%' style={{margin:'10px', border:'1px solid #cecece'}}/>
                <div>
                    <a href='#profile' style={{fontWeight:'strong'}}>Dilumika</a>
                    <p style={{margin:'0px 0px 5px'}}>This is the comment</p>
                    
                    <p className='Reply'>Reply</p>
                    
                    
                </div>

            </div>
        </div>
    )
}
export default Comment; 