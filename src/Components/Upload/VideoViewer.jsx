
import React, { useState, useEffect} from 'react';
import { CircleLoader } from "react-spinners";
import axios from 'axios';
 

  function VideoViewer({data}) {

    const [srcUrl, setSrcUrl] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            if (data['Path'] ) {
                
                
                const getSingleVideoData = async () => {
                setIsLoading(true);
                await axios
                    .post(`https://modest-trusted-moose.ngrok-free.app/playvideo/?path=${data['Path']}`, {
                        headers: {
                            Accept: 'video/mp4;charset=UTF-8',
                            "ngrok-skip-browser-warning": "0",
                        },
                        
                    })
                    .then((response) => {
                        const blob = new Blob([response.data], { type: "video/mp4" });
                        const url = (window.URL || window.webkitURL).createObjectURL(blob);
                        setSrcUrl(url);
                    })
                    .catch((err) => console.error('Error fetching video:', err))
                    .finally(setIsLoading(false));
                }
                getSingleVideoData();
            }else{
                const url = URL.createObjectURL(data);
                setIsLoading(false);
                setSrcUrl(url);
                
            }
        },
        [data]
    );
  

    return (
        <>
         {isLoading ? (
            <div className="loader-container flex items-center justify-center pt-16 pb-8">
              <CircleLoader animation="border" color="#FFFFFF" />
            </div>
          ) : <video src={srcUrl} controls muted></video>}
         </>
      
        
    );
  }
  export default VideoViewer;
  