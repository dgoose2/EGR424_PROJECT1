import { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import './home_screen.css'
import CHUCK from '../assets/chuck.png';

import {db} from '../firebase';
import {collection, addDoc, getDoc, getDocs, QuerySnapshot} from "firebase/firestore";
import './home_screen.css';
import InitialJoke from '../components/initial_joke/initial_joke';
import SavedJoke from '../components/saved_joke/saved_joke';

import {Navigation, Pagination, Scrollbar, A11y} from "swiper";
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function HomeScreen() {

  const [jokes, setJokes] = useState([]);
  const [timeStamp, setTimeStamp] = useState('');
  const [initialJoke, setInitialJoke] = useState('');
  const [initialState, setInitialState] = useState('');

  const getCategories = async () => {
    console.log('Requesting data....');
    const response = await axios.get('https://api.chucknorris.io/jokes/categories');
    const data = response.data;
    return data;
  }

  const getRandomJokeCategory = async (category) => {
    console.log('Requesting random joke with category...');
    const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
    const jokeData = response.data['value'];
    return jokeData;
  }

  const getRandomJoke = async () => {
    console.log('Requesting random joke...');
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    const jokeData = response.data['value'];
    const time = response.data['created_at'];
    setInitialJoke(jokeData);
    setTimeStamp(time.substring(0, time.indexOf(' ')));
  }

  const addJoke = async (joke, timeStamp) => {
    console.log('Sending data to firestore...');
    try {
      const docRef = await addDoc(collection(db, "jokes"), {
        joke: joke,
        time_stamp: timeStamp,
      });
      console.log('Successful');
    }catch (e) {
      console.log(e);
    }
  }

  const getJokes = async () => {
    console.log('Getting data from firestore...');
    await getDocs(collection(db, "jokes"))
      .then((QuerySnapshot) => {
        const newData = QuerySnapshot.docs
          .map((doc) => ({...doc.data(), id: doc.id}));
        setJokes(newData);
      })
  }

  const getInitialState = () => {
    getJokes();
    if(jokes[0]['joke'].includes(initialJoke)) {
      setInitialState(true);
    } else {
      setInitialState(false);
    }
  }

  useEffect(() => {
    getJokes();
    getRandomJoke();
  }, [])
  

  return (
    <div>
      <button className='headerButton' onClick={() => window.open( 'https://images02.military.com/sites/default/files/2021-04/chucknorris.jpeg', '_blank')}>
        <img style={{height: '70px', position: 'absolute', top: '10px', right: '10px'}} src={CHUCK}></img>
      </button>
      <div style={{display: 'flex', justifyContent: 'center', paddingTop: '100px'}}>
        <h1>welcome to dank norris</h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
        <InitialJoke joke={initialJoke} timestamp={timeStamp}/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
        <div style={{paddingRight: '20px'}}>
          <button>random</button>
        </div>
        <Popup trigger={<button>generate</button>} position="bottom center">
          <div style={{backgroundColor: 'white'}}>Popup content here !!</div>
        </Popup>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', paddingTop: '15px'}}>
        <button onClick={() => {
          addJoke(initialJoke, timeStamp);
        }} 
        className='save-button' style={{width: '500px'}}>save</button>
      </div>
      <div style={{marginTop: '100px'}}>
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={4}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        style={{marginTop: '50px', paddingLeft: '5%'}}
        >
          {
            jokes?.map((joke, i) => (
              <p key={i}>
                <SwiperSlide style={{paddingBottom: '120px'}}>
                  <SavedJoke joke={joke.joke} time={joke.time_stamp}/>
                </SwiperSlide>
              </p>
            ))
          }
        </Swiper>
      </div>
      
    </div>
  )
}

export default HomeScreen
