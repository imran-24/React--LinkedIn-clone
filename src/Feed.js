import React, {useEffect, useState} from 'react'
import './Feed.css'
import Post from './Post.js';
import InputOption from './InputOption';
import CreateIcon from '@material-ui/icons/Create';
import PhotoIcon from '@material-ui/icons/Photo';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import EventIcon from '@material-ui/icons/Event';
import DescriptionIcon from '@material-ui/icons/Description';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move'

function Feed() {
  const user = useSelector(selectUser);
  
  const [input, setInput] = useState(''); 
  const [posts, setPosts] = useState([]);

  useEffect(
    () => {
        db.collection('posts')
        .orderBy('timestamp', 'desc' )
        .onSnapshot(snapshot => 
            (
                setPosts(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                )))
            ))
    },[])

  const sendPost = (e) => {
    e.preventDefault()
    db.collection('posts').add({
        name: user.displayName, 
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput('');
  };
  

  return (
    <div className='feed'>
        <div className="feed__inputContainer">
            <div className="feed__input">
                <CreateIcon />
                <form>
                    <input type="text" value={input} onChange={ e => {
                        setInput(e.target.value)
                    }}/>
                    <button onClick={sendPost} type='submit'>
                        Send
                    </button>
                </form>
            </div>

            <div className="feed_inputOption">
                <InputOption Icon={PhotoIcon} title={"Photo"} color={'#70B5F9'}/>
                <InputOption Icon={PlayCircleFilledIcon} title={"Video"} color={'#E7A33E'}/>
                <InputOption Icon={EventIcon} title={"Event"} color={'#C0CBCD'}/>
                <InputOption Icon={DescriptionIcon} title={"Write article"} color={'#7FC15E'}/>
            </div>
        </div>

        {/* Post */}
        
        <FlipMove>
            {               posts.map(({ id, data: { name, description, message, photoUrl  }})=>
                (<Post
                    key={id}
                    name={name}
                    description={description}
                    message= {message}
                    photoUrl={photoUrl} />
                    
                ))
            }
        </FlipMove>    
    </div>
  );
}

export default Feed