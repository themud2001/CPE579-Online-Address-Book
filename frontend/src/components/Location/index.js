import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setLocation } from "../../store";

const Location = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { longitude, latitude } }) => dispatch(setLocation({ longitude, latitude })),
            () => dispatch(setLocation({ longitude: null, latitude: null }))
        );
    }, [dispatch]);
};

export default Location;