import { routes } from './app.routing';
import { UsersComponent } from './users/users.component';

//------------------------Testing the navigation start------------------------//
describe('routes', () => {
    it ('should contain a route for /users', () => {
        expect(routes).toContain({path: 'users', component: UsersComponent})
    })
})
//------------------------Testing the navigation end------------------------//