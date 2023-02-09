import './initial_joke.css';

import CHUCK from '../../assets/chuck.png';

function InitialJoke(props) {
  const color = '#34D534';

  return (
    <div className="outerContainer">
      <div style={{height: '30px', width: '40px', backgroundColor: color, position: 'absolute', top: '0px', left: '0px', borderRadius: '5px', borderTopLeftRadius: '10px'}}/>
      <div style={{width: '80%'}}>
        <h2 style={{textAlign: 'center'}}>{props.joke}</h2>
      </div>
      <div>
        <img style={{height: '40px', position: 'absolute', top: '10px', right: '10px'}} src={CHUCK}></img>
      </div>
      <div style={{position: 'absolute', bottom: '-10px', right: '15px'}}>
        <h4 style={{fontSize: '13px'}}>{props.timestamp}</h4>
      </div>
    </div>
  )
}

export default InitialJoke
