import { useState, useEffect } from 'react';
import Map from '../components/Map';

export default function Home() {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetch('/api/geoData')
            .then(response => response.json())
            .then(data => setGeoData(data));
    }, []);

    if (!geoData) return <div>Loading...</div>;

    return (
        <div>
            <h1>World Population Visualization</h1>
            <Map worldData={geoData.worldData} populationData={geoData.populationData} />
        </div>
    );
}
