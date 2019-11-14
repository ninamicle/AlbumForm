import React, {Component} from 'react';
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
 });

class Form extends Component {
     constructor(props) {
         super(props) 
             this.state={}
             this.inputFile=undefined
             this.fileContent = undefined
             this.upload= this.upload.bind(this);
         
     }
     upload() {
        const [ file ] = this.inputFile.files;
        toBase64(file).then(fileContent => {
            this.fileContent = fileContent
            this.props.changeImage(this.fileContent)
        })
    } 

     render(){
         return(
           < div className="form">
                <form onSubmit={this.props.submit}>
                    <input value={this.props.value} onChange={this.props.change}></input>
                    <button type="submit">Button</button>
                    <input type="file" ref={inputFile => {this.inputFile = inputFile}} onChange={this.upload}/>
                </form>
            </div>
             
         )
         }
} export default Form;