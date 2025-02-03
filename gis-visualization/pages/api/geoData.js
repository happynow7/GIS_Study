import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const dataDirectory = path.join(process.cwd(), 'public/data');
    const worldData = JSON.parse(fs.readFileSync(path.join(dataDirectory, 'world-topo.json'), 'utf8'));
    const populationData = JSON.parse(fs.readFileSync(path.join(dataDirectory, 'population-data.json'), 'utf8'));

    res.status(200).json({ worldData, populationData });
}
