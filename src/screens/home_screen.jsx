import { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import './home_screen.css'
import CHUCK from '../assets/chun.avif';
import TRASH from '../assets/trash.png';

import {db} from '../firebase';
import {collection, addDoc, getFirestore, getDoc, getDocs, doc,  QuerySnapshot, deleteDoc} from "firebase/firestore";
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
  const db = getFirestore();

  const getRandomJoke = async () => {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    const jokeData = response.data['value'];
    const time = response.data['created_at'];
    setInitialJoke(jokeData);
    setTimeStamp(time.substring(0, time.indexOf(' ')));
  }
  
  const getJokes = async () => {
    await getDocs(collection(db, "jokes"))
    .then((QuerySnapshot) => {
      const newData = QuerySnapshot.docs
      .map((doc) => ({...doc.data(), id: doc.id}));
      setJokes(newData);
    })
  }
  
  const addJoke = async (joke, timeStamp) => {
    try {
      const docRef = await addDoc(collection(db, "jokes"), {
        joke: joke,
        time_stamp: timeStamp,
      });
      getJokes();
      getRandomJoke();
    }catch (e) {
      console.log(e);
    }
  }
  
  const clearJokes = async () => {
    try {
      for(var i = 0; i < jokes.length; i++) {
        const docRef = doc(db, "jokes", jokes[i]['id']);
        await deleteDoc(docRef);
      }
      getJokes();
      getRandomJoke();
    }catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getJokes();
    getRandomJoke();
  }, [])

  return (
    <div>

      <div className='web-mode'>
        <button className='headerButton' onClick={() => window.open( 'https://images02.military.com/sites/default/files/2021-04/chucknorris.jpeg', '_blank')}>
          <img style={{height: '70px'}} src={CHUCK}></img>
        </button>
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
          <h1 style={{textAlign: 'center'}}>welcome to dank norris</h1>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
          <InitialJoke joke={initialJoke} timestamp={timeStamp}/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>
          <div style={{paddingRight: '20px'}}>
            <button onClick={() => {getRandomJoke();}}>random</button>
          </div>
          <button onClick={() => {
            addJoke(initialJoke, timeStamp);
          }} className='save-button' style={{width: '240px'}}>save</button>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '15px'}}>
          <div>
            <button className='clear-button' onClick={() => {clearJokes();}}>clear</button>
          </div>
        </div>
        <div style={{marginTop: '100px'}}>
          <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={4}
          navigation
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
      
      <div className='mobile-mode'>
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '90px'}}>
          <h1 style={{textAlign: 'center', fontSize: '34px'}}>welcome to dank norris</h1>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '10px'}}>
          <InitialJoke joke={initialJoke} timestamp={timeStamp}/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '45px'}}>
          <div style={{paddingRight: '10px'}}>
            <button onClick={() => {getRandomJoke();}}>random</button>
          </div>
          <button onClick={() => {
            addJoke(initialJoke, timeStamp);
          }} className='save-button'>save</button>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '15px'}}>
          <div>
            <button style={{width: '410px'}} className='clear-button' onClick={() => {clearJokes();}}>clear</button>
          </div>
        </div>
        <div style={{marginTop: '30px'}}>
          <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={2}
          navigation
          style={{marginTop: '50px', paddingLeft: '9%'}}
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
    </div>
  )
}

export default HomeScreen
