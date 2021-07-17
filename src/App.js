//import logo from './logo.svg';
import './App.css';
import MyComponent from './components/MyComponent';
import ReadArt from "./components/ReadArt";
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateArt from './components/CreateArt';
import UpdateArt from "./components/UpdateArt";
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:"create",
      selected_content_id:2,
      welcome:{title:"Welcome", desc:"World Wid Web!"},
      subject:{title:"HTML", sub:"HTML is HyperText Markup Language"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is HyperText Markup Language"},
        {id:2, title:"CSS", desc:"CSS is for design"},
        {id:3, title:"JavaScripts", desc:"JavaScript is for interative"}
      ],
      web:{title:"WEB", sub:"World Wide Web!"}
    }
  }
  getReadContent(){
    for(var i = 0; i < this.state.contents.length; i++){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
      }
    }
    
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadArt title={_title} desc={_desc}></ReadArt>
    }
    else if(this.state.mode === "read"){
      var _content = this.getReadContent();
      _article = <ReadArt title={_content.title} desc={_content._desc}></ReadArt> 
    }
    else if(this.state.mode === "create"){
      _article = <CreateArt onSubmit={function(_title, _desc){
        this.max_content_id++;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          contents:_contents
        });
      }.bind(this)}></CreateArt>
    }
    else if(this.state.mode === "update"){
      _content = this.getReadContent();
      _article = <UpdateArt data={_content} onSubmit={function(_title, _desc){
        this.max_content_id++;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          contents:_contents
        });
      }.bind(this)}></UpdateArt>
    }
    return _article;
  }
  render(){
    
    return (
    <div className="App">
      <Subject title={this.state.web.title} 
      sub={this.state.web.sub}
      onChangePage={function(){
        this.setState({mode:"welcome"});
        // alert("Hi!");
      }.bind(this)}>
      </Subject>
      {/* <header>
          <h1><a href="/" onClick={function(e){
            //alert("Hi");
            e.preventDefault();
            this.state.mode = "welcome";
            this.setState({
              mode:"welcome"
            });
            //debugger;
          }.bind(this)}>{this.state.web.title}</a></h1>
          {this.state.web.sub}
      </header> */}
      <TOC data={this.state.contents} 
      onChangePage={function(id){
        this.setState({
          mode:"read",
          selected_content_id:parseInt(id)
        })
      }.bind(this)}>
      </TOC>
      <Control onChangeMode={function(_mode){
        this.setState({
          mode:_mode
        });
      }.bind(this)}></Control>
      {/* <Art title="HTML" sub={this.state.subject.sub}></Art> */}
      {this.getContent()}
      {/* <MyComponent></MyComponent> */}
    </div>
    );
  }
}

export default App;
