import React, { useState } from "react";
import axios from "axios";

const LocatorFetcher = () => {
  const [url, setUrl] = useState("");
  const [locators, setLocators] = useState({
    selenium: [],
    puppeteer: [],
    cypress: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchLocators = async () => {
    if (!url) {
      setError("Please enter a URL.");
      return;
    }
    setError("");
    setLoading(true); // Set loading to true when request starts
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-locators`, {
        params: { url },
      });
      
      // Process the API response to handle the locator data
      const locatorData = response.data;
      
      setLocators({
        selenium: parseLocators(locatorData[0]),  // Parsing the first element for Selenium
        puppeteer: parseLocators(locatorData[1]),  // Parsing the second element for Puppeteer
        cypress: parseLocators(locatorData[2]),    // Parsing the third element for Cypress
      });
    } catch (err) {
      setError("Failed to fetch locators. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false once request is done
    }
  };

  const parseLocators = (data) => {
    // Split the string by newline and return it as an array of lines
    return data.split("\n").filter(line => line.trim() !== "");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial" }}>
      <h1>Locator Fetcher</h1>
      <div>
        <input
          type="text"
          placeholder="Enter the URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={fetchLocators}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1ba098",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Fetch Locators"} {/* Change text during loading */}
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {/* Loading spinner */}
      {loading && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <div className="spinner" style={{ fontSize: "24px" }}>
            <i className="fas fa-spinner fa-spin"></i> {/* FontAwesome spinner */}
          </div>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        {/* Check if locators for each category exist and display accordingly */}
        {locators.selenium.length > 0 && (
          <div>
            <h2>Selenium Locators</h2>
            <div
              style={{
                backgroundColor: "#f4f4f4",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {locators.selenium.map((locator, index) => (
                <pre
                  key={index}
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    marginBottom: "10px",
                  }}
                >
                  {locator}
                </pre>
              ))}
            </div>
          </div>
        )}

        {locators.puppeteer.length > 0 && (
          <div>
            <h2>Puppeteer Locators</h2>
            <div
              style={{
                backgroundColor: "#f4f4f4",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {locators.puppeteer.map((locator, index) => (
                <pre
                  key={index}
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    marginBottom: "10px",
                  }}
                >
                  {locator}
                </pre>
              ))}
            </div>
          </div>
        )}

        {locators.cypress.length > 0 && (
          <div>
            <h2>Cypress Locators</h2>
            <div
              style={{
                backgroundColor: "#f4f4f4",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {locators.cypress.map((locator, index) => (
                <pre
                  key={index}
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    marginBottom: "10px",
                  }}
                >
                  {locator}
                </pre>
              ))}
            </div>
          </div>
        )}

        {/* If no locators are available, show a message */}
        {locators.selenium.length === 0 && locators.puppeteer.length === 0 && locators.cypress.length === 0 && (
          <p>No locators available for the given URL.</p>
        )}
      </div>
    </div>
  );
};

export default LocatorFetcher;
