import React from 'react';
import BookstoreContainer from './BookstoreContainer';


class Card extends React.Component {

    render(){
        const book = this.props.book;
        return (
                <div className={"card"}>
                    {
                        book.image?
                        <img src={book.image} className="card-img-top" alt="..." />
                        :
                        'Waiting resource'
                    }                    
                    <div className={"card-body"}>
                        <h5 className={"card-title"}>{book.title}</h5>                     
                    </div>
                </div>            
        )
    }
}

export default Card;