const initialState = {
    items: [],
};

export const marketingToolsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_STATE':
        return {
          ...state,
          items: [...action.payload],
        };
      default:
        return state;
    }
  };