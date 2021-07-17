import { Component } from "react";

class ReadArt extends Component{
    render(){
      return(
        <article>
          <h2>{this.props.title}</h2>
          {this.props.desc}
        </article>
      );
    }
}

export default ReadArt;