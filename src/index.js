import ReactDOM from 'react-dom';

export const render = (rootComponent, domElement) => {
  if (isPrerendering()) {
    prerender(rootComponent, domElement);
  } else {
    ReactDOM.render(rootComponent, domElement);
  }
};

export const prerender = (rootComponent, domElement) => {
  domElement.innerHTML = window.ReactDOMServer.renderToString(rootComponent);
  window.reactSnapshotRender();
};

export const isPrerendering = () => {
  return navigator.userAgent.match(/Node\.js/i) &&
    window &&
    window.reactSnapshotRender &&
    window.ReactDOMServer;
};
