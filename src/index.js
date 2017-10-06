import ReactDOM from 'react-dom';

export const render = (rootComponent, domElement) => {
  if (isPrerendering()) {
    domElement.innerHTML = window.ReactDOMServer.renderToString(rootComponent);
    window.reactSnapshotRender();
  } else {
    ReactDOM.render(rootComponent, domElement);
  }
};

export const isPrerendering = () => {
  return navigator.userAgent.match(/Node\.js/i) &&
    window &&
    window.reactSnapshotRender &&
    window.ReactDOMServer;
};
