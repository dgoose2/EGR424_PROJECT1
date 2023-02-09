import './saved_joke.css';

import CHUCK from '../../assets/chuck.png';


function SavedJoke(props) {
  const color = '#0267FF';

  return (
    <button className='outerButton' onClick={() => window.open( 'https://images02.military.com/sites/default/files/2021-04/chucknorris.jpeg', '_blank')}>
        <div style={{position: 'absolute', backgroundColor: color, height: '20px', width: '100%', top: '0px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}/>
        <div style={{marginTop: '-20px'}}>
            <h2 className='modernWay'>{props.joke}</h2>
        </div>
        <div>
            <img style={{height: '40px', position: 'absolute', bottom: '10px', right: '10px'}} src={CHUCK}></img>
        </div>
        <div style={{position: 'absolute', bottom: '0px', left: '20px'}}>
            <h4 style={{fontSize: '13px'}}>{props.time}</h4>
        </div>
    </button>
  )
}

export default SavedJoke
