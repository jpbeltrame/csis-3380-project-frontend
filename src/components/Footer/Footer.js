import "./Footer.css";
import React from "react";
import { Card } from "antd";

function Footer() {
  return (
    <Card style={{margin: '20px'}}>
      <div className="footer">
        <span>
          <p className="company">BookTrackr</p>
          <p>
            &copy; 2023 Produced by BookTrackr Corporation
          </p>
        </span>
      </div>
    </Card>
  );
}

export default Footer;
