import React,{ Component } from 'react';
import UnitList from './Unit'

class Quantity extends Component{
    constructor(props){
        super(props);
        this.state = {
        quantityList:[],
        selectedQuantity: '',    
        units:[],
        inputValue:'',
        inputUnit:'',
        outputUnit:'',
        outputValue:''
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/quantity")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    quantityList: json
            });
        })
        fetch(`http://localhost:8080/unit/LENGTH`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                units: json,
                selectedQuantity: 'LENGTH'
            });
        })
    }

    handleChange = async(e) => {
        await this.setState({ selectedQuantity: e.target.value });
        console.log(this.state.selectedQuantity);
        fetch(`http://localhost:8080/unit/${this.state.selectedQuantity}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                units: json
            });
        })
    }

    handleChangeInputUnit = (e) =>{
        console.log("input unit is", e)
        this.setState({
            inputUnit: e
        })
    }

    handleChangeOutputUnit = (e) =>{
        console.log("output unit is",e)
        this.setState({
            outputUnit: e
        })
    }

    handleValueChange = async(e) => {
        console.log("value is :",e);
        await this.setState({
            inputValue: e
        })
        fetch(`http://localhost:8080/convert/${this.state.outputUnit}`,{
            method:'POST',
            headers:{
                "Content-Type": "Application/json"
            },
            body:JSON.stringify({"unit":this.state.inputUnit, "value":this.state.inputValue})
        }).then(res =>  res.json())
          .then(json => {
            console.log("Output value is:",json)  
            this.setState({ 
                outputValue: json
            })
        })                 
    }
    
    render(){
        console.log(this.state.quantityList);
        console.log(this.state.units);
        return(
            <div className="flex-container">
             <div>
                <select style={{width:'270%',height:'30px',backgroundColor:'white'}} 
                    defaultValue={this.state.selectedQuantity} onChange={this.handleChange}>
                    {this.state.quantityList.map(item => <option>{item}</option>)}
                </select>
             </div>
             <br/>
            <UnitList qty={this.state.selectedQuantity} unitArray={this.state.units}
                input={this.handleChangeInputUnit} 
                output={this.handleChangeOutputUnit} 
                valChange={this.handleValueChange} 
                op={this.state.outputValue}/>
            </div>
        );
    }
}    
export default Quantity;