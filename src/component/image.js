import axios from "axios";
import React from "react";
import * as contract from "../module/contract";
import { useQuery } from "react-query";

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

function lookup(tid) {
	return async function () {
		return new Promise(async (resolve) => {
			let tok = contract.TokensWithPagination(0);

			let obj = tok.find(function (o) {
				return o.id === tid
			})

			if (obj === undefined) {
				resolve(undefined);
			} else {
				const { data } = await axios.get(obj.url);

				resolve(data);
			}
		});
	}
}

function Image(props) {
	let { isLoading, data } = useQuery(["token/image", props.tokenID], lookup(props.tokenID));

	if (isLoading === true || data === undefined) {
		data = defaultImageData(props.tokenID);
	}

	return (
		<img alt="" src={"data:image/svg+xml;base64," + base64(data)} className="image"></img>
	);
}

export class Component extends React.Component {
	render() {
		return (
			<Image tokenID={this.props.tokenID} />
		);
	}
};
