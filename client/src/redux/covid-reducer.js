const SET_SUMMARY_STAT = "SET_SUMMARY_STAT";
const SET_COUNTRY_STAT = "SET_COUNTRY_STAT";
const SET_GLOBAL_STAT = "SET_GLOBAL_STAT";
const initialState = {
  summaryCovidStat: {},
  globalCovidStat: [],
};

const covidReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUMMARY_STAT: {
      return {
        ...state,
        summaryCovidStat: {
          ...state.summaryCovidStat,
          ...action.summaryCovidStat,
        },
      };
    }

    case SET_GLOBAL_STAT: {
      return {
        ...state,
        globalCovidStat: [...action.globalCovidStat],
      };
    }

    default:
      return state;
  }
};

export const setSummaryStatActionCreator = (summaryCovidStat) => {
  return {
    type: SET_SUMMARY_STAT,
    summaryCovidStat,
  };
};

export const setGlobalStatActionCreator = (globalCovidStat) => {
  return {
    type: SET_GLOBAL_STAT,
    globalCovidStat,
  };
};

export default covidReducer;
