import React from 'react';

class Selector extends React.Component {    
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 0
        }

        this.handleOnSelected = this.handleOnSelected.bind(this);
    }

    handleOnSelected(el){
        const selected = Number(el.target.value);
        console.log(selected);
        this.props.setSelectedOption(selected);
    }

    render(){
        const options = this.props.options;
        const defaultValue = this.props.defaultValue;
        const optionsLen = options.lenght;
        //const selectedIndex = this.state.selectedIndex;
        return(
            <select 
                className={'form-select'}
                defaultValue={optionsLen}
                onChange={this.handleOnSelected}                
            >
                <option 
                    value={defaultValue} 
                    /* selected={this.index === selectedIndex} */
                >
                    {defaultValue}
                </option>
                {
                    options?
                    options.map((el,index)=>{
                        return (
                            <option 
                                value={el} 
                                key={'option-'+index}
                                /* selected={this.index === selectedIndex} */
                            >
                                {el}
                            </option>
                        )
                    }):
                    null
                }
            </select>
        )
    }
}

export default Selector;