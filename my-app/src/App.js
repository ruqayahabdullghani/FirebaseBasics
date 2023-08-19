import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import {db , auth , storage} from './config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollection = collection(db , "movies");

  //New Movie states

  const [newMovieTitle , setNewMovieTitle] = useState('');
  const [newReleaseDate , setNewReleaseDate] = useState('');
  const [haveOscar ,SetHaveOscar ] = useState('');


  //Update title state
const [updateTitle , setUpdateTitle] = useState();

//File UpLoad State

const [fileUpload, setFileUpload] = useState(null);



  const getMovieList = async()=> {
    try {
      const data = await getDocs(moviesCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData)
    } catch(err){
      console.log(err)
    }
};
  useEffect(() => {
  getMovieList();
  },[])


  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };


  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc,{title:updateTitle});
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectsFile/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };



  const onSubmitMovie = async() => {
    try{
    await addDoc(moviesCollection , {
    title: newMovieTitle,
    releseDate: newReleaseDate,
    ReceivedOscar: haveOscar,
    userId: auth?.currentUser.uid
    }); 
    getMovieList() }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="App">
      <Auth/>
<div>
  <input placeholder='Movie title' onChange={(e) => setNewMovieTitle(e.target.value)}/>
  <input placeholder='Release date' type='number' onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>
  <input type='checkbox' checked={haveOscar}  onChange={(e) => SetHaveOscar(e.target.checked)}/>
  <label>Received an Oscar</label>
</div>
<button onClick={onSubmitMovie}>Submit</button>




      <di>
        {movieList.map((movie) => (
          <div>
            <h1 style={{color:movie.ReceivedOscar? "green": "red"}}>{movie.title}</h1>
            <p>Date {movie.releseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>
            <input placeholder='new title....' onChange={(e) => setUpdateTitle(e.target.value)}/>
            <button onClick={() => updateMovieTitle(movie.id)}>update title</button>

          </div>
        ))}
      </di>
      <div>
        
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}> Upload File </button>
      </div>     
      </div>
    </div>
  );
}

export default App;
