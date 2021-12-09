import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import * as contract from "../module/contract";
import { useQuery } from "react-query";

function formatAddress(add) {
	return add.slice(0, 6) + "..." + add.slice(-4)
}

function lookup(tid) {
	return async function () {
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

function padTokenID(tid) {
	let str = "0000" + tid;
	str = str.slice(str.length - 4);

	return str;
}

function MintButton(props) {
	let { isLoading, data } = useQuery(["token/owner", props.tokenID], lookup(props.tokenID));

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

export class Component extends React.Component {
	render() {
		return (
			<MintButton tokenID={this.props.tokenID} />
		);
	}
};
