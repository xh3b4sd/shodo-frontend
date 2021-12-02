import axios from "axios";
import Button from '@mui/material/Button';
import React from "react";
import { Link } from "react-router-dom";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ContrastIcon from '@mui/icons-material/Contrast';
import IconButton from '@mui/material/IconButton';
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import * as tokenid from "./module/token_id";
import * as contract from "./module/contract";

const queryClient = new QueryClient();

function base64(str) {
	return window.btoa(unescape(encodeURIComponent(str)));
}

function defaultImageData(tid) {
	let imageData = "";

	if (tid % 2 === 0) {
		imageData = `<?xml version="1.0" standalone="no"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"> <svg style="background-color: white;" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1080.000000pt" height="1994.000000pt" viewBox="0 0 1080.000000 1994.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,1994.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> </g> </svg>`;
	} else {
		imageData = `<?xml version="1.0" standalone="no"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"> <svg style="background-color: black;" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1080.000000pt" height="1994.000000pt" viewBox="0 0 1080.000000 1994.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,1994.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"> </g> </svg>`;
	}

	return imageData;
}

function evenClassNameFromTokenID(tid) {
	let className = "";

	if (tid % 2 === 0) {
		className = "even";
	} else {
		className = "uneven";
	}

	return className;
}

function formatAddress(add) {
	return add.slice(0, 6) + "..." + add.slice(-4)
}

function invertTokenID(tid) {
	if (tid % 2 === 0) {
		tid++;
	} else {
		tid--;
	}

	return tid;
}

function newImageURL(s) {
	return "https://raw.githubusercontent.com/xh3b4sd/content/master/shodo/" + s + ".svg"
}

function newTokenMintText(add) {
	if (add === "") {
		return "mint";
	}

	return formatAddress(add);
}

function newTokenMintURL(add, tid) {
	if (add === "") {
		return "/min/" + padTokenID(tid);
	}

	return "/add/" + add;
}

function newTokenViewURL(tid) {
	return "/tok/" + padTokenID(tid);
}

function padTokenID(tid) {
	let str = "0000" + tid;
	str = str.slice(str.length - 4);

	return str;
}

//
//
//

function mintButtonLookup(tid) {
	return async function mockFetch() {
		return new Promise(async (resolve) => {
			setTimeout(function () {
				let tok = contract.TokensWithPagination(0);

				let obj = tok.find(function (o) {
					return o.id === tid
				})

				resolve(obj);
			}, Math.floor(Math.random() * 1000));
		});
	}
}

function MintButton(props) {
	let { isLoading, data } = useQuery(["token/owner", props.tokenID], mintButtonLookup(props.tokenID));

	if (isLoading === true || data === undefined) {
		return (
			<div className="load-token">loading</div>
		);
	}

	let text = newTokenMintText(data.owner);
	let url = newTokenMintURL(data.owner, props.tokenID);

	return (
		<div className="mint-token" onClick={props.onClick}>
			<Link className="link" to={url}>
				<Button className="button" color="error" size="large" variant="text">{text}</Button>
			</Link>
		</div>
	);
}

//
//
//

function imageElementLookup(tid) {
	return async function mockFetch() {
		return new Promise(async (resolve) => {
			const { data } = await axios.get(newImageURL(padTokenID(tid)));

			resolve(data);
		});
	}
}

function ImageElement(props) {
	let { isLoading, data } = useQuery(["token/image", props.tokenID], imageElementLookup(props.tokenID));

	if (isLoading === true) {
		data = defaultImageData(props.tokenID);
	}

	return (
		<img alt="" src={"data:image/svg+xml;base64," + base64(data)} className="image"></img>
	);
}

//
//
//

class Cell extends React.Component {
	constructor(props) {
		super(props);

		let tokenID = tokenid.New(this.props.rowIndex, this.props.columnIndex, this.props.columnCount);

		let ownerAddress = "0x9999c4A1e0E012b7c8A9d329A53Ae81B6549bcC4";
		let loadingClassName = "loading";


		let evenClassName = evenClassNameFromTokenID(tokenID);
		let tokenViewURL = newTokenViewURL(tokenID);

		this.onClickInvertToken = this.onClickInvertToken.bind(this);
		this.onClickMintToken = this.onClickMintToken.bind(this);
		this.onClickViewToken = this.onClickViewToken.bind(this);

		this.state = {
			evenClassName: evenClassName,
			loadingClassName: loadingClassName,
			ownerAddress: ownerAddress,
			tokenID: tokenID,
			tokenViewURL: tokenViewURL,
		};
	}

	onClickInvertToken() {
		this.setState(function (prevState) {
			let tokenID = invertTokenID(prevState.tokenID);

			let evenClassName = evenClassNameFromTokenID(tokenID);
			let tokenViewURL = newTokenViewURL(tokenID);

			return {
				evenClassName: evenClassName,
				tokenID: tokenID,
				tokenViewURL: tokenViewURL,
			};
		});
	}

	onClickMintToken() {
	}

	onClickViewToken() {
	}

	render() {
		return (
			<div className={`cell ${this.state.evenClassName} ${this.state.loadingClassName}`} style={this.props.style}>
				<QueryClientProvider client={queryClient}>
					<div className="link-container">
						<MintButton onClick={this.onClickMintToken} tokenID={this.state.tokenID} ></MintButton>
						<div className="view-token" onClick={this.onClickViewToken}>
							<Link className="link" to={this.state.tokenViewURL}>
								<IconButton aria-label="view token" color="error" component="span"><FullscreenIcon fontSize="large" /></IconButton>
							</Link>
						</div>
						<div className="invert-token" onClick={this.onClickInvertToken}>
							<IconButton aria-label="invert token" color="error" component="span"><ContrastIcon fontSize="large" /></IconButton>
						</div>
					</div>
					<ImageElement tokenID={this.state.tokenID}> </ImageElement>
				</QueryClientProvider >
			</div >
		);
	}
};

export default Cell;
