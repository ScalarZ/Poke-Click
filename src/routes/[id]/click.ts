import axios from 'axios';

export async function get({ params }) {
	const { data } = await axios.get('https://poki-click.herokuapp.com/user/' + params.id);
	if (data)
		return {
			body: {}
		};

	return {
		status: 404
	};
}
