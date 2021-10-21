import React from 'react';

import './Bookstore.css';
import {arrayRange} from '../../utils/Utils';

class Pagination extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage : 1,
            selected : 'page-item active',
            range: {start:0, end:10},
        }

        this.handleOnPressPageButton = this.handleOnPressPageButton.bind(this);
        this.handleOnPressMoveButton = this.handleOnPressMoveButton.bind(this);
        this.getNumberPage = this.getNumberPage.bind(this);        
    }

    handleOnPressPageButton(el){
        const selectedPage = el.target.value;
        this.setState({currentPage:Number(selectedPage)});
        this.updateVisiblePages(selectedPage);
        this.props.setSelectedPage(selectedPage);
    }

    handleOnPressMoveButton(el){
        const move = el.target.value;
        const currentPage = this.state.currentPage;
        const newPage = this.getNumberPage(move, currentPage);
        this.setState({currentPage:Number(newPage)});
        this.updateVisiblePages(newPage);
        this.props.setSelectedPage(newPage);
    }
    
    getNumberPage(move, currentPage){
        let newPage = 0;
        const totalPages = this.props.totalPages;
        if(move === 'previous'){
            let page = currentPage - 1;
            newPage = page > 0 ? page:1;
        }else if(move === 'next'){
            let page = currentPage + 1;
            newPage = page <= totalPages ? page:totalPages;

        }
        return newPage
    }

    updateVisiblePages(newPage){
        const range = this.state.range;
        const offset = 10;
        let newStart = range.start;
        let newEnd = range.end;
        if(newPage > range.end){
            newStart = range.end;
            newEnd = newStart + offset;
        } else if (newPage <= range.start && newPage > offset){
            newStart = range.start - offset;
            newEnd = newStart + offset;
        } else if (newPage <= offset) {
            newStart = 0;
            newEnd = offset;
        }
        const newRange = {start:newStart, end: newEnd};
        this.setState({range:newRange});
    }

    render(){
        const totalPages = this.props.totalPages;
        const pagesNumbers = arrayRange(1, totalPages);//Array.from(Array(totalPages).keys());
        const selected = this.state.selected;
        const currentPage = this.state.currentPage;
        const range = this.state.range;
        const visiblePages = pagesNumbers.slice(range.start, range.end);
        
        return (
            <nav className={'page navigation'}>
                <ul className={'pagination justify-content-center'}>
                    <li>
                        <button 
                            className="page-link" 
                            value={'previous'}
                            onClick={this.handleOnPressMoveButton}
                        >
                            Previous
                        </button>
                    </li>
                    {
                        visiblePages.map((page)=>{
                            return (
                                <li 
                                    className={Number(currentPage) === page ? selected:'page-item'} 
                                    key={'li'+page}
                                >
                                    <button 
                                        className="page-link" 
                                        value={page}
                                        onClick={this.handleOnPressPageButton}
                                    >
                                        {page}
                                    </button>
                                </li>
                            )
                        })
                    }
                    <button 
                        className="page-link" 
                        value={'next'}
                        onClick={this.handleOnPressMoveButton}
                    >
                        Next
                    </button>
                </ul>
            </nav>
        )
    }
}


export default Pagination;