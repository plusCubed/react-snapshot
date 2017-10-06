import ReactDOM from 'react-dom';

export const render = (rootComponent, domElement) => {
  if (
    navigator.userAgent.match(/Node\.js/i) &&
    window &&
    window.reactSnapshotRender &&
    window.ReactDOMServer
  ) {
    domElement.innerHTML = window.ReactDOMServer.renderToString(rootComponent);
    window.reactSnapshotRender();
  } else {
    ReactDOM.render(rootComponent, domElement);
  }
};
