import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { SketchPicker } from "react-color";
import "./ChartBuilder.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const isNumericColumn = (columnName: string, data: any[]) => {
  return data.every(item =>
    item[columnName] !== null &&
    item[columnName] !== "" &&
    !isNaN(Number(item[columnName]))
  );
};

const ChartBuilder: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [numericColumns, setNumericColumns] = useState<string[]>([]);
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");
  const [chartType, setChartType] = useState("Bar");
  const [chartColor, setChartColor] = useState("#8884d8");
  const [is3D, setIs3D] = useState(false);
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("excelData");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "object") {
          setData(parsed);
          const cols = Object.keys(parsed[0]);
          setColumns(cols);
          const numericCols = cols.filter(col => isNumericColumn(col, parsed));
          setNumericColumns(numericCols);
        } else {
          alert("Invalid file format. Please re-upload.");
        }
      } catch (err) {
        console.error("Error parsing stored Excel data:", err);
        alert("Could not load chart data. Please re-upload the file.");
      }
    } else {
      alert("No file selected. Please go to Dashboard and choose a file.");
    }
  }, []);

  const getFilteredData = () => {
    if (filterColumn && filterValue) {
      return data.filter((item) => item[filterColumn] === filterValue);
    }
    return data;
  };

  const filteredData = getFilteredData();

  useEffect(() => {
    if (filteredData.length > 1000) {
      alert("⚠️ Large dataset detected. Rendering/export may be slow.");
    }

    if (chartType === "Pie" && filteredData.length > 25) {
      alert("⚠️ Too many pie slices (25+). Consider filtering or switching chart type.");
    }
  }, [filteredData, chartType]);

  const renderChart = () => {
    if (!xKey || !yKey || filteredData.length === 0) return null;

    const labels = filteredData.map(item => item[xKey]);
    const values = filteredData.map(item => Number(item[yKey]));

    const commonData = {
      labels,
      datasets: [
        {
          label: `${yKey} vs ${xKey}`,
          data: values,
          backgroundColor: chartType === "Pie"
            ? labels.map((_, i) => `hsl(${i * 40}, 70%, 60%)`)
            : chartColor,
          borderColor: chartColor,
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true }
      },
      animation: {
        duration: isAnimationActive ? 1000 : 0
      }
    };

    switch (chartType) {
      case "Bar":
        return <Bar data={commonData} options={options} />;
      case "Line":
        return <Line data={commonData} options={options} />;
      case "Pie":
        return (
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <Pie data={commonData} options={{ ...options, maintainAspectRatio: true }} />
          </div>
        );
      default:
        return null;
    }
  };

  const handleExportPNG = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const link = document.createElement("a");
    link.download = `chart-${chartType}-${timestamp}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleExportPDF = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 160, 90);
    pdf.save(`chart-${chartType}.pdf`);
  };

  const handleExportCSV = () => {
    if (!xKey || !yKey || filteredData.length === 0) return;
    const headers = [xKey, yKey];
    const rows = filteredData.map(item => [item[xKey], item[yKey]]);
    const csvContent = "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `chart_data.csv`;
    link.click();
  };

  const uniqueFilterValues = [...new Set(data.map(item => item[filterColumn]))];

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 <span style={{ color: "#333" }}>Chart Builder</span></h2>

      {columns.length === 0 ? (
        <p>No Excel data found. Please upload a file on the Dashboard.</p>
      ) : (
        <>
          <div className="chart-controls">
            <div className="control-group">
              <label>📊 Chart Type:</label>
              <select className="custom-select" value={chartType} onChange={(e) => setChartType(e.target.value)}>
                <option value="Bar">Bar</option>
                <option value="Line">Line</option>
                <option value="Pie">Pie</option>
              </select>
            </div>

            {chartType === "Pie" && (
              <div className="control-group">
                <label>🌀 3D View:</label>
                <button className="custom-btn" onClick={() => setIs3D(prev => !prev)}>
                  {is3D ? "Switch to 2D" : "Switch to 3D"}
                </button>
              </div>
            )}

            <div className="control-group">
              <label>📈 X Axis:</label>
              <select className="custom-select" value={xKey} onChange={(e) => setXKey(e.target.value)}>
                <option value="">Select</option>
                {columns.map(col => <option key={col} value={col}>{col}</option>)}
              </select>
            </div>

            <div className="control-group">
              <label>📉 Y Axis (Numeric Only):</label>
              <select className="custom-select" value={yKey} onChange={(e) => setYKey(e.target.value)}>
                <option value="">Select</option>
                {numericColumns.map(col => <option key={col} value={col}>{col}</option>)}
              </select>
            </div>

            <div className="control-group">
              <label>🎨 Chart Color:</label>
              <button
                className="custom-btn"
                onClick={() => setShowColorPicker(prev => !prev)}
                style={{ marginBottom: "0.5rem" }}
              >
                {showColorPicker ? "Hide Picker" : "Change Color"}
              </button>
              {showColorPicker && (
                <SketchPicker
                  color={chartColor}
                  onChangeComplete={(color) => {
                    setChartColor(color.hex);
                    setShowColorPicker(false);
                  }}
                />
              )}
            </div>

            <div className="control-group">
              <label>💫 Animation:</label>
              <label>
                <input
                  type="checkbox"
                  checked={isAnimationActive}
                  onChange={() => setIsAnimationActive(prev => !prev)}
                /> Enable
              </label>
            </div>

            <div className="control-group">
              <label>🔍 Filter Column:</label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <select
                  className="custom-select"
                  value={filterColumn}
                  onChange={(e) => {
                    setFilterColumn(e.target.value);
                    setFilterValue("");
                  }}
                >
                  <option value="">None</option>
                  {columns.map(col => <option key={col} value={col}>{col}</option>)}
                </select>

                {filterColumn && (
                  <select
                    className="custom-select"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  >
                    <option value="">All</option>
                    {uniqueFilterValues.map((val, idx) => (
                      <option key={idx} value={val}>{val}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          <div style={{ margin: "1rem 0" }}>
            <strong>Preview:</strong> {chartType} Chart for <em>{xKey}</em> {yKey && `vs`} <em>{yKey}</em>
          </div>

          <div
            ref={chartRef}
            style={{
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: is3D ? "5px 10px 30px rgba(0,0,0,0.3)" : "none",
              transform: is3D ? "perspective(600px) rotateX(3deg)" : "none",
              transition: "all 0.4s ease"
            }}
          >
            {renderChart()}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button className="custom-btn" onClick={handleExportPNG}>📤 Export PNG</button>
            <button className="custom-btn" onClick={handleExportPDF} style={{ marginLeft: "1rem" }}>📄 Export PDF</button>
            <button className="custom-btn" onClick={handleExportCSV} style={{ marginLeft: "1rem" }}>📥 Download CSV</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChartBuilder;
