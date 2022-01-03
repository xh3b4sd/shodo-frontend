import React from "react";
import { Link } from "react-router-dom";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ContrastIcon from '@mui/icons-material/Contrast';
import IconButton from '@mui/material/IconButton';
import { QueryClient, QueryClientProvider } from "react-query";
import * as tokenid from "../module/token_id";
import * as mintbutton from "../component/mintbutton";
import * as image from "./image";
import * as contract from "../module/contract";

const queryClient = new QueryClient();
const available = contract.AvailableSupply();

function evenClassNameFromTokenID(tid) {
	let className = "";

	if (tid % 2 === 0) {
		className = "even";
	} else {
		className = "uneven";
	}

	if (tid >= available) {
		className = "empty";
	}

	return className;
}

function invertTokenID(tid) {
	if (tid % 2 === 0) {
		tid++;
	} else {
		tid--;
	}

	return tid;
}

function newTokenViewURL(tid) {
	return "/tok/" + padTokenID(tid);
}

function padTokenID(tid) {
	let str = "0000" + tid;
	str = str.slice(str.length - 4);

	return str;
}

export class Component extends React.Component {
	constructor(props) {
		super(props);

		let tokenID = tokenid.Reverse(this.props.rowIndex, this.props.columnIndex, this.props.columnCount, this.props.listLength);

		let evenClassName = evenClassNameFromTokenID(tokenID);
		let tokenViewURL = newTokenViewURL(tokenID);

		this.onClickInvertToken = this.onClickInvertToken.bind(this);
		this.onClickMintToken = this.onClickMintToken.bind(this);
		this.onClickViewToken = this.onClickViewToken.bind(this);

		this.state = {
			evenClassName: evenClassName,
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
			<div className={`cell ${this.state.evenClassName}`} style={this.props.style}>
				<QueryClientProvider client={queryClient}>
					<div className="link-container">
						<mintbutton.Component onClick={this.onClickMintToken} tokenID={this.state.tokenID} />
						<div className="view-token" onClick={this.onClickViewToken}>
							<Link className="link" to={this.state.tokenViewURL}>
								<IconButton aria-label="view token" color="error" component="span"><FullscreenIcon fontSize="large" /></IconButton>
							</Link>
						</div>
						<div className="invert-token" onClick={this.onClickInvertToken}>
							<IconButton aria-label="invert token" color="error" component="span"><ContrastIcon fontSize="large" /></IconButton>
						</div>
					</div>
					<image.Component tokenID={this.state.tokenID} />
				</QueryClientProvider >
			</div >
		);
	}
};
