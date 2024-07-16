// src/hooks/useCart.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../_metronic/redux/marketingTools/marketingToolsActions';
import { GET_MARKETING_TOOLS } from '../constants/api.constants';
import { getQueryRequest } from '../library/api.helper';

export const useMarketingTools = () => {
  const marketingTools = useSelector((state) => state.marketingTools.items);
  const dispatch = useDispatch();

  const updateMarketingTools = (items) => {
    dispatch(updateState(items));
  };

  useEffect(() => {
    if(marketingTools?.length === 0) {
      getMarketingTools();
    }
  }, [])

  const getMarketingTools = async() => {
    const res = await getQueryRequest(GET_MARKETING_TOOLS);
    if(res?.success && Array.isArray(res?.data) && res?.data?.length > 0) {
      updateMarketingTools(res?.data)
    }
  }

  return { marketingTools, updateMarketingTools };
};
