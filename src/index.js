import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { FixedSizeGrid } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import Cell from "./cell.js";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./index.css";


const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

function isItemLoaded(index) {
  return !!itemStatusMap[index];
}

function loadMoreItems(startIndex, stopIndex) {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }

  return new Promise(resolve =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 2500)
  );
}

function newCell({ columnIndex, rowIndex, style }) {
  return (<Cell columnIndex={columnIndex} rowIndex={rowIndex} style={style} />);
}

function App() {
  return (
    <BrowserRouter>
      <AutoSizer>
        {function ({ height, width }) {
          let cnt = 4;

          if (width < 1300) {
            cnt = 3;
          }

          if (width < 900) {
            cnt = 2;
          }

          if (width < 500) {
            cnt = 1;
          }

          return (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={100}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeGrid
                  className="grid"
                  columnCount={cnt}
                  columnWidth={width / cnt}
                  height={height}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  rowCount={100 / cnt}
                  rowHeight={width / cnt / 0.5416248746}
                  width={width}
                >
                  {newCell}
                </FixedSizeGrid>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById("root"));
