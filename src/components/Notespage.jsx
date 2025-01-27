import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Mindmap from "./Mindmap";
import "./style.css";

import PsychologyIcon from "@mui/icons-material/Psychology";
import ArticleIcon from "@mui/icons-material/Article";
import FindInPageIcon from "@mui/icons-material/FindInPage";

export default function Notespage() {
  const [viewSelection, setViewSelection] = React.useState("img"); // 'img', 'txt' or 'file'
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="sub-screen d-flex align-items-center flex-column justify-content-between">
      {/*---------- Headline ----------*/}
      <div class="d-flex w-100 justify-content-between">
        {/*----- Tab bar -----*/}
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          {/* 1st tab */}
          <li
            class={`nav-item nav-link ${
              viewSelection === "img" ? "active" : ""
            }`}
            role="presentation"
          >
            <button
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
              onClick={() => setViewSelection("img")}
            >
              <PsychologyIcon />
              &nbsp;Mindmap
            </button>
          </li>
          {/* 2nd tab */}
          <li
            class={`nav-item nav-link ${
              viewSelection === "txt" ? "active" : ""
            }`}
            role="presentation"
          >
            <button
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => setViewSelection("txt")}
            >
              <ArticleIcon />
              &nbsp;Notes
            </button>
          </li>
          {/* 3rd tab */}
          <li
            class={`nav-item nav-link ${
              viewSelection === "file" ? "active" : ""
            }`}
            role="presentation"
          >
            <button
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
              onClick={() => setViewSelection("file")}
            >
              <FindInPageIcon />
              &nbsp;Original file
            </button>
          </li>
        </ul>

        {/*----- Main page btn -----*/}
        <div>
          <button
            type="button"
            className="btn btn-secondary btn-md"
            onClick={() => handleClick()}
          >
            Upload new slides!
          </button>
        </div>
      </div>

      {/*---------- Content ----------*/}
      <div class="tab-content w-100 h-100" id="myTabContent">
        <div
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
          className="tab-pane fade show active h-100"
        >
          {/*----- Mindmap -----*/}
          <Mindmap markdown={data.groqSummary} />
        </div>

        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {/*----- Markdown text -----*/}
          <MarkdownPreview
            source={data.groqSummary}
            rehypeRewrite={(node, index, parent) => {
              if (
                node.tagName === "a" &&
                parent &&
                /^h(1|2|3|4|5|6)/.test(parent.tagName)
              ) {
                parent.children = parent.children.slice(1);
              }
            }}
          />
        </div>
        <div
          class="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          {/*----- Uploaded original file preview -----*/}
          ...
        </div>
      </div>
    </div>
  );
}
