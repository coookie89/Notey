import React, { useRef, useEffect } from "react";
import { Markmap } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
import "markmap-toolbar/dist/style.css";

import { Transformer } from "markmap-lib";
export const transformer = new Transformer();

function renderToolbar(mm, wrapper) {
  while (wrapper?.firstChild) wrapper.firstChild.remove();
  if (mm && wrapper) {
    const toolbar = new Toolbar();
    toolbar.attach(mm);
    wrapper.append(toolbar.render()); // Register custom buttons
  }
}

export default function MarkmapHooks(props) {
  const value = props.markdown;

  const refSvg = useRef(null); // Ref for SVG element
  const refMm = useRef(null); // Ref for markmap object
  const refToolbar = useRef(null); // Ref for toolbar wrapper

  useEffect(() => {
    // Create markmap and save to refMm
    if (refMm.current) return;
    const mm = Markmap.create(refSvg.current);
    console.log("create", refSvg.current);
    refMm.current = mm;
    renderToolbar(refMm.current, refToolbar.current);
  }, [refSvg]);

  useEffect(() => {
    // Update data for markmap once value is changed
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(value);
    mm.setData(root);
    mm.fit();
  }, [value]);

  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-between">
      <svg className="h-100 w-100 flex-grow-1" ref={refSvg} />
      <div ref={refToolbar}></div>
    </div>
  );
}
