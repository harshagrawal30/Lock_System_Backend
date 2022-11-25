

// import { request, gql, GraphQLClient } from 'graphql-request'
require('dotenv').config()
const graphql = require('graphql-request')
const requst = graphql.request
const GraphQLClient = graphql.GraphQLClient
const gql = graphql.gql
const myUrl = process.env.MY_URL
const authToken = process.env.AUTH_TOKEN
const graphClient = new GraphQLClient(myUrl, {
  headers: { authorization: `Bearer ${authToken}` }
})
const fetchDoorFunc = async () => {
  const FetchDoorQuery = gql`
      query DoorAccounts {
          doorAccountDetails {
            id
            doorId
            userName
            password
            tempPassword
            tempPasswordDateTime
            email
          }
        }
        
  `;
  try {
    const results = await requst(myUrl, FetchDoorQuery)
    return results.doorAccountDetails
  }
  catch {
    return "Error"
  }
}


const updateDoorAccount = async (body) => {

  const updateQuery = gql`
      mutation gef($id:ID!,$tempPassword:String!,$tempPasswordDateTime:DateTime!){
          updateDoorAccountDetail(where:{id:$id}data: {tempPassword:$tempPassword,tempPasswordDateTime:$tempPasswordDateTime}) {
            id
            userName
            password
            doorId
            tempPassword
            tempPasswordDateTime
            email
          }
        }`

  const publishQuery = gql`
        mutation gef($id:ID!){
          publishDoorAccountDetail(where:{id:$id},to:PUBLISHED){
           id
           password
            userName
            doorId
            tempPassword
            tempPasswordDateTime
          }
        }`
  // try {
  const result = await graphClient.request(updateQuery, body)
  const publish = await graphClient.request(publishQuery, { 'id': body.id })
  return publish.publishDoorAccountDetail
  // }
  // catch {
  //   return 'Error'
  // }
}

module.exports = { fetchDoorFunc, updateDoorAccount }