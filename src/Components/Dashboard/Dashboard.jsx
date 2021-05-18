import React, { useContext , useEffect } from 'react'
import './dashboard.scss'
import logout from './logout.png'
import axios from 'axios'
import { useHistory } from 'react-router'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function Dashboard() {
    let history = useHistory();
    let email=localStorage.getItem("email");
    let[loading,setLoading]=React.useState();
    const [ playlist,setPlaylist]=React.useState([]);
    const[song,setSong]=React.useState([]);
    const [termState,setTermState]=React.useState("all");
    const getDashboardBodyDetails = async()=>{
    setLoading(true);
    let res = await axios.get(`https://itunes.apple.com/search?term=${termState}`);
    setLoading(false);
    console.log(res); 
    setPlaylist(res.data.results);
    console.log(playlist);
    };
    const logoutAccount = ()=>{
        localStorage.clear();
        history.push("/login");
    
      }
      console.log(termState);
      console.log(song);
    useEffect(() => {
        getDashboardBodyDetails();
       
       }, [])
    return (
        <div className="dashboard">
           <div className="dashboard-header">
            <div className="dashboard-header-left">
                <h1 className="dashboard-header-left-text">Musical</h1>
                <div className="dashboard-search">
                <input type="text" placeholder="search" onChange={(e)=>setTermState(e.target.value)}></input>
                <button type="submit" onClick={()=>getDashboardBodyDetails()} >Search</button>
               </div>
            </div>
            <div className="dashboard-header-right">
               <button className="email-button">{email}</button>
               <button onClick={()=>logoutAccount()}><img src={logout}  ></img></button>
            </div>
           </div>
           <div className="dashboard-body">
               <h3>Popular songs</h3>
               <div className="song-block" >
               <div className="card1">
                     <div className="block">
                         <p className="id">ID</p>
                         <p className="id" >Tittle</p>
                        
                         <p className="artistname">ArtistName</p>
                         <p className="collectionname">Collection Name</p>

                       
                      
                       
               </div>
               </div>
             { loading?<h4>Loading....</h4>:
                playlist.map(obj => 
                 <div className="card">
                     <div className="block" onClick={()=>setSong(obj)}>
                         <p className="id">{obj.artistId}</p>
                         <img className="card-img" src={obj.artworkUrl100}></img>
                        
                         <p className="artistname">{obj.artistName}</p>
                         <p className="collectionname">{obj.collectionName}</p>

                       
                      
                       
               </div>
               </div>
                )
                 
                }
                
               </div>
             
           </div>
           <div className="dashboard-footer">
                <AudioPlayer
            autoPlay
            src={song.previewUrl}
            onPlay={e => console.log("onPlay")}
            // other props here
        />
           </div>

        </div>
    )
}
