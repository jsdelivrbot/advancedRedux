import {
	FETCH_USERS
} from '../actions/types';

export default function (state = [], action) {

	switch (action.type) {
		case FETCH_USERS:
			let data = [...state, ...action.payload.data];
			console.log(data);
			return data;
	}

	return state;
}
