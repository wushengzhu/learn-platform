import {gql} from '@apollo/client'

export const SEND_CODE_MSG = gql`
mutation sendCodeMsg($tel:String!){
  sendCodeMsg(tel:$tel)
}
`
