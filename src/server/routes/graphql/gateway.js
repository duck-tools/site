import { ApollowGateway, RemoteGraphQLDataSource } from '@apollo/gateway';

export default  new ApollowGateway({
  serviceList: [
    { name: 'profile', url: process.env.PROFILE_SERVICE_URL }
  ],
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        if (!!context.jwt) {
          request.http.headers.set('Authorization', `Bearer ${context.jwt}`);
        }
      }
    })
  }
});
