const SET_COVID_NEWS = "SET_COVID_NEWS";
const SET_TOTAL_RESULTS = "SET_TOTAL_RESULTS";
const SET_FULL_COVID_NEWS = "SET_FULL_COVID_NEWS";
const initialState = {
    covidNews: [],
    covidFullNews: [],
    totalCount: 0,
    pageSize: 5,
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COVID_NEWS: {
            return {
                ...state,
                covidNews: [...action.covidNews],
            };
        }

        case SET_TOTAL_RESULTS: {
            return {
                ...state,
                totalCount: action.totalResults,
            };
        }

        case SET_FULL_COVID_NEWS: {
            return {
                ...state,
                covidFullNews: [...action.covidFullNews],
            };
        }

        default:
            return state;
    }
};

export const setNewsActionCreator = (covidNews) => {
    return {
        type: SET_COVID_NEWS,
        covidNews,
    };
};

export const setTotalResultsActionCreator = (totalResults) => {
    return {
        type: SET_TOTAL_RESULTS,
        totalResults,
    };
};

export const setFullNewsActionCreator = (covidFullNews) => {
    return {
        type: SET_FULL_COVID_NEWS,
        covidFullNews,
    };
};

export default newsReducer;
