import React, { Component } from 'react';

class Unit extends Component {
  constructor(props) {
    super(props);
      this.state = {  
        defaultUnits: [
          {id:'1',name:'INCH'},
          {id:'2',name:'FEET'},
          {id:'3',name:'CENTIMETER'},
          {id:'4',name:'YARD'}
        ],
        inputUnit:'',
        outputUnit:'',
        val:''
      }
    }

  handleChangeInputUnit = async(e) =>{
    await this.setState({
      inputUnit: e.target.value
    })
    this.props.input(this.state.inputUnit)
  }
  
  handleChangeOutputUnit = async (e) =>{
    await this.setState({
      outputUnit: e.target.value
    })
    this.props.output(this.state.outputUnit)
  }

  handleChangeValue = async(e) =>{
    await this.setState({
      val: e.target.value
    })
    this.props.valChange(this.state.val)
  }
  
  render() {
    let defaultUnitList = this.state.defaultUnits.length > 0 
                && this.state.defaultUnits.map((item,i) => {
      return(
        <option key={i} value={item.name}>{item.name}</option>
          )    
        },this);

    let unitList = this.props.unitArray.length > 0 
                    && this.props.unitArray.map((item,i) => {
      return(
        <option key={i} value={item}>{item}</option>
        )    
      },this);

    return (
      <div>
        <div className="flex-container" style={{flexDirection:'row'}}>
          <div className="flex-container" style={{flexDirection:'column',width:'370%',height:'70px'}}>
            <input style={{height:'35px'}} type="text" placeholder="Enter value" value={this.state.val}
                         onChangeCapture={this.handleChangeValue}/>
            <select style={{width:'100%',backgroundColor:'white', height:'20px'}}value={this.state.inputUnit } 
                            onChange={this.handleChangeInputUnit}> { this.props.qty === '' ? defaultUnitList : unitList }
            </select>
          </div>
                 
          <text is="x3d"  style={{fontSize:'30px'}}> = </text>
                    
          <div className="flex-container" style={{flexDirection:'column',width:'370%',height:'70px'}}>
            <input style={{height:'35px'}} type="text" placeholder='Converted value' value={JSON.stringify(this.props.op.value)}/>
            <select style={{width:'100%',backgroundColor:'white', height:'20px'}} value={(this.state.outputUnit) } 
                            onChange={this.handleChangeOutputUnit} >
                              { this.props.qty === '' ? defaultUnitList : unitList }
            </select>
          </div>
        </div>
      </div>          
    );
  }
}

export default Unit;
