import React from 'react';
import './Bookstore.css';

import Card from './Card';

class Modal extends React.Component {

    render(){
        const showModal = this.props.showModal;
        const modalClass = showModal?'modal show':'hidden';
        const book = this.props.book;
        return (            
            <React.Fragment>
                <div className={modalClass} >
                    <div className={'modal-dialog'}>
                        <div className={'modal-content'}>
                            <div className={'modal-header'}>
                                <h5 className={'modal-title'}>                                    
                                    Book Description
                                </h5>
                                <button type="button" className={'btn-close'}  onClick={this.props.close} ></button>
                            </div>
                            <div className='modal-body'>
                                {
                                    book?
                                    <Card book={book} />
                                    :
                                    'Not info provided'
                                }    

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;