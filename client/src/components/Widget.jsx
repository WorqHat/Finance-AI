import React, { useEffect } from "react";

const Widget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: "BSE:SENSEX",
      width: "350",
      height: "220",
      locale: "en",
      dateRange: "1D",
      colorTheme: "light",
      isTransparent: false,
      autosize: false,
      largeChartUrl: "",
    });

    document
      .getElementsByClassName("tradingview-widget-container__widget")[0]
      .appendChild(script);

    return () => {
      // Cleanup: Remove the script when the component unmounts
      document
        .getElementsByClassName("tradingview-widget-container__widget")[0]
        .removeChild(script);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default Widget;
