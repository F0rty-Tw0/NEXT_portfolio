import { data } from '@/data';

function hadnlePosts(req, res) {
	res.status(200).json(data);
}

export default hadnlePosts;
