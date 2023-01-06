import { useEffect, useState } from "react";
import { Positions } from "../globals";

const useSetItem = (imageTitle: string, positions: Positions) => {
    const [translate, setTranslate] = useState({
        x: 0,
        y: 0,
    });
    const [imageSize, setImageSize] = useState({ width: 200, height: 200 });

    useEffect(()=>{
        if(positions[imageTitle]){
            setTranslate({x: positions[imageTitle].x, y: positions[imageTitle].y});
            setImageSize({height: positions[imageTitle].height, width: positions[imageTitle].width})
        }
    }, [imageTitle]);

    return {translate, setTranslate, imageSize, setImageSize}
}

export default useSetItem