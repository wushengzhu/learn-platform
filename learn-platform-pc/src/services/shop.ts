import { GET_SHOP, GET_SHOPS } from "@/graphql/shop"
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TShopQuery, TShopsQuery } from "@/utils/types";
import { useQuery } from "@apollo/client"


export const useShops = (pageNum=1,pageSize=DEFAULT_PAGE_SIZE)=>{
  const {loading,data,refetch} = useQuery<TShopsQuery>(GET_SHOPS,{
    variables:{
      page:{
        pageNum,
        pageSize
      }
    }
  });

  return {
    loading,
    refetch,
    page:data?.getShops.page,
    data:data?.getShops.data
  }
}


export const useShop = (id: string) => {
  const { loading, data } = useQuery<TShopQuery>(GET_SHOP, {
    variables: {
      id,
    },
  });

  return {
    loading,
    data: data?.getOrganizationInfo.data,
  };
};
