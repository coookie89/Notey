import React, { useState, useRef, useEffect } from 'react';
import { Markmap } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import 'markmap-toolbar/dist/style.css';

import { loadCSS, loadJS } from 'markmap-common';
import { Transformer } from 'markmap-lib';
import * as markmap from 'markmap-view';

export const transformer = new Transformer();
const { scripts, styles } = transformer.getAssets();

// Load CSS and JS assets dynamically
loadCSS(styles);
loadJS(scripts, { getMarkmap: () => markmap });

function renderToolbar(mm, wrapper) {
  while (wrapper?.firstChild) wrapper.firstChild.remove();
  if (mm && wrapper) {
    const toolbar = new Toolbar();
    toolbar.attach(mm);
    // Register custom buttons
    
    wrapper.append(toolbar.render());
  }
}

export default function MarkmapHooks(props) {
  const [value, setValue] = useState(props.markdown);
  // Ref for SVG element
  const refSvg = useRef(null);
  // Ref for markmap object
  const refMm = useRef(null);
  // Ref for toolbar wrapper
  const refToolbar = useRef(null);

  useEffect(() => {
    // Create markmap and save to refMm
    if (refMm.current) return;
    const mm = Markmap.create(refSvg.current);
    console.log('create', refSvg.current);
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
    <React.Fragment>
      <svg className="flex-1" width="100%" height="100%" ref={refSvg} />
      <div className="absolute bottom-1 right-1" ref={refToolbar}></div>
    </React.Fragment>
  );
}
