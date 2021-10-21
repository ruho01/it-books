import React from "react";
import './Bookstore.css';

import SearchInput from "./SearchInput";
import Table from "./Table";
import Pagination from './Pagination';
import Selector from "./Selector";
import Modal from './Modal';

import findBook from './../../services/bookstoreApi';
import {arrayRange, exporToExcel} from "../../utils/Utils";

class BookstoreContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            foundBooks :  [],
            currentKeyword: '',
            currentPage: 1,
            resultPerPage:10,
            maxResultPerpage:10,
            selectedBook:{},
            showModal:false,         
        }

        this.handleSearchBook = this.handleSearchBook.bind(this);
        this.setSelectedPage = this.setSelectedPage.bind(this);
        this.setResultPerPage = this.setResultPerPage.bind(this);
        this.getSelectedBook = this.getSelectedBook.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.tableToExcel = this.tableToExcel.bind(this);
    }

    handleSearchBook(bookTittle, pageNumber){
        const currentPage = this.state.currentPage;
        const page = pageNumber?pageNumber:currentPage;
        this.setState({currentKeyword: bookTittle});
        findBook(bookTittle, page,(books)=>{
            console.log(books);
            this.setState({
                foundBooks:books
            });
        });        
    }

    setSelectedPage(pageNumber){  
        this.setState({currentPage: pageNumber});      
        const currentKeyword = this.state.currentKeyword;
        this.handleSearchBook(currentKeyword, pageNumber);
    }

    setResultPerPage(resultPerPage){
        this.setState({ resultPerPage: resultPerPage})
    }

    getSelectedBook(bookIndex){
        const foundBooks = this.state.foundBooks.books;
        const book = foundBooks[bookIndex];
        this.setState({selectedBook:book});        
        this.setState({showModal:true})
    }

    closeModal(){
        this.setState({showModal:false});
    }

    tableToExcel(){
        const data = this.state.foundBooks.books; 
        const resultPerPage = this.state.resultPerPage;  
        const dataToExport = data.slice(0, resultPerPage);  
        exporToExcel(dataToExport, 'Founded books', 'search_report');
    }

    render(){
        const header = ["Tittle","Subtitle","Isbn13", "Price", "URL"];
        /*const data = [
            ["Habia una vez", "Trus", "0001", "15000", "http://172.16.0-32"],
            ["Habia una vez", "Trus", "0001", "15000", "http://172.16.0-32"]
        ] */
        const data = this.state.foundBooks.books;
        const total = this.state.foundBooks.total;
        const totalPages = Math.ceil(Number(total|0)/10);
        const resultPerPages = this.state.resultPerPage;
        const maxResultPerpage = this.state.maxResultPerpage;
        const options = arrayRange(1,maxResultPerpage);// Array.from(Array(maxResultPerpage).keys())
        const showModal = this.state.showModal;
        const selectedBook = this.state.selectedBook;

        return (
            <div className={'container'}>
                <div className={'row'}>
                    <h1>BIBLIOTECA ESCOLAR </h1>
                </div>
                <div className={'row'}>
                    <div className={'col'}>
                        <SearchInput
                            className={'form-control'}
                            placeholder={'Ingreso el nombre del libro'}
                            handleSearchAction={this.handleSearchBook}
                        />
                    </div>
                    <div className={'col col-lg-2'}>
                        <label>
                            Resultados por página:
                        </label>
                        <Selector
                            options={options}
                            setSelectedOption={this.setResultPerPage}
                        />
                    </div>
                </div>                
                <div className={'row'}>
                    <Table 
                        header={header} 
                        data={data} 
                        maxRows={resultPerPages}
                        onSelectTitle={this.getSelectedBook}
                    />
                    {
                        totalPages?
                        (
                            <Pagination
                                totalPages={totalPages}
                                setSelectedPage={this.setSelectedPage}
                            />
                        )
                        :
                        null
                    }
                </div>  
                <div>
                    {
                        showModal?
                        <Modal showModal={showModal} book={selectedBook} close={this.closeModal}/>
                        :
                        null
                    }                    
                </div>
                
                {
                    data?
                    (
                        <div className={'col'}>
                            <button className={'btn btn-primary'} onClick={this.tableToExcel}>Donwload search report</button>
                        </div>                                        
                    )
                    :
                    null
                }

            </div>
        );
    }
}

export default BookstoreContainer;