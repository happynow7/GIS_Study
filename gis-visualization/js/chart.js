const data = [10, 25, 15, 30, 40];

const width = 500;
const height = 300;
const barWidth = 40;
const padding = 50;

const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

// X축 스케일링
const xScale = d3.scaleBand()
    .domain(data.map((_, i) => i))
    .range([padding, width - padding])
    .padding(0.4);

// Y축 스케일링
const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height - padding, padding]);

// 막대 추가 + 애니메이션
svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (_, i) => xScale(i))
    .attr("y", height - padding)  // 처음에는 아래에 배치
    .attr("width", xScale.bandwidth())
    .attr("height", 0)  // 처음에는 높이 0
    .attr("fill", "steelblue")
    .transition() // 애니메이션 추가
    .duration(1000)
    .attr("y", d => yScale(d))
    .attr("height", d => height - padding - yScale(d));

// X축 추가
svg.append("g")
    .attr("transform", `translate(0,${height - padding})`)
    .call(d3.axisBottom(xScale).tickFormat(d => `Item ${d + 1}`));

// Y축 추가
svg.append("g")
    .attr("transform", `translate(${padding},0)`)
    .call(d3.axisLeft(yScale));

// 데이터 값 표시 (라벨)
svg.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (_, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", height - padding)
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text(d => d)
    .transition()
    .duration(1000)
    .attr("y", d => yScale(d) - 5);

// 툴팁 효과 추가
const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("background", "rgba(0,0,0,0.7)")
    .style("color", "white")
    .style("padding", "5px 10px")
    .style("border-radius", "5px")
    .style("visibility", "hidden")
    .text("");

svg.selectAll("rect")
    .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "orange");
        tooltip.text(`Value: ${d}`)
            .style("visibility", "visible");
    })
    .on("mousemove", function (event) {
        tooltip.style("top", `${event.pageY - 30}px`)
            .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", function () {
        d3.select(this).attr("fill", "steelblue");
        tooltip.style("visibility", "hidden");
    });
