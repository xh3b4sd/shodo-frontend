import { render } from "react-dom";
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

import "./index.css";

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

const isItemLoaded = index => !!itemStatusMap[index];
const loadMoreItems = (startIndex, stopIndex) => {
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
};

const srcURL = (columnIndex, rowIndex) => {
  let num = (rowIndex * 3) + columnIndex;
  let str = "0000" + num;

  str = str.slice(str.length - 4)

  return "https://raw.githubusercontent.com/xh3b4sd/content/master/shodo/" + str + ".svg"
}

const Cell = ({ columnIndex, rowIndex, style }) => (
  < div style={style} >
    <img alt="" src={srcURL(columnIndex, rowIndex)} className="image"></img>
  </div >
);

const Example = () => (
  <AutoSizer>
    {({ height, width }) => (
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={100}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <Grid
            className="Grid"
            columnCount={3}
            columnWidth={width / 3}
            height={height}
            onItemsRendered={onItemsRendered}
            ref={ref}
            rowCount={100 / 3}
            rowHeight={width / 3 / 0.5416248746}
            width={width}
          >
            {Cell}
          </Grid>
        )}
      </InfiniteLoader>
    )}
  </AutoSizer>
);

render(<Example />, document.getElementById("root"));
