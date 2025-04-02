const data = [10, 25, 15, 30, 40];

// SVG 설정
const width = 500, height = 300;
const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

// 막대 그래프 생성
svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 50)
    .attr("y", d => height - d * 5)
    .attr("width", 40)
    .attr("fill", "steelblue")
    .transition()
    .duration(1000) // 1초 동안 애니메이션 적용
    .attr("height", d => d * 5) // 높이 조정
    .attr("y", d => 300 - d * 5); // 위치 조정;
