import React from 'react';

class SearchInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            keyword:'',
        }

        this.handleOnPressButton = this.handleOnPressButton.bind(this);
        this.handleOnInput = this.handleOnInput.bind(this);
    }

    handleOnPressButton(){
        const keyword = this.state.keyword;
        if(keyword.length > 1){
            this.props.handleSearchAction(keyword);
        }
    }

    handleOnInput(el){
        const keyword = el.target.value;
        this.setState({keyword:keyword});
    }

    render(){
        return (
            <div className="row g-2">
                <div className="col-auto">
                    <input 
                        className={this.props.className} 
                        name="keyword" 
                        placeholder={this.props.placeholder}
                        onInput={this.handleOnInput}
                    />
                </div>
                <div className="col-auto">
                    <button 
                        className="btn btn-primary" 
                        type='button' 
                        name="searchButton" 
                        onClick={this.handleOnPressButton}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    }
}

export default SearchInput;