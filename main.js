var drag = false;

// Config
var arr = [];
for(var i = 0; i<100; i++){

arr.push(
  {x:Math.floor(Math.random() * (500 - 1)) + 1,
   y:Math.floor(Math.random() * (500 - 1)) + 1});
  
}
var batch = true; //setState every frame

//Functional components
var Yaxes = function(props){
  
  return <g><line className="axes" x1="0"  y1="0" x2="0" y2="510"/></g>;
}

var Xaxes = function(props){
  
    return <g><line className="axes" x1="-10"  y1="500" x2="520" y2="500"/></g>;

}
var Line = function(props){
  
  var ctop = (props.x-250);
var ctrans = 'translate3d('+ctop+'px, 0px,0px)';
var css = {
 transform: ctrans
  
}


  return <line  style={css} x1={250} y1="0" x2={250} y2="500" className="line" />
}
var Icon = function(props){
  
  return <div ><span className="atom1" style={{background:props.background, border: props.gray?"2px solid gray": "2px solid #91B0DA"}}></span><span className="atom">{props.count}</span></div>;
  
}

var Circle  = function(props){

  return <g><circle className={props.x > props.line ? "blue": "gray"} cx={props.x} cy={props.y} r="6" /></g>;
    
}

var Broj = function(props){
  
  return   <text x={props.x} y={props.y} fill="black">{props.content}</text>;

  
}


var counter = 0;

/* Main Component Chart */ 

var Chart = React.createClass({
 getInitialState: function() {
  
 var broj = arr.filter(function(val){
      
     return 250 > val.x;
    },this).length;
   
    return {line: 250, broj:broj};
  },
 
  handleOnChange: function(event) {
    var value = event.target.value
    var t = arr.filter(function(val){
      
      
     return value > val.x;
    },this).length;    
    
  this.setState({line:value, broj:t});


    },
  
  componentDidMount:function(){
   
    var svg = document.getElementsByTagName('svg')[0];


svg.onmousedown = function(){

drag = true;

    }

    svg.onmouseup = function(){

drag = false;
      
    }



 var that = this;
    var line = document.getElementsByClassName('line')[0];
    var range = document.getElementsByClassName('range')[0];
    var posX1 = line.getAttribute('x1');
        svg.onmousemove = function(event){
if(drag ){

      var cX = event.clientX;
     var frame = 0;
      var fin = cX-posX1-57;
      var t = arr.filter(function(val){

     return fin+250 > val.x;
    }); 
      
      
      
    
      range.value = fin+250;
                that.setState({line:(fin+249 <0)?0:fin+249>505?505:fin+249, broj:t.length}, function(){batch = true;});
/*
      if(batch){
        
requestAnimationFrame(that.scheduleFrame(fin,t));
        batch = false;
      }
      */
      }
    }

        
  },
  scheduleFrame:function(fin,t){
    var that = this;
  return  function(){
    
          that.setState({line:(fin+249 <0)?0:fin+249>505?505:fin+249, broj:t.length}, function(){batch = true;});
    
    }
    
  },
  
  render: function() {
  
     counter++;
    var circles =  arr.map(function(val, ind){
    
    return <Circle line={this.state.line} x={val.x} y={val.y} key={ind}/>
    
    },this);
    
    return <div className="wrapper"> <svg width="760" height="570"
                   xmlns="http://www.w3.org/2000/svg"><defs>
    <clipPath id="clipPath4">
        <rect x="-1" y="0" width="550" height="501" />

    </clipPath>
</defs><Broj content="1" y="12" x="10"/><Broj content="0" y="505" x="10"/><Broj content="0" y="550" x="45"/><Broj content="0.5" y="550" x="290"/><Broj content="1" y="550" x="553"/><g className="translate"><Line x={this.state.line}/>{circles}<Xaxes /><Yaxes /></g></svg><br/><div className="inputWrap">
<input className="range" type="range" id="weight" min="0" value={counter===1 ?this.state.line/5:this.state.line} list="ticks" max="500" step="1" onInput={this.handleOnChange.bind(this)}
                        onChange={this.handleOnChange.bind(this)}/>
      
      <datalist id="ticks">
  <option>50</option>
  <option>100</option>
  <option>150</option>
  <option>200</option>
  <option>250</option>
  <option>300</option>
  <option>350</option>
  <option>400</option>
  <option>450</option>
 
      </datalist>
      <br />
      <ul className="ul">
        <li style={{paddingRight:"107.5"}}>0</li>
        <li style={{paddingRight:"107.5"}}>0.5</li>
        <li>1</li>

        
      </ul>
    
      </div>
            <Icon count = {100-this.state.broj} background="#91B0DA" gray={false} />
  <Icon count = {this.state.broj} background="none" gray={true} />

    
      
      
    </div>;
    
  }
 
});

ReactDOM.render(
  <Chart />,
  document.getElementById('container')
);

