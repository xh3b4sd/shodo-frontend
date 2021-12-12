import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { FixedSizeGrid } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import * as cell from "./component/cell.js";
import * as contract from "./module/contract";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./index.css";


const loading = 1;
const loaded = 2;
const circulating = contract.CirculatingSupply();

let cir_5 = (circulating / 2) + 2;
let cir_3 = (circulating / 2);
let cir_1 = (circulating / 2);
let itemStatusMap = {};

function isItemLoaded(index) {
  return !!itemStatusMap[index];
}

function loadMoreItems(startIndex, stopIndex) {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = loading;
  }

  return new Promise(resolve =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = loaded;
      }
      resolve();
    }, 2500)
  );
}


function App() {
  return (
    <BrowserRouter>
      <AutoSizer>
        {function ({ height, width }) {
          let cir = cir_5;
          let cnt = 5;

          if (width < 1200) {
            cir = cir_3;
            cnt = 3;
          }

          if (width < 700) {
            cir = cir_1;
            cnt = 1;
          }

          return (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={cir}
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
                  rowCount={cir / cnt}
                  rowHeight={width / cnt / 0.5416248746}
                  width={width}
                >
                  {
                    function ({ columnIndex, rowIndex, style }) {
                      return (<cell.Component columnCount={cnt} columnIndex={columnIndex} rowIndex={rowIndex} style={style} />);
                    }
                  }
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
