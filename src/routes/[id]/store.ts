import axios from 'axios';

export async function get({ params }) {
	const { data } = await axios.get('http://localhost:8080/user/' + params.id);
	if (data)
		return {
			body: {}
		};

	return {
		status: 404
	};
}
