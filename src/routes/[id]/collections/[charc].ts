import axios from 'axios';

export async function get({ params }) {
	const { data } = await axios.get('https://poki-click.herokuapp.com/charc/' + params.id + '/' + params.charc);
	const forms = data;
	if (forms) {
		return {
			body: { forms }
		};
	}

	return {
		status: 404
	};
}
