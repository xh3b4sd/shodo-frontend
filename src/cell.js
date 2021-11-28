import Button from '@mui/material/Button';
import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ContrastIcon from '@mui/icons-material/Contrast';
import IconButton from '@mui/material/IconButton';

function classNameFromTokenID(tid) {
	let className = "";

	if (tid % 2 === 0) {
		className = "even";
	} else {
		className = "uneven";
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

function newSrcURL(s) {
	return "https://raw.githubusercontent.com/xh3b4sd/content/master/shodo/" + s + ".svg"
}

function newTokenID(col, row) {
	let tid = (row * 6) + (col * 2);
	let num = (row * 3) + col;

	if (num % 2 !== 0) {
		tid++;
	}

	return tid;
}

function padTokenID(tid) {
	let str = "0000" + tid;
	str = str.slice(str.length - 4);

	return str;
}

class Cell extends React.Component {
	constructor(props) {
		super(props);

		let tokenID = newTokenID(this.props.columnIndex, this.props.rowIndex);
		let className = classNameFromTokenID(tokenID);
		let imageURL = newSrcURL(padTokenID(tokenID));
		let ownerAddress = "0x74fa...00f3";

		this.onClickInvertToken = this.onClickInvertToken.bind(this);
		this.onClickMintToken = this.onClickMintToken.bind(this);
		this.onClickViewToken = this.onClickViewToken.bind(this);

		this.state = {
			className: className,
			imageURL: imageURL,
			ownerAddress: ownerAddress,
			tokenID: tokenID,
		};
	}

	onClickInvertToken(e) {
		this.setState(function (prevState) {
			let className = prevState.className;

			if (className === "even") {
				className = "uneven";
			} else {
				className = "even";
			}

			let tokenID = invertTokenID(prevState.tokenID);
			let imageURL = newSrcURL(padTokenID(tokenID));

			return {
				className: className,
				imageURL: imageURL,
				tokenID: tokenID,
			};
		});
	}

	onClickMintToken(e) {
	}

	onClickViewToken(e) {
	}

	render() {
		return (
			<div className={"cell " + this.state.className} style={this.props.style}>
				<div className="link-container">
					<div className="mint-token" onClick={this.onClickMintToken}>
						<Link className="link" to={"/" + this.state.ownerAddress}>
							<Button color="error" size="large" variant="text">{this.state.ownerAddress}</Button>
						</Link>
					</div>
					<div className="view-token" onClick={this.onClickViewToken}>
						<Link className="link" to={"/" + padTokenID(this.state.tokenID)}>
							<IconButton aria-label="view token" color="error" component="span"><FullscreenIcon fontSize="large" /></IconButton>
						</Link>
					</div>
					<div className="invert-token" onClick={this.onClickInvertToken}>
						<IconButton aria-label="invert token" color="error" component="span"><ContrastIcon fontSize="large" /></IconButton>
					</div>
				</div>
				<img alt="" src={this.state.imageURL} className="image"></img>
			</div>
		);
	}
};

export default Cell;
