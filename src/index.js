import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { FixedSizeGrid } from 'react-window';
import { Link } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

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

function newTokenID(col, row) {
  let tid = (row * 6) + (col * 2);
  let num = (row * 3) + col;

  if (num % 2 !== 0) {
    tid++;
  }

  return padTokenID(tid);
}

function padTokenID(tid) {
  let str = "0000" + tid;
  str = str.slice(str.length - 4);

  return str;
}

function tokenIDFromSrc(src) {
  let arr = src.split("/");
  let tid = parseInt(arr[arr.length - 1], 10);

  return tid;
}

function toggleTokenID(e) {
  let tid = tokenIDFromSrc(e.target.src);

  if (e.currentTarget.classList.contains("even")) {
    e.currentTarget.classList.remove("even")
    e.currentTarget.classList.add("uneven")
    tid++;
    e.target.src = newSrcURL(padTokenID(tid));
  } else {
    e.currentTarget.classList.remove("uneven")
    e.currentTarget.classList.add("even")
    tid--;
    e.target.src = newSrcURL(padTokenID(tid));
  }
}

function newSrcURL(tid) {
  return "https://raw.githubusercontent.com/xh3b4sd/content/master/shodo/" + tid + ".svg"
}

function newCell({ columnIndex, rowIndex, style }) {
  let add = "0x74fa...00f3"
  let tid = newTokenID(columnIndex, rowIndex);

  let className = "cell"
  className += " "
  if (tid % 2 === 0) {
    className += "even"
  } else {
    className += "uneven"
  }

  return (
    <div className={className} onClick={toggleTokenID} style={style}>
      <div className="link-container view-token">
        <Link className="link" to={"/" + tid}>view</Link>
      </div>
      <div className="link-container mint-token">
        <Link className="link" to={"/" + add}>{add}</Link>
      </div>
      <img alt="" src={newSrcURL(tid)} className="image"></img>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={100}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeGrid
                className="grid"
                columnCount={3}
                columnWidth={width / 3}
                height={height}
                onItemsRendered={onItemsRendered}
                ref={ref}
                rowCount={100 / 3}
                rowHeight={width / 3 / 0.5416248746}
                width={width}
              >
                {newCell}
              </FixedSizeGrid>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById("root"));
