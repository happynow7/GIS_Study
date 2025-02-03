import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';

const Map = ({ worldData, populationData }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!worldData || !populationData) return;

        const svg = d3.select(svgRef.current);
        const width = 960;
        const height = 500;

        svg.attr('width', width).attr('height', height);

        const projection = d3.geoMercator().fitSize([width, height], feature(worldData, worldData.objects.countries));
        const path = d3.geoPath().projection(projection);

        const countries = feature(worldData, worldData.objects.countries).features;

        svg.selectAll('path')
            .data(countries)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', d => {
                const country = populationData.find(c => c.code === d.id);
                return country ? d3.interpolateYlOrRd(country.population / 1e9) : '#ccc';
            })
            .attr('stroke', '#fff')
            .attr('stroke-width', 0.5);

    }, [worldData, populationData]);

    return <svg ref={svgRef}></svg>;
};

export default Map;
