import React from 'react';

class Table extends React.Component {
    constructor(props){
        super(props);
        
        this.handleOnPressButton = this.handleOnPressButton.bind(this);
    }

    handleOnPressButton(el){
        const bookIndex = el.target.value;
        this.props.onSelectTitle(bookIndex);
    }

    generateRows(book, index){   
        const cellClass = 'text-left';     
        return (
            <tr key={'tr' + index} className={cellClass}>
                <td 
                    key={'td-title-' + index}                     
                >
                    <button 
                        key={'title-button'+index}
                        className={'btn btn-link nounderline'}
                        onClick={this.handleOnPressButton}
                        value={index}
                    >
                        {book.title}
                    </button>
                </td>
                <td key={'td-subtitle-'+index} className={cellClass} >{book.subtitle}</td>
                <td key={'td-isbn-'+index} className={cellClass} >{book.isbn13}</td>
                <td key={'td-price-'+index} className={cellClass} >{book.price}</td>
                <td key={'td-url-' + index} className={cellClass} ><a href={book.url}>{book.url}</a></td>
            </tr>
        );       
    }

    render(){
        
        const headers = ["Title","Subtitle","Isbn13", "Price", "URL"];
        const data = this.props.data;
        const maxRows = this.props.maxRows|0;
        const dataToDisplay = data? data.slice(0,maxRows):null;

        return (
            <table className={'table table-hover'}>
                <thead >
                    <tr>
                        {
                            headers?
                            headers.map( (el, index) => {
                                return <th key={'th-'+index} scope={'col'}>{el}</th>
                            })
                            :
                            null
                        }
                    </tr>
                </thead>
                <tbody>
                    {console.log(this.data)}
                    {
                        dataToDisplay?
                        dataToDisplay.map( (book, index) =>{
                            return this.generateRows(book, index)
                        })
                        :
                        null
                    }
                </tbody>
            </table>
        )
    }
}

/**
 *          "title": "Practical MongoDB",
            "subtitle": "Architecting, Developing, and Administering MongoDB",
            "isbn13": "9781484206485",
            "price": "$32.04",
            "image": "https://itbook.store/img/books/9781484206485.png",
            "url": "https://itbook.store/books/9781484206485"
 */

export default Table;