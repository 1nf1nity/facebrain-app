import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButttonSubmit }) => {
    return (
        <div>
            <p className='f3 white'>
                {'This brain can detect faces. Give it a try.'}
            </p>
            <div className='center form pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70' type='text' onChange={onInputChange}/>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onButttonSubmit}>detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;